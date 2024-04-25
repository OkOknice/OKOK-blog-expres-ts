import express from "express";
import { resultHandle } from "../utils/resultHandle";
import {
  addBlogTypeServices,
  getBlogTypeInfoServices,
  getBlogTypeListServices,
  updateBlogTypeInfoServices,
  deleteBlogTypeServices,
} from "../services/blogTypeService";

const blogTypeRouter = express.Router();

// 添加分类
blogTypeRouter.post("/add", async (req, res, next) => {
  const params = req.body;
  const data = await addBlogTypeServices(params);
  // console.log(params)
  res.send(resultHandle(data));
});

// 分类列表
blogTypeRouter.get("/list", async (req, res, next) => {
  const data = await getBlogTypeListServices();
  res.send(resultHandle(data));
});

// 查询信息
blogTypeRouter.get("/info/:id", async (req, res, next) => {
  const id = req.params.id;
  // console.log(id)
  const data = await getBlogTypeInfoServices(id);
  res.send(resultHandle(data));
});

// 更新信息
blogTypeRouter.put("/update/:id", async (req, res, next) => {
  const id = req.params.id;
  const params = req.body;
  const data = await updateBlogTypeInfoServices(id, params);
  res.send(resultHandle(data));
});

// 删除信息
blogTypeRouter.delete("/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  await deleteBlogTypeServices(id);
  res.send(resultHandle(null));
});

export default blogTypeRouter;
