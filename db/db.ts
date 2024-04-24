import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_DATABASE as string, // 数据库名称
  process.env.DB_USERNAME as string, // 用户名
  process.env.DB_PWD as string, // 密码
  {
    host: process.env.DB_HOST as string,
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;
