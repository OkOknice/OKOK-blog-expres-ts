import projectModel from "../model/projectModel";
import { IProjectParams } from "./types/projectType";

// 添加项目
export const addProjectDao = async (projectInfo: any) => {
  const res = await projectModel.create(projectInfo);
  // console.log(res);
  return res;
};

// 查询某个项目
export const getProjectInfoDao = async (id: string) => {
  const res = await projectModel.findByPk(id);

  return res;
};

// 更新项目信息
export const updateProjectInfoDao = async (
  id: string,
  projectInfo: IProjectParams
) => {
  const res = await projectModel.update(projectInfo, {
    where: {
      id,
    },
  });

  return res;
};

// 删除项目
export const deleteProjectDao = async (id: string) => {
  const res = await projectModel.destroy({
    where: {
      id,
    },
  });

  return res;
};

// 获取项目列表
export const getProjectListDao = async () => {
  const res = await projectModel.findAll();
  return res;
};
