/**
 * @author OKOK
 * @desc 登录管理逻辑层模块
 * @date 2024-04-24
 */

import { JwtPayload } from "jsonwebtoken";
import { loginAao, updateAdmimDao } from "../db/dao/adminDao";
import { ValidationError } from "../utils/errorHandle";
import { publishJwt, verifyToken } from "../utils/jwt";
import {
  ILoginParams,
  IUpdateParams,
  IResponseData,
} from "./types/adminServiceType";
import md5 from "md5";

// 登录
export const loginService = async (
  loginInfo: ILoginParams
): Promise<string> => {
  loginInfo.loginPwd = md5(loginInfo.loginPwd);
  let time: number = 1;
  if (loginInfo.remembers > 1) {
    time = loginInfo.remembers;
  }
  const res = await loginAao(loginInfo);
  if (res) {
    const data = {
      id: res.toJSON().id,
      loginId: res.toJSON().loginId,
      loginPwd: res.toJSON().loginPwd,
      name: res.toJSON().name,
    };
    const token = publishJwt(data, time);
    return token;
  } else {
    throw new ValidationError("登录错误");
  }
};

// 校验用户
export const verifyUserService = (value: string): IResponseData => {
  const token = value.split(" ")[1];
  const res = verifyToken(token) as JwtPayload;
  return {
    id: res.id,
    loginId: res.loginId,
    name: res.name,
  };
};

export const updateUserInfoService = async (
  updateInfo: IUpdateParams,
  token: string
): Promise<IResponseData> => {
  const data = verifyToken(token.split(" ")[1]) as JwtPayload;
  if (data.loginPwd !== md5(updateInfo.oldLoginPwd)) {
    throw new ValidationError("旧密码不正确");
  }
  const params = {
    loginId: updateInfo.loginId,
    name: updateInfo.name,
    loginPwd: md5(updateInfo.loginPwd),
    id: data.id,
  };
  await updateAdmimDao(params);

  return {
    loginId: updateInfo.loginId,
    name: updateInfo.name,
    id: data.id,
  };
};
