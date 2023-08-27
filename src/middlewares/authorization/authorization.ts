import { NextFunction, Request, Response } from "express";
import { Idb } from "../../shared";

export class AuthorizationMd {
  private db: Idb;

  constructor(db: Idb) {
    this.db = db;
  }

  public async execute(req: Request, res: Response, next: NextFunction) {}
}
