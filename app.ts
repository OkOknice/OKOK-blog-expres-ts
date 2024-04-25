import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import "express-async-errors";
import { expressjwt as jwt } from "express-jwt";
import md5 from "md5";
import session from "express-session";

// import { ForbiddenError } from "./utils/errorHandle";

import { resultHandle } from "./utils/resultHandle";
import HTTP_CODE from "./utils/constCode";

dotenv.config();

// 引入数据库
import "./db/init";

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  jwt({
    secret: md5(process.env.JWT_PRIVATEKEY as string),
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: "/api/admin/login", method: "POST" },
      { url: "/res/captcha", method: "GET" },
    ],
  })
);

//引入路由
import adminRouter from "./routes/admin";
import bannerRouter from "./routes/banner";
import uploadRouter from "./routes/upload";
import blogTypeRouter from "./routes/blogType";
import captchaRouter from "./routes/captcha";

// 使用中间件
app.use("/api/admin", adminRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/blogType", blogTypeRouter);
app.use("/res/captcha", captchaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.send(
      resultHandle(null, HTTP_CODE.AUTH_CODE, "未登录，或者登录已经过期")
    );
    return;
  }

  res.send(resultHandle(null, err.code, err.message));
}) as express.ErrorRequestHandler);

export default app;
