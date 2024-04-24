/**
 * @author OKOK
 * @desc 首页路由层模块
 * @date 2024-04-25
 */

import express from "express";
import {
  getBannerListService,
  updateBannerServices,
} from "../services/bannerService";
import { resultHandle } from "../utils/resultHandle";

const bannerRouter = express.Router();

// 获取所有 banner 数据
bannerRouter.get("/list", async (req, res, next) => {
  const data = await getBannerListService();
  res.send(resultHandle(data));
});

// 更新首页数据
bannerRouter.post("/update", async (req, res, next) => {
  const params = req.body;
  const data = await updateBannerServices(params);
  res.send(resultHandle(data));
});

export default bannerRouter;
