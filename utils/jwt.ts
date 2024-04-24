/**
 * @author OKOK
 * @desc jwt 处理
 * @date 2024-04-24
 */
import jwt from "jsonwebtoken";
import md5 from "md5";

// 颁发 token
export const publishJwt = (signInfo: any, time: number = 1) => {
  return jwt.sign(signInfo, md5(process.env.JWT_PRIVATEKEY as string), {
    expiresIn: 60 * 60 * 24 * time,
  });
};

// 校验 token
export const verifyToken = (token: string) => {
  return jwt.verify(token, md5(process.env.JWT_PRIVATEKEY as string));
};
