// const { addBlogType, getBlogTypeList, getBlogTypeInfo, updateBlogTypeInfo, deleteBlogType } = require('../db/dao/blogTypeDao')
import {
  addBlogTypeDao,
  getBlogTypeListDao,
  getBlogTypeInfoDao,
  updateBlogTypeInfoDao,
  deleteBlogTypeDao,
} from "../db/dao/blogTypeDao";
import { IBlogTypeInfo } from "../db/dao/types/blogType";

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
  // console.log(res)
  return res;
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
  const res = await deleteBlogTypeDao(id);
  return res;
};
