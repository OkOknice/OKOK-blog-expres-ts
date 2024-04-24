/**
 * @author OKOK
 * @desc 验证码逻辑层模块
 * @date 2024-04-24
 */

import svgCaptcha from "svg-captcha";

export const getCaptchaService = () => {
  return svgCaptcha.create({
    size: 4,
    ignoreChars: "iIl10Oo",
    noise: 6,
    color: true,
  });
};
