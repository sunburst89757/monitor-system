import { myRequest } from "../service";
// U 是返回data的具体类型
type IQueryRes<T> = {
  pageNum: number;
  pageSize: number;
  totalPage: number;
  total: number;
  list: T[];
};
// U是list的类型
export function getDataList<T, U>(url: string, params: T) {
  return myRequest<any, IQueryRes<U>>({
    url,
    method: "get",
    params
  });
}
export function addData(url: string, data: any) {
  return myRequest<any, any>({
    url,
    method: "post",
    data,
    successMsg: "添加成功"
  });
}
export function updateData(url: string, data: any) {
  return myRequest<any, any>({
    url,
    method: "post",
    data,
    successMsg: "修改成功"
  });
}
