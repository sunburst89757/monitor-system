import { myRequest } from "../service";
interface ITime {
  startTime: number;
  endTime: number;
}
interface PVUVList {
  pv: number;
  uv: number;
}
interface IErrorView {
  todayUvCount: number;
  vueCount: number;
  jsCount: number;
  resourceCount: number;
  consoleErrorCount: number;
  promiseCount: number;
}
interface IPerformance {
  xhrCount: number;
  xhrAverageDuration: number;
  xhrSuccess: number;
  domcontentloadedTime: number;
  onloadTime: number;
  ttfbTime: number;
  CLSValue: number;
  firstContentfulPaintTime: number;
  largestContentfulPaintTime: number;
}
export function getPvUvList(params: ITime) {
  return myRequest<ITime, PVUVList[]>({
    url: "/index/getPvUvList",
    params,
    method: "get"
  });
}
export function getErrorOverView(params: ITime) {
  return myRequest<ITime, IErrorView>({
    url: "/index/errorOverView",
    params,
    method: "get"
  });
}
export function getPerformanceOverView(params: ITime) {
  return myRequest<ITime, IPerformance>({
    url: "/index/performanceOverView",
    params,
    method: "get"
  });
}
