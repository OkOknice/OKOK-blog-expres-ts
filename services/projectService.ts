import {
  addProjectDao,
  deleteProjectDao,
  getProjectInfoDao,
  getProjectListDao,
  updateProjectInfoDao,
} from "../db/dao/projectDao";
import { IProjectParams } from "../db/dao/types/projectType";
import { UnknownError, NotFoundError } from "../utils/errorHandle";

// 添加项目
export const addProjectService = async (projectInfo: IProjectParams) => {
  try {
    const res = await addProjectDao(projectInfo);
    return res.toJSON();
  } catch (error) {
    throw new UnknownError();
  }
};

// 更新项目
export const updateProjectService = async (
  id: string,
  projectInfo: IProjectParams
) => {
  const res = await updateProjectInfoDao(id, projectInfo);
  console.log(res);
  return "更新成功";
};

// 获取项目信息
export const getProjectInfoService = async (id: string) => {
  try {
    const res = await getProjectInfoDao(id);
    if (res) {
      const data = res.toJSON();
      delete data.deletedAt;
      return data;
    } else {
      throw new NotFoundError("查无该项目信息");
    }
  } catch (error) {
    throw new UnknownError();
  }
};

// 获取项目列表
export const getProjectListService = async () => {
  let list = [];
  const res = await getProjectListDao();
  list = res.map((item) => {
    const data = item.toJSON();
    delete data.deletedAt;
    return data;
  });
  return list;
};

// 删除项目
export const deleteProjectService = async (id: string) => {
  const res = await getProjectInfoDao(id);
  if (res) {
    await deleteProjectDao(id);
    return "删除成功";
  } else {
    throw new NotFoundError("查无该项目信息");
  }
};
