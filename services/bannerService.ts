/**
 * @author OKOK
 * @desc 首页逻辑层模块
 * @date 2024-04-25
 */

import { getBannerListDao, updateBannerDao } from "../db/dao/bannerDao";
import { IBannerInfo } from "../db/dao/types/bannerType";

export const getBannerListService = async () => {
  const res = await getBannerListDao();

  return res.map((item) => item.dataValues);
};

export const updateBannerServices = async (bannerInfo: IBannerInfo) => {
  const res = await updateBannerDao(bannerInfo);
  return bannerInfo;
};
