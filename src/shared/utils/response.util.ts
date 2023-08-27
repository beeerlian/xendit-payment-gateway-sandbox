import { Request, Response } from "express";
import Exception from "../../exceptions/exception";

export type ErrorResponseOptions = {
  statusCode?: number;
  defaultMessage?: string;
  error: any;
  res: Response;
  req: Request;
};

export type ResponsePagination = {
  start: number;
  limit: number;
  next: boolean;
  prev: boolean;
};

export type SuccessResponseOptions = {
  defaultMessage?: string;
  message?: string;
  results?: any;
  pagination?: ResponsePagination;
  res: Response;
  req: Request;
};

export const ErrorResponse = (options: ErrorResponseOptions) => {
  const { error, res } = options;
  if (process.env.LOG_DEBUGGING) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `[log] ${options.req.baseUrl}${options.req.path} ${
        options.error.status || options.statusCode || 500
      } Failed >> ${options.error?.name} >> ${
        error.message || options.defaultMessage
      }`
    );
  }
  if (error instanceof Exception) {
    return res.status(options.statusCode || error.status).send({
      success: false,
      message: error.message || options.defaultMessage,
      error,
      results: null,
    });
  } else {
    return res.status(options.statusCode || 500).send({
      success: false,
      message: error.message || options.defaultMessage,
      error,
      results: null,
    });
  }
};

export const SuccesResponse = (options: SuccessResponseOptions) => {
  const { res } = options;
  if (process.env.LOG_DEBUGGING) {
    console.log(
      "\x1b[32m%s\x1b[0m",
      `[log] ${options.req.baseUrl}${options.req.path} 200 Success >> ${
        options.message || options.defaultMessage || "Request success"
      }`
    );
  }
  return res.status(200).send({
    success: true,
    message: options.message || options.defaultMessage || "Request success",
    results: options.results,
    error: null,
    pagination: options.pagination,
  });
};
