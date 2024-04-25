import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import { UploadError } from "../utils/errorHandle";
import { getUUID } from "../utils/tool";
import {
  uploadService,
  getFileService,
  deleteFileService,
} from "../services/uploadService";
import { resultHandle } from "../utils/resultHandle";

const uploadRouter = express.Router();

// 设置上传文件的引擎
const storage = multer.diskStorage({
  // 文件存储的位置
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../public/static/uploads/"));
  },
  // 上传到服务器的文件，文件名要做单独处理
  filename: (req, file, cb) => {
    // 获取文件名
    const basename = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    // 获取后缀名
    const extname = path.extname(file.originalname);
    // 构建新的名字
    const newName = `${basename}-${new Date().getTime()}-${Math.floor(
      Math.random() * 9000 + 1000
    )}${extname}`;
    cb(null, newName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024,
  },
});

uploadRouter.post("/", (req, res, next) => {
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      res.send(new UploadError("文件上传失败").handleResult());
    } else {
      const fileNumber = req.body.fileNumber || getUUID();
      if (req.file) {
        const fileInfo = {
          size: req.file.size,
          filename: req.file.filename,
          originalname: req.file.originalname,
          attachmentId: getUUID(),
          downloadUrl: `/static/uploads/${req.file.filename}`,
          fileNumber,
        };
        await uploadService(fileInfo);
        res.send(resultHandle(fileInfo.downloadUrl));
      }
    }
  });
});

// 获取文件
uploadRouter.get("/getFile/:attachmentId", async (req, res, next) => {
  const attachmentId = req.params.attachmentId;
  const data = await getFileService(attachmentId);
  console.log(data);
  res.send(
    resultHandle({
      downloadUrl: data.downloadUrl,
      attachmentId: data.attachmentId,
    })
  );
});

// 删除附件
uploadRouter.get("/delete/:attachmentId", async (req, res, next) => {
  const attachmentId = req.params.attachmentId;
  const data = await getFileService(attachmentId);
  const absPath = path.resolve(
    __dirname,
    "../public/static/uploads",
    data.filename
  );
  await deleteFileService(attachmentId).then(() => {
    fs.unlink(absPath, async () => {
      res.send(resultHandle(null));
    });
  });
});

export default uploadRouter;
