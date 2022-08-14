import { service } from "@/utils/service";

export function login(params) {
  return service({
    url: "/login/login",
    method: "post",
    params,
  });
}
export function getUserList() {
  return service({
    url: "/sys/user/listUser",
    method: "get",
  });
}
export function getUserMenuList() {
  return service({
    url: "/sys/user/getUserMenuList",
    method: "get",
  });
}
