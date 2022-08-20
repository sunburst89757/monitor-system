import {
  IApiLoadTime,
  IPageSource,
  IQueryParams
} from "../pages/Behavior/BehaviorDetail/components/userDetail/userDetail";
import { IUserLogsQuery } from "../pages/Behavior/BehaviorDetail/components/behaviorRecord/types";
import {
  IQueryUserBehavior,
  IUserBehaviorList
} from "../pages/Behavior/UserBehaviorOverview/types";
import { myRequest } from "../service";
import { IPage } from "./types";
interface IUserBehaviorRes extends IPage {
  result: IUserBehaviorList[];
}
interface IUserLogsRes extends IPage {
  result: any[];
}
export function getUserBehaviorList(params: IQueryUserBehavior) {
  return myRequest<IQueryUserBehavior, IUserBehaviorRes>({
    url: "/user/behavior",
    params,
    method: "get"
  });
}
export function getUserLogs(params: IUserLogsQuery) {
  return myRequest<IUserLogsQuery, IUserLogsRes>({
    url: "/user/userLogs",
    params,
    method: "get"
  });
}
export function getApiLoadTime(params: IQueryParams) {
  return myRequest<IQueryParams, IApiLoadTime>({
    url: "/user/loadTime",
    params,
    method: "get"
  });
}
export function getPageLoadTime(params: IQueryParams) {
  return myRequest<IQueryParams, IPageSource[]>({
    url: "/user/loadAveTime",
    params,
    method: "get"
  });
}
