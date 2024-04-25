import fileModel from "../model/fileModel";
import { IFileInfo } from "./types/fileTypes";
import type { Optional } from "sequelize";

interface INewFileInfo extends Optional<IFileInfo, "originalname"> {}

export const addFileDao = async (fileInfo: INewFileInfo) => {
  await fileModel.create(fileInfo);
};

export const getFileDao = async (attachmentId: string) => {
  const res = await fileModel.findOne({
    where: {
      attachmentId,
    },
  });

  return res;
};

export const deleteFileDao = async (attachmentId: string) => {
  const res = fileModel.destroy({
    where: {
      attachmentId,
    },
  });
  return res;
};
