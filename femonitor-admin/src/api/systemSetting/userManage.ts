import { IUserList } from "../../pages/systemSetting/userManage/config";
import { myRequest } from "../../service";
export function deleteUser(params: number) {
  return myRequest<any, any>({
    url: `/sys/user/deleteOneUser/${params}`,
    method: "post",
    successMsg: "删除成功"
  });
}
export function addUser(data: IUserList) {
  return myRequest<any, any>({
    url: "/sys/user/addOneUser",
    method: "post",
    data,
    successMsg: "添加成功"
  });
}
export function updateUser(data: IUserList) {
  return myRequest<any, any>({
    url: "/sys/user/updateOneUser",
    method: "post",
    data,
    successMsg: "修改用户信息成功"
  });
}
