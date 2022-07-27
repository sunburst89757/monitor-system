import { myRequest } from "../service";

export interface requestParams {
  username: string;
  password: string;
}
export interface Res {
  token: string;
  nickName: string;
  userId: number;
}
export function login(params: requestParams) {
  return myRequest<requestParams, Res>({
    url: "/login/login",
    params,
    method: "post"
  });
}
export function logout() {
  return myRequest({
    url: "/login/logout",
    method: "post"
  });
}

export function getAreaList() {
  return myRequest({
    url: "/area/list",
    method: "get"
  });
}
