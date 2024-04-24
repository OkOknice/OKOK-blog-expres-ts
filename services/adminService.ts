import { loginAao } from "../db/dao/adminDao";
import { ValidationError } from "../utils/errorHandle";
import { ILoginParams } from "./types/adminServiceType";
import md5 from "md5";

export const loginService = async (loginInfo: ILoginParams) => {
  loginInfo.loginPwd = md5(loginInfo.loginPwd);
  const res = await loginAao(loginInfo);
  if (res) {
    return {
      id: res.toJSON().id,
      loginId: res.toJSON().loginId,
      name: res.toJSON().name,
    };
  } else {
    throw new ValidationError("登录错误");
  }
  // console.log(res);
};
