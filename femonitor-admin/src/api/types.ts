type IPageInformation = {
  pageNum: number;
  pageSize: number;
  totalPage: number;
  total: number;
};
export interface ISortPagination<T> extends IPageInformation {
  list: T[];
}
export interface IPageType {
  pageSize: number;
  pageNum: number;
}
