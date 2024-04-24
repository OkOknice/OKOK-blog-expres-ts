export interface ILoginParams {
  loginId: string;
  loginPwd: string;
  remembers: number;
}

export interface IUpdateParams {
  loginId: string;
  loginPwd: string;
  name: string;
  oldLoginPwd: string;
}
