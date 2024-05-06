import {
  addBlogDao,
  getBlogPageDao,
  getBlogDetailDao,
  updateBlogInfoDao,
  deleteBlogDao,
} from "../db/dao/blogDao";
import validate from "validate.js";
import type { IBlogInfo, IUpdateBlogInfo } from "./types/blogServiceType";
import blogTypeModel from "../db/model/blogTypeModel";
import { ValidationError, NotFoundError } from "../utils/errorHandle";
import { addBlogTypeCountDao, getBlogTypeInfoDao } from "../db/dao/blogTypeDao";
import { IBlogPageParams } from "../db/dao/types/blogType";
import { blogRule, updateBlogRule } from "./validate/validateRules";
import blogModel from "../db/model/blogModel";
import { tranerTocResult, handleHtmlContent } from "../utils/tool";

// @ts-ignore
import toc from "markdown-toc";

// 扩展验证规则
validate.validators.categoryIdIsExist = async (value: number) => {
  const res = await blogTypeModel.findByPk(value);
  if (res) {
    return;
  }
  return "CategoryId Is Not Exist";
};

// 添加博客文章
export const addBlogService = async (blogInfo: IBlogInfo) => {
  const tocResult = toc(blogInfo.markdownContent).json;
  const resultList = tranerTocResult(tocResult);
  blogInfo.toc = JSON.stringify(resultList);
  blogInfo.htmlContent = handleHtmlContent(blogInfo.htmlContent, tocResult);
  // 初始化新文章的其他信息
  blogInfo.scanNumber = 0; // 阅读量初始化为 0
  blogInfo.commentNumber = 0; // 评论数初始化为 0
  blogInfo.createDate = new Date().getTime();
  delete blogInfo.markdownContent; // 删除 markdownContent 字段
  try {
    await validate.async(blogInfo, blogRule);
    const res = await addBlogDao(blogInfo);
    await addBlogTypeCountDao(blogInfo.categoryId);
    const data = res.toJSON();
    data.toc = JSON.parse(data.toc);
    return data;
  } catch (error) {
    throw new ValidationError("数据验证失败");
  }
};

// 获取文章分页
export const getBlogPageService = async (pageInfo: IBlogPageParams) => {
  let dataList = [];
  const res = await getBlogPageDao(pageInfo);
  dataList = res.rows.map((item) => {
    item.dataValues.toc = JSON.parse(item.dataValues.toc);
    return item.dataValues;
  });
  return {
    total: res.count,
    list: dataList,
  };
};

// 获取文章详情
export const getBlogDetailService = async (blogId: string, auth: boolean) => {
  const res = await getBlogDetailDao(blogId);
  if (res) {
    if (!auth) {
      res.increment("scanNumber", { by: 1 });
    }
    const data = res.toJSON();
    data.toc = JSON.parse(data.toc);
    return data;
  } else {
    throw new NotFoundError("文章不存在");
  }
};

// 更新文章
export const updateBlogService = async (blogInfo: IUpdateBlogInfo) => {
  blogInfo.toc = JSON.stringify(["a", "b", "c"]);
  try {
    await validate.async(blogInfo, updateBlogRule);
    const data = await blogModel.findByPk(blogInfo.id);
    if (data) {
      await updateBlogInfoDao(blogInfo);
      return "更新成功";
    } else {
      throw new NotFoundError("文章不存在");
    }
  } catch (error) {
    throw new ValidationError("数据验证失败");
  }
};

// 删除文章
export const deleteBlogService = async (id: string) => {
  try {
    const res = await getBlogDetailDao(id);
    if (res) {
      const data = await getBlogTypeInfoDao(res.toJSON().category.id);
      data?.decrement("articleCount", { by: 1 });
      await deleteBlogDao(id);
      return "删除成功";
    } else {
      throw new NotFoundError("文章不存在");
    }
  } catch (error) {
    throw new NotFoundError("未知错误");
  }
};
