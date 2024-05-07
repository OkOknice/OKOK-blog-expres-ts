import express from "express";
import { addProjectService } from "../services/projectService";
import { resultHandle } from "../utils/resultHandle";

const projectRouter = express.Router();

// 添加项目
projectRouter.post("/add", async (req, res, next) => {
  const data = await addProjectService(req.body);

  res.send(resultHandle(data));
});

export default projectRouter;
