import { PrismaClient } from "@prisma/client";
import { prismaExclude } from "prisma-exclude";
import * as middleware from "./middleware.prisma";

export class Idb {
  public client: PrismaClient;
  public exclude;

  constructor() {
    this.client = new PrismaClient();
    this.exclude = prismaExclude(this.client);
    this.applyMiddleware();
  }

  private applyMiddleware() {
    this.client.$use(middleware.CheckPasswordCredential);
    this.client.$use(middleware.EncryptPassword);
    this.client.$use(middleware.GetOnlyUndeletedRecord);
    this.client.$use(middleware.SoftDelete);
  }

  public async disconnect() {
    return this.client.$disconnect();
  }

  public filterField<T, Key extends keyof T>(
    record: T,
    keys: Key[]
  ): Omit<T, Key> {
    for (let key of keys) {
      delete record[key];
    }
    return record;
  }
}
