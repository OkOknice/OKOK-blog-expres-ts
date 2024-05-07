import { addProjectDao } from "../db/dao/projectDao";

// 添加项目
export const addProjectService = async (projectInfo: any) => {
  const res = await addProjectDao(projectInfo);
  return res;
};
