/**
 * @author OKOK
 * @desc 登录管理逻辑层模块
 * @date 2024-04-24
 */

import { JwtPayload } from "jsonwebtoken";
import { loginAao } from "../db/dao/adminDao";
import { ValidationError } from "../utils/errorHandle";
import { publishJwt, verifyToken } from "../utils/jwt";
import { ILoginParams } from "./types/adminServiceType";
import md5 from "md5";

// 登录
export const loginService = async (loginInfo: ILoginParams) => {
  loginInfo.loginPwd = md5(loginInfo.loginPwd);
  const res = await loginAao(loginInfo);
  if (res) {
    const data = {
      id: res.toJSON().id,
      loginId: res.toJSON().loginId,
      name: res.toJSON().name,
    };
    const token = publishJwt(data);
    return token;
  } else {
    throw new ValidationError("登录错误");
  }
};

// 校验用户
export const verifyUserService = (value: string) => {
  const token = value.split(" ")[1];
  const res = verifyToken(token) as JwtPayload;
  return {
    id: res.id,
    name: res.name,
    loginId: res.loginId,
  };
};
