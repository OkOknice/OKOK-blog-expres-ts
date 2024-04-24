import express from "express";
import { loginService } from "../services/adminService";
import { resultHandle } from "../utils/resultHandle";

const adminRouter = express.Router();

adminRouter.post("/login", async (req, res, next) => {
  // console.log(req.body);
  const data = await loginService(req.body);
  res.send(resultHandle(data));
});

export default adminRouter;
