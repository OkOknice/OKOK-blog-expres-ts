/**
 * @author OKOK
 * @desc 验证码路由层模块
 * @date 2024-04-24
 */
import express from "express";
import { getCaptchaService } from "../services/captchaService";
import { INewSession } from "./types/sessionType";

const captchaRouter = express.Router();

captchaRouter.get("/", (req, res, next) => {
  const data = getCaptchaService();

  (req.session as INewSession).captcha = data.text;
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(data.data);
});

export default captchaRouter;
