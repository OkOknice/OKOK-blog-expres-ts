import adminModel from "../model/adminModel";
import { ILoginInfo, IUserInfo } from "./types/adminType";

export const loginAao = async (loginInfo: ILoginInfo) => {
  const res = await adminModel.findOne({
    where: {
      loginId: loginInfo.loginId,
      loginPwd: loginInfo.loginPwd,
    },
  });
  return res;
};

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
