import express from "express";
import {
  addMessageService,
  getMessageInfoService,
  getMessageListService,
  deleteMessageService,
} from "../services/messageService";
import { resultHandle } from "../utils/resultHandle";

const messageRouter = express.Router();

// 添加留言
messageRouter.post("/add", async (req, res) => {
  const data = await addMessageService(req.body);
  res.send(resultHandle(data));
});

// 获取留言信息
messageRouter.get("/info/:id", async (req, res) => {
  const data = await getMessageInfoService(req.params.id);
  res.send(resultHandle(data));
});

// 获取留言列表
messageRouter.get("/list", async (req, res) => {
  const data = await getMessageListService();
  res.send(resultHandle(data));
});

// 删除留言
messageRouter.delete("/delete/:id", async (req, res) => {
  const data = await deleteMessageService(req.params.id);
  res.send(resultHandle(data));
});

export default messageRouter;
