import { myRequest } from "../service";
import { IEndRoute } from "../store/types";
export function getUserMenuList() {
  return myRequest<any, IEndRoute[]>({
    url: `/sys/user/getUserMenuList`,
    method: "get"
  });
}

export function getUserMenuPerms() {
  return myRequest<any, string[]>({
    url: `/sys/user/getUserMenuPerms`,
    method: "get"
  });
}
