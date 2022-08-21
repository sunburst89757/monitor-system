import {
  // 请求数据
  IQueryJsErrorType,
  // JsError
  JsErrorType,
  JsErrorOverviewType,
  JsErrorCountType,
  ConsoleErrorType,
  VueErrorType,
  PromiseErrorType
} from "../pages/Error/JsErr/types";
// resource
import {
  getResourceOverviewType,
  getResourceCountType,
  getResourceDataItemType
} from "../pages/Error/ResourceErr/types";
import { apiItemType } from "../pages/Error/RequestErr/types";
import { apiOverviewType, apiCountType } from "../pages/Error/RequestErr/types";

import { myRequest } from "../service";
import { IPage, ITimeDuration } from "./types";
// script
interface getJsErrorListRes extends IPage {
  result: JsErrorType[];
}
interface getConsoleErrorListRes extends IPage {
  result: ConsoleErrorType[];
}
interface getVueErrorListRes extends IPage {
  result: VueErrorType[];
}
interface getPromiseErrorListRes extends IPage {
  result: PromiseErrorType[];
}
interface getApiErrorListRes extends IPage {
  result: apiItemType[];
}
// resource
interface getResourceDataType extends IPage {
  result: getResourceDataItemType[];
}
// script
export function getJsErrorList(params: IQueryJsErrorType) {
  return myRequest<IQueryJsErrorType, getJsErrorListRes>({
    url: "/error/script/jsError",
    params,
    method: "get"
  });
}
export function getConsoleErrorList(params: IQueryJsErrorType) {
  return myRequest<IQueryJsErrorType, getConsoleErrorListRes>({
    url: "/error/script/consoleError",
    params,
    method: "get"
  });
}
export function getVueErrorList(params: IQueryJsErrorType) {
  return myRequest<IQueryJsErrorType, getVueErrorListRes>({
    url: "/error/script/vueError",
    params,
    method: "get"
  });
}

export function getPromiseErrorList(params: IQueryJsErrorType) {
  return myRequest<IQueryJsErrorType, getPromiseErrorListRes>({
    url: "/error/script/promiseError",
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
export function getJsErrorCount(params: ITimeDuration) {
  return myRequest<ITimeDuration, JsErrorCountType>({
    url: "/error/script/getErrorCount",
    params,
    method: "get"
  });
}
// resource
export function getResourceOverview(params: ITimeDuration) {
  return myRequest<ITimeDuration, getResourceOverviewType>({
    url: "/error/resource/overview",
    params,
    method: "get"
  });
}
export function getResourceErrorCount(params: ITimeDuration) {
  return myRequest<ITimeDuration, getResourceCountType>({
    url: "/error/resource/getErrorCount",
    params,
    method: "get"
  });
}
export function getResourceData(params: IQueryJsErrorType) {
  return myRequest<IQueryJsErrorType, getResourceDataType>({
    url: "/error/resource/data",
    params,
    method: "get"
  });
}
export function getResourceApiOverview(params: ITimeDuration) {
  return myRequest<ITimeDuration, apiOverviewType>({
    url: "/error/resource/apiOverview",
    params,
    method: "get"
  });
}
export function getApiErrorCount(params: ITimeDuration) {
  return myRequest<ITimeDuration, apiCountType>({
    url: "/error/resource/getApiErrorCount",
    params,
    method: "get"
  });
}

export function getXhrErrorCount(params: IQueryJsErrorType) {
  return myRequest<IQueryJsErrorType, getApiErrorListRes>({
    url: "/error/resource/xhrError",
    params,
    method: "get"
  });
}
export function getFetchErrorCount(params: IQueryJsErrorType) {
  return myRequest<IQueryJsErrorType, getApiErrorListRes>({
    url: "/error/resource/fetchError",
    params,
    method: "get"
  });
}
