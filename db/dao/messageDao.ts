import messageModel from "../model/messageModel";
import { IProjectParams } from "./types/projectType";

// 添加留言
export const addMessageDao = async (messageInfo: any) => {
  const res = await messageModel.create(messageInfo);
  return res;
};

// 查询某个留言
export const getMessageInfoDao = async (id: string) => {
  const res = await messageModel.findByPk(id);

  return res;
};

// 删除留言
export const deleteMessageDao = async (id: string) => {
  const res = await messageModel.destroy({
    where: {
      id,
    },
  });

  return res;
};

// 获取留言列表
export const getMessageListDao = async () => {
  const res = await messageModel.findAll();
  return res;
};
