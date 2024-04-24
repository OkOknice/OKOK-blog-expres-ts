export interface ILoginInfo {
  loginId: string;
  loginPwd: string;
}

export interface IUserInfo extends ILoginInfo {
  id: string;
}
