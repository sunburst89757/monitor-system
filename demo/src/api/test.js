import { service } from "@/utils/service";
export function getUserList(params) {
  return service({
    url: "/sys/user/listUser",
    method: "get",
    params,
  });
}
export function getUserMenuList() {
  return service({
    url: "/sys/user/getUserMenuList",
    method: "get",
  });
}
