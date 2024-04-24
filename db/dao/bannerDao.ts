/**
 * @author OKOK
 * @desc 首页数据处理模块
 * @date 2024-04-25
 */

import bannerModel from "../model/bannerModel";
import { IBannerInfo } from "./types/bannerType";

// 获取所有首页数据
export const getBannerListDao = async () => {
  const res = await bannerModel.findAll();
  return res;
};

// 更新某个首页数据
export const updateBannerDao = async (bannerInfo: IBannerInfo) => {
  const res = await bannerModel.update(bannerInfo, {
    where: {
      id: bannerInfo.id,
    },
  });
  return res;
};
