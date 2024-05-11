import {
  addMessageDao,
  deleteMessageDao,
  getMessageInfoDao,
  getMessageListDao,
} from "../db/dao/messageDao";
import { NotFoundError, UnknownError } from "../utils/errorHandle";
import { IMessageParams } from "./types/messageServiceType";

// 添加留言
export const addMessageService = async (messageInfo: IMessageParams) => {
  if (!messageInfo.nickname) {
    messageInfo.nickname = `匿名 ${Math.floor(Math.random() * 99999)}`;
  }
  messageInfo.createDate = Date.now();
  const res = await addMessageDao(messageInfo);
  return res;
};

// 获取留言信息
export const getMessageInfoService = async (id: string) => {
  try {
    const res = await getMessageInfoDao(id);
    if (res) {
      const data = res.toJSON();
      delete data.deletedAt;
      return data;
    } else {
      throw new NotFoundError("查无此留言信息");
    }
  } catch (error) {
    throw new UnknownError();
  }
};

// 获取留言列表
export const getMessageListService = async () => {
  let list = [];
  const res = await getMessageListDao();
  list = res.map((item) => {
    const data = item.toJSON();
    delete data.deletedAt;
    return data;
  });
  return list;
};

// 删除留言
export const deleteMessageService = async (id: string) => {
  const res = await getMessageInfoDao(id);
  if (res) {
    await deleteMessageDao(id);
    return "删除成功";
  } else {
    throw new NotFoundError("查无此留言信息");
  }
};
