import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import "express-async-errors";

import { resultHandle } from "./utils/resultHandle";

dotenv.config();

// 引入数据库
import "./db/init";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//引入路由
import indexRouter from "./routes/index";
import adminRouter from "./routes/admin";

// 使用中间件
app.use("/", indexRouter);
app.use("/api/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(((err, req, res, next) => {
  res.send(resultHandle(null, err.code, err.message));
}) as express.ErrorRequestHandler);

export default app;
