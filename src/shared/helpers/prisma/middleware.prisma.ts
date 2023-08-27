import { Prisma } from "@prisma/client";
import argon2 from "argon2";

export const EncryptPassword: Prisma.Middleware = async (params, next) => {
  if (params.model === "users" && params.action === "create") {
    if (params?.args?.data?.password) {
      params.args.data.password = await argon2.hash(params.args.data.password);
    }
  } else if (params.model === "users" && params.action === "update") {
    if (params?.args?.data?.password) {
      params.args.data.password = await argon2.hash(params.args.data.password);
    }
  }

  return next(params);
};

export const SoftDelete: Prisma.Middleware = async (params, next) => {
  if (params.action === "delete") {
    params.action = "update";
    params.args = {
      ...params.args,
      data: { deleted_at: new Date() },
    };
  }
  if (params.action === "deleteMany") {
    params.action = "updateMany";
    params.args = {
      ...params.args,
      data: { ...params.args.data, deleted_at: new Date() },
    };
  }

  return next(params);
};
export const GetOnlyUndeletedRecord: Prisma.Middleware = async (
  params,
  next
) => {
  if (params.action === "findUnique" || params.action === "findFirst") {
    // Change to findFirst - you cannot filter
    // by anything except ID / unique with findUnique
    params.action = "findFirst";

    // Add 'deleted_at' filter
    // ID filter maintained
    params.args = {
      ...params.args,
      where: {
        ...params.args.where,
        deleted_at: null,
      },
    };
  }
  if (params.action === "findMany") {
    // Find many queries
    if (params.args?.where) {
      if (params.args?.where?.deleted_at == undefined) {
        // Exclude deleted_at records if they have not been explicitly requested
        params.args = {
          ...params.args,
          where: {
            ...params.args.where,
            deleted_at: null,
          },
        };
      }
    } else {
      params.args = {
        ...params.args,
        where: {
          ...params.args.where,
          deleted_at: null,
        },
      };
    }
  }

  return next(params);
};

export const CheckPasswordCredential: Prisma.Middleware = async (
  params,
  next
) => {
  if (params.model === "users" && params.action === "findFirst") {
    const password = params.args.where?.password;
    if (password) {
      delete params.args.where.password;
      if (params?.args?.select)
        params.args = {
          ...params.args,
          select: { ...params.args.select, password: true },
        };
    }
    const user = await next(params);
    if (password) {
      try {
        if (user && (await argon2.verify(user.password, password))) {
          delete user.password;
          return user;
        }

        return null;
      } catch (e) {
        return null;
      }
    } else {
      return user;
    }
  }

  return next(params);
};
