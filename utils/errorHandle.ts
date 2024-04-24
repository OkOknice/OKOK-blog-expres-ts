/**
 * @author OKOK
 * @desc 返回错误参数及状态码统一处理工具
 * @date 2024-04-24
 */
import HTTP_CODE from "./constCode";

class ServiceError extends Error {
  code: number;
  message: string;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.message = message;
  }

  handleResult() {
    return {
      data: null,
      message: this.message,
      code: this.code,
    };
  }
}

// 附件上传
export const UploadError = class extends ServiceError {
  constructor(message: string) {
    super(message, HTTP_CODE.UPLOAD_CODE);
  }
};

// 禁止访问
export const ForbiddenError = class extends ServiceError {
  constructor(message: string) {
    super(message, HTTP_CODE.AUTH_CODE);
  }
};

// 验证错误
export const ValidationError = class extends ServiceError {
  constructor(message: string) {
    super(message, HTTP_CODE.VERTIY_CODE);
  }
};

// 无资源错误
export const NotFoundError = class extends ServiceError {
  constructor() {
    super("not found", HTTP_CODE.NOFOUND_CODE);
  }
};

// 未知错误
export const UnknownError = class extends ServiceError {
  constructor() {
    super("server internal error", HTTP_CODE.COMMON_ERROR_CODE);
  }
};
