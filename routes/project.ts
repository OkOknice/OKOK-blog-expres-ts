import express from "express";
import {
  addProjectService,
  getProjectInfoService,
  getProjectListService,
  deleteProjectService,
  updateProjectService,
} from "../services/projectService";
import { resultHandle } from "../utils/resultHandle";

const projectRouter = express.Router();

// 添加项目
projectRouter.post("/add", async (req, res, next) => {
  const data = await addProjectService(req.body);

  res.send(resultHandle(data));
});

// 获取项目信息
projectRouter.get("/info/:id", async (req, res, next) => {
  const data = await getProjectInfoService(req.params.id);
  res.send(resultHandle(data));
});

// 更新项目信息
projectRouter.put("/update/:id", async (req, res, next) => {
  const data = await updateProjectService(req.params.id, req.body);
  res.send(resultHandle(data));
});

// 删除项目
projectRouter.delete("/delete/:id", async (req, res, next) => {
  const data = await deleteProjectService(req.params.id);
  res.send(resultHandle(data));
});

// 获取项目列表
projectRouter.get("/list", async (req, res, next) => {
  const data = await getProjectListService();
  res.send(resultHandle(data));
});

export default projectRouter;
