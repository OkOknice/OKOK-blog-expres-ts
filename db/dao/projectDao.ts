import projectModel from "../model/projectModel";

// 添加项目
export const addProjectDao = async (project: any) => {
  const res = await projectModel.create(project);
  return res;
};
