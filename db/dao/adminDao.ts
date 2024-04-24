/**
 * @author OKOK
 * @desc 数据库处理模块
 * @date 2024-04-24
 */

import adminModel from "../model/adminModel";
import { ILoginInfo, IUserInfo } from "./types/adminType";

// 登录
export const loginAao = async (loginInfo: ILoginInfo) => {
  const res = await adminModel.findOne({
    where: {
      loginId: loginInfo.loginId,
      loginPwd: loginInfo.loginPwd,
    },
  });
  return res;
};

// 更新
export const updateAdmimDao = async (userInfo: IUserInfo) => {
  const res = await adminModel.update(
    {
      loginId: userInfo.loginId,
      loginPwd: userInfo.loginPwd,
    } as ILoginInfo,
    {
      where: {
        id: userInfo.id,
      },
    }
  );

  return res;
};
