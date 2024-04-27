export interface IBlogInfo {
  title: string;
  description: string;
  toc: string;
  htmlContent: string;
  thumb: string;
  scanNumber: number;
  commentNumber: number;
  createDate: number;
  categoryId: string;
}

export interface IUpdateBlogInfo extends IBlogInfo {
  id: string;
}
