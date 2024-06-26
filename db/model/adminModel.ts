/**
 * @author OKOK
 * @desc 用户表建立
 * @date 2024-04-24
 */

import sequelize from "../db";
import { DataTypes, Model } from "sequelize";

interface IAdminModel extends Model {
  loginId: string;
  name: string;
  loginPwd: string;
}

const adminModel = sequelize.define<IAdminModel>(
  "t-admin",
  {
    loginId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginPwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    paranoid: true, //从此以后，该表的数据不会真正的删除，而是增加一列deletedAt，记录删除的时间
  }
);

export default adminModel;
