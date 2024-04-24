/**
 * @author OKOK
 * @desc 数据库初始化模块
 * @date 2024-04-24
 */

import sequelize from "./db";
import adminModel from "./model/adminModel";
import md5 from "md5";

sequelize
  .sync({
    alter: true,
  })
  .then(async () => {
    const count = await adminModel.count();
    if (!count) {
      await adminModel.create({
        loginId: "OKOK",
        name: "超级管理员",
        loginPwd: md5("123456"),
      });
      console.log("初始化管理员数据成功🎉");
    }
    console.log("所有模型同步完成💐");
  });
