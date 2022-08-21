import { myRequest } from "../service";
import { ITimeDuration } from "./types";
interface queryPerformance {
  startTime: number;
  endTime: number;
  pageSize: number;
  pageNum: number;
  type: string;
}

export function getPerformanceList(params: queryPerformance) {
  return myRequest<queryPerformance>({
    url: "/performance/getPerformanceList",
    params,
    method: "get"
  });
}

export function getXHR(params: ITimeDuration) {
  return myRequest<ITimeDuration>({
    url: "/index/performanceOverView",
    params,
    method: "get"
  });
}
