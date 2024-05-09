/**
 * @author OKOK
 * @desc 数据库初始化模块
 * @date 2024-04-24
 */

import sequelize from "./db";
import md5 from "md5";
import adminModel from "./model/adminModel";
import bannerModel from "./model/bannerModel";
import blogModel from "./model/blogModel";
import blogTypeModel from "./model/blogTypeModel";
import commentModel from "./model/commentModel";
// import "./model/blogModel";

import "./model/fileModel";
import "./model/projectModel";
import "./model/messageModel";

(async () => {
  blogTypeModel.hasMany(blogModel, {
    foreignKey: "categoryId",
  });
  blogModel.belongsTo(blogTypeModel, {
    foreignKey: "categoryId",
    targetKey: "id",
    as: "category",
  });
  blogModel.hasMany(commentModel, {
    foreignKey: "blogId",
  });
  commentModel.belongsTo(blogModel, {
    foreignKey: "blogId",
    targetKey: "id",
    as: "blog",
  });

  await sequelize.sync({
    alter: true,
  });
  const count = await adminModel.count();
  const bannerCount = await bannerModel.count();
  // 初始化用户数据
  if (!count) {
    await adminModel.create({
      loginId: "OKOK",
      name: "超级管理员",
      loginPwd: md5("123456"),
    });
    console.log("初始化管理员数据成功🎉");
  }

  // 初始化首页 banner 数据
  if (!bannerCount) {
    await bannerModel.bulkCreate([
      {
        midImg: "/static/images/bg1_mid.jpg",
        bigImg: "/static/images/bg1_big.jpg",
        title: "塞尔达旷野之息",
        description: "2017年年度游戏，期待续作",
      },
      {
        midImg: "/static/images/bg2_mid.jpg",
        bigImg: "/static/images/bg2_big.jpg",
        title: "塞尔达四英杰",
        description: "四英杰里面你最喜欢的又是谁呢",
      },
      {
        midImg: "/static/images/bg3_mid.jpg",
        bigImg: "/static/images/bg3_big.jpeg",
        title: "日本街道",
        description: "动漫中经常出现的日本农村街道，一份独特的恬静",
      },
    ]);
  }

  console.log("所有模型同步完成💐");
})();
