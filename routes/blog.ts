import express from "express";
import {
  addBlogService,
  getBlogPageService,
  getBlogDetailService,
  updateBlogService,
  deleteBlogService,
} from "../services/blogService";
import { resultHandle } from "../utils/resultHandle";
import { IBlogPageParams } from "../db/dao/types/blogType";

const blogRouter = express.Router();

// 添加文章
blogRouter.post("/add", async (req, res) => {
  const data = await addBlogService(req.body);
  res.send(resultHandle(data));
});

// 获取文章分页列表
blogRouter.get("/page", async (req, res) => {
  const params = req.query;
  const data = await getBlogPageService(params as unknown as IBlogPageParams);
  res.send(resultHandle(data));
});

// 获取文章详情
blogRouter.get("/detail/:id", async (req, res) => {
  const id = req.params.id;
  const auth = req.headers.authorization ? true : false;
  const data = await getBlogDetailService(id, auth);
  res.send(resultHandle(data));
});

// 更新文章
blogRouter.post("/update", async (req, res) => {
  const data = await updateBlogService(req.body);
  res.send(resultHandle(data));
});

// 删除文章
blogRouter.delete("/delete/:id", async (req, res) => {
  const data = await deleteBlogService(req.params.id);
  res.send(resultHandle(data));
});

export default blogRouter;
