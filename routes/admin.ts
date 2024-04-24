/**
 * @author OKOK
 * @desc 登录管理路由层模块
 * @date 2024-04-24
 */

import express from "express";
import {
  loginService,
  updateUserInfoService,
  verifyUserService,
} from "../services/adminService";
import { resultHandle } from "../utils/resultHandle";
import { ValidationError } from "../utils/errorHandle";
import { INewSession } from "./types/sessionType";

const adminRouter = express.Router();

// 登录
adminRouter.post("/login", async (req, res, next) => {
  const params = req.body;
  // 校验验证码
  if (!params.captcha) {
    throw new ValidationError("验证码不能为空");
  }
  if (!(req.session as INewSession).captcha) {
    throw new ValidationError("验证码已失效，请重新获取");
  }
  if (
    params.captcha.toLowerCase() !==
    (req.session as INewSession).captcha.toLowerCase()
  ) {
    throw new ValidationError("验证码错误");
  }
  const data = await loginService(params);
  res.header("authorization", data);
  res.send(resultHandle(data));
});

// 校验用户
adminRouter.get("/whoami", (req, res, next) => {
  const data = verifyUserService(req.headers.authorization as string);
  res.send(resultHandle(data));
});

// 更新用户信息
adminRouter.put("/update", async (req, res, next) => {
  const params = req.body;
  const data = await updateUserInfoService(
    params,
    req.headers.authorization as string
  );
  res.send(resultHandle(data));
});

export default adminRouter;
