import {
  IQueryUserBehavior,
  IUserBehaviorList
} from "../pages/Behavior/UserBehaviorOverview/types";
import { myRequest } from "../service";
import { IPage } from "./types";
interface IUserBehaviorRes extends IPage {
  result: IUserBehaviorList[];
}
export function getUserBehaviorList(params: IQueryUserBehavior) {
  return myRequest<IQueryUserBehavior, IUserBehaviorRes>({
    url: "/user/behavior",
    params,
    method: "get"
  });
}
