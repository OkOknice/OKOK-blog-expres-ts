// const { addBlogType, getBlogTypeList, getBlogTypeInfo, updateBlogTypeInfo, deleteBlogType } = require('../db/dao/blogTypeDao')
import { deleteCategoryAllBlogDao } from "../db/dao/blogDao";
import {
  addBlogTypeDao,
  getBlogTypeListDao,
  getBlogTypeInfoDao,
  updateBlogTypeInfoDao,
  deleteBlogTypeDao,
} from "../db/dao/blogTypeDao";
import { IBlogTypeInfo } from "../db/dao/types/blogType";
import { NotFoundError } from "../utils/errorHandle";

// 添加分类
export const addBlogTypeServices = async (blogTypeInfo: IBlogTypeInfo) => {
  blogTypeInfo.articleCount = 0;
  const res = await addBlogTypeDao(blogTypeInfo);
  // console.log(res)
  return res;
};

// 获取分类列表
export const getBlogTypeListServices = async () => {
  const res = await getBlogTypeListDao();
  // console.log(res)
  return res;
};

// 获取分类信息
export const getBlogTypeInfoServices = async (id: string) => {
  const res = await getBlogTypeInfoDao(id);
  if (res) {
    return res.toJSON();
  } else {
    throw new NotFoundError("分类不存在");
  }
  // console.log(res)
};

// 更新分类信息
export const updateBlogTypeInfoServices = async (
  id: string,
  blogTypeInfo: IBlogTypeInfo
) => {
  const res = await updateBlogTypeInfoDao(id, blogTypeInfo);
  return {
    id,
    ...blogTypeInfo,
  };
};

// 删除分类
export const deleteBlogTypeServices = async (id: string) => {
  const data = await getBlogTypeInfoDao(id);
  if (data) {
    data.dataValues.articleCount = 0;
    data.save();
    // 删除分类
    await deleteBlogTypeDao(id);
    // 删除关联的所有文章
    await deleteCategoryAllBlogDao(id);
    return "删除成功";
  } else {
    throw new NotFoundError("分类不存在");
  }
};
