import { Request } from "express";
import { ResponsePagination } from "./response.util";

export class Pagination {
  private start: number;
  private limit: number;
  private next: boolean = false;
  constructor(req: Request) {
    const { start = 0, limit = 10 } = req.query;

    this.start = Number(start);
    this.limit = Number(limit);
  }

  public get skip(): number {
    return this.start;
  }
  public get take(): number {
    return this.limit;
  }
  public get cursor(): number {
    return this.limit + this.start + 1;
  }
  public get canNextQuery(): any {
    return {
      skip: this.cursor,
      take: 1,
    };
  }

  public set canNext(canNext: boolean) {
    this.next = canNext;
  }

  public get info(): ResponsePagination {
    return {
      start: this.start,
      limit: this.limit,
      next: this.next,
      prev: this.start > 0 ? true : false,
    };
  }
}
