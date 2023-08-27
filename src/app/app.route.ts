import express, { Router } from "express";

import { authRouter } from "../routes";
const router: Router = express.Router();

router.use("/auth", authRouter);

router.use("/version", (req, res) => {
  return res.status(404).send({
    success: true,
    results: {
      version: "0.0.1-dev",
    },
  });
});

router.use("/404", (req, res) => {
  return res.status(404).send({
    success: false,
    message: "Resource not found",
  });
});

router.use("*", (req, res) => {
  return res.redirect("/404");
});

export const appRouter: Router = router;
