import blogTypeModel from "../model/blogTypeModel";
import { IBlogTypeInfo } from "./types/blogType";
import type { Optional } from "sequelize";

// 定义一个新的分类信息接口，继承IBlogTypeInfo，并去掉articleCount属性
interface INewBlogTypeInfo extends Optional<IBlogTypeInfo, "articleCount"> {}

// 添加分类
export const addBlogTypeDao = async (blogTypeInfo: INewBlogTypeInfo) => {
  const res = await blogTypeModel.create(blogTypeInfo);
  return res.toJSON();
};

// 分类列表
export const getBlogTypeListDao = async () => {
  let dataList = [];
  const res = await blogTypeModel.findAll();
  dataList = res.map((item) => item.dataValues);
  return dataList;
};

// 查询分类信息
export const getBlogTypeInfoDao = async (id: string) => {
  const res = await blogTypeModel.findByPk(id);
  return res;
};

// 更新分类信息
export const updateBlogTypeInfoDao = async (
  id: string,
  blogTypeInfo: IBlogTypeInfo
) => {
  const res = await blogTypeModel.update(blogTypeInfo, {
    where: {
      id,
    },
  });
  return res;
};

// 删除分类
export const deleteBlogTypeDao = async (id: string) => {
  const res = await blogTypeModel.destroy({
    where: {
      id,
    },
  });
  return res;
};

// 根据 id 新增对应博客分类的文章数量
export const addBlogTypeCountDao = async (id: string) => {
  const res = await blogTypeModel.findByPk(id);
  if (res) {
    return res.increment("articleCount", { by: 1 });
  } else {
    return null;
  }
};
