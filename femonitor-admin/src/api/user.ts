import { myRequest } from "../service";
import { IUserInfo } from "../store/types";

export interface requestParams {
  username: string;
  password: string;
}
export interface Res {
  token: string;
  nickName: string;
  userId: number;
  username: string;
}
export function login(params: requestParams) {
  return myRequest<requestParams, Res>({
    url: "/login/login",
    params,
    method: "post",
    successMsg: "登录成功"
  });
}
export function getUserInfo() {
  return myRequest<number, IUserInfo>({
    url: `/sys/user/getUserInfo`,
    method: "get"
  });
}

export function logout() {
  return myRequest({
    url: "/login/logout",
    method: "post"
  });
}
