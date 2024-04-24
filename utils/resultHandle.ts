/**
 * @author OKOK
 * @desc 返回结果处理
 * @date 2024-04-24
 */

import HTTP_CODE from "./constCode";

export const resultHandle = (
  data: any,
  code: number = HTTP_CODE.SUCCESS_CODE,
  message: string = "success"
) => {
  return {
    code,
    message,
    data,
  };
};
