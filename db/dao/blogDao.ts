import { IUpdateBlogInfo } from "../../services/types/blogServiceType";
import blogModel from "../model/blogModel";
import blogTypeModel from "../model/blogTypeModel";
import { IBlogPageParams } from "./types/blogType";

// 添加博客文章
export const addBlogDao = async (blogInfo: any) => {
  return await blogModel.create(blogInfo);
};

// 获取文章分页
// { page: '1', limit: '5', categoryId: '2' }
export const getBlogPageDao = async (pageInfo: IBlogPageParams) => {
  const { page, limit, categoryId } = pageInfo;
  if (categoryId) {
    const res = await blogModel.findAndCountAll({
      include: [
        {
          model: blogTypeModel,
          as: "category",
          where: {
            id: categoryId,
          },
        },
      ],
      offset: (page * 1 - 1) * limit,
      limit: limit * 1,
    });
    return res;
  }
  const res = await blogModel.findAndCountAll({
    include: [
      {
        model: blogTypeModel,
        as: "category",
      },
    ],
    offset: (page * 1 - 1) * limit,
    limit: limit * 1,
  });
  return res;
};

// 根据 id 获取文章详情
export const getBlogDetailDao = async (id: string) => {
  return await blogModel.findByPk(id, {
    include: [
      {
        model: blogTypeModel,
        as: "category",
      },
    ],
  });
};

// 修改文章
export const updateBlogInfoDao = async (blogInfo: IUpdateBlogInfo) => {
  return await blogModel.update(blogInfo, {
    where: {
      id: blogInfo.id,
    },
  });
};

// 根据 id 删除文章
export const deleteBlogDao = async (id: string) => {
  return await blogModel.destroy({
    where: {
      id,
    },
  });
};

// 根据分类 id 获取所有文章并删除
export const deleteCategoryAllBlogDao = async (categoryId: string) => {
  return await blogModel.destroy({
    where: {
      categoryId,
    },
  });
};
