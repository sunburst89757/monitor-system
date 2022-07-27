import { message } from "antd";
import { RequestConfig } from "./types";
const BASE_URL = "http://119.91.226.225:8300/clock-admin";
export const config: RequestConfig = {
  baseURL: BASE_URL,
  // headers: {
  //   Authorization: "fc627c21-2cae-405b-ad19-66a383c2ca16"
  // },
  timeout: 1000 * 60 * 5,
  interceptors: {
    // requestSuccess: (config) => {
    //   console.log("特有的请求拦截成功");
    //   return config;
    // },
    // requestErr: (err: any) => {
    //   console.log(err, "特有的请求拦截失败");
    // },
    responseSuccess: (res) => {
      // console.log("特有的响应拦截成功", res);
      if ((res as any).code !== 200) {
        message.error((res as any).message || "未知错误");
      }
      return res;
    },
    responseErr: (err: any) => {
      message.error(err.message || "未知错误");
      // console.log("特有的响应拦截失败", err);
    }
  }
};
