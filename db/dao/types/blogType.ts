export interface IBlogTypeInfo {
  name: string;
  articleCount: number;
  order: number;
}

export interface IBlogPageParams {
  page: number;
  limit: number;
  categoryId: number;
}
