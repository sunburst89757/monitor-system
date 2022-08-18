import {
  IQueryJsErrorType,
  JsErrorType,
  JsErrorOverviewType
} from "../pages/Error/JsErr/types";
import { myRequest } from "../service";
import { IPage, ITimeDuration } from "./types";
interface IUserBehaviorRes extends IPage {
  result: JsErrorType[];
}
export function getJsErrorList(params: IQueryJsErrorType) {
  return myRequest<IQueryJsErrorType, IUserBehaviorRes>({
    url: "/error/script/jsError",
    params,
    method: "get"
  });
}

export function getJsErrorOverview(params: ITimeDuration) {
  return myRequest<ITimeDuration, JsErrorOverviewType>({
    url: "/error/script/overview",
    params,
    method: "get"
  });
}
