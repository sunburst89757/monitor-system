import { RequestConfig } from "./types";
const BASE_URL = "https://trade.redumy.top/trade";
// const BASE_URL = "https://bgt.d9lab.net/trade";
export const config: RequestConfig = {
  baseURL: BASE_URL,
  // headers: {
  //   Authorization: "fc627c21-2cae-405b-ad19-66a383c2ca16"
  // },
  timeout: 1000 * 60 * 5
  /* interceptors: {
    requestSuccess: (config) => {
      console.log("特有的请求拦截成功");
      return config;
    },
    requestErr: (err: any) => {
      console.log(err, "特有的请求拦截失败");
    },
    responseSuccess: (res) => {
      console.log("特有的响应拦截成功", res);
      return res;
    },
    responseErr: (err: any) => {
      console.log("特有的响应拦截失败", err);
    }
  } */
};
