import { addFileDao, getFileDao, deleteFileDao } from "../db/dao/fileDao";
import { UploadError } from "../utils/errorHandle";
import { IFileParams } from "./types/uploadServiceType";

export const uploadService = async (fileInfo: IFileParams) => {
  await addFileDao(fileInfo);
};

export const getFileService = async (attachmentId: string) => {
  const res = await getFileDao(attachmentId);
  if (res) {
    return res.toJSON();
  } else {
    throw new UploadError("查无该文件");
  }
};

export const deleteFileService = async (attachmentId: string) => {
  const res = await deleteFileDao(attachmentId);

  return res;
};
