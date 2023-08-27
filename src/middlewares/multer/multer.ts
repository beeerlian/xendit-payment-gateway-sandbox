import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { randomString } from "../../shared";

export class MulterMd {
  private storage: multer.StorageEngine;
  private fileFilter;
  private limits;
  private multMd: multer.Multer;

  constructor() {
    this.storage = this.setupDiskStorage();
    this.limits = this.setupLimit();
    this.fileFilter = this.setupFileFilter();

    this.multMd = multer({
      storage: this.storage,
      fileFilter: this.fileFilter,
      limits: this.limits,
    });
  }

  public single(field: string) {
    const up = this.multMd.single(field);
    return (req: Request, res: Response, next: NextFunction) => {
      up(req, res, (err) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message ?? "Failed to upload file",
          });
        }
        if (req.file) {
          req.body[field] = req.file.filename;
        } else {
          delete req.body[field];
        }
        next();
      });
    };
  }
  public multiple(fields: string[]) {
    const fieldsOpt = [];
    for (const iterator of fields) {
      fieldsOpt.push({ name: iterator });
    }
    const up = this.multMd.fields(fieldsOpt);
    return (req: Request, res: Response, next: NextFunction) => {
      up(req, res, (err) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message ?? "Failed to upload files",
          });
        }

        type FileKey = keyof typeof req.files;

        for (const file in req.files) {
          const filename = (
            req.files[file as FileKey] as Express.Multer.File[]
          )[0].filename;
          if (filename) {
            req.body[file] = filename;
          }
        }
        next();
      });
    };
  }

  private setupLimit() {
    return {
      fileSize: 3 * 1024 * 1024,
    };
  }

  private setupFileFilter() {
    return (
      req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback
    ) => {
      const ext = this.extGenerator(file.mimetype);
      if (ext) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };
  }

  private setupDiskStorage() {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join("public", "uploads"));
      },
      filename: async (req, file, cb) => {
        const ext = this.extGenerator(file.mimetype);
        const randString = await randomString(20);
        console.log(file);
        const formattedFilename = file.originalname
          ?.replace(/\s+/g, "-")
          .replace(/\./g, "-")
          .toLowerCase();
        cb(null, `${formattedFilename ?? ""}-${randString}.${ext}`);
      },
    });
  }

  private extGenerator(mimetype: string) {
    const mime = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "application/pdf": "pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "docx",
      "application/msword": "doc",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "xlsx",
      "application/vnd.ms-excel": "xls",
    };

    return mime[mimetype as keyof typeof mime];
  }
}
