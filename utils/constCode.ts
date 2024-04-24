/**
 * @author OKOK
 * @desc 状态码
 * @date 2024-04-24
 */

enum HTTP_CODE {
  SUCCESS_CODE = 800200, // 成功
  COMMON_ERROR_CODE = 800500, // 普通错误
  AUTH_CODE = 800401, // 无权限
  UPLOAD_CODE = 800413, // 附件
  VERTIY_CODE = 800406, // 验证
  NOFOUND_CODE = 800404, // 资源未找到
}

export default HTTP_CODE;
