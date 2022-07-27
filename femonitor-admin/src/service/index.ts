import { config as instanceConfig } from "./config";
import { MyRequest } from "./request/request";
import { RequestConfig } from "./types";
// 完整的接口返回成功的话一般返回以下四个参数
export interface IMyResponse<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}
// 取出其中的data
// type IRealResponse<T> = Pick<IMyResponse<T>, "data">;
interface ImyRequest<T> extends RequestConfig {
  // RequestConfig里有data，这里再写一次是为了使用传入泛型的方法来约束data类型
  data?: T;
}
const service = new MyRequest(instanceConfig);
// 该请求方式默认为GET，且一直用data作为参数(条件解决了)；
// T是真正的请求函数发出的参数的类型
// V是请求返回体的data的类型
export function myRequest<T, V = any>(config: ImyRequest<T>) {
  // 实验室不适用，接口规范可能有不统一的问题，可能出现有用POST 使用params传递的现象
  // const { method = "GET" } = config;
  // if (method === "get" || method === "GET") {
  //   config.params = config.data;
  // }
  return service.request<IMyResponse<V>>(config);
}
