import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { cache } from "../../utils/localStorage";
import { RequestConfig } from "../types";
import { store } from "../../store";
import {
  changeisShowReloginModal,
  incrementDatedNum,
  setLoading
} from "../../store/module/user";
import { message } from "antd";
import { IMyResponse } from "..";
export class MyRequest {
  service: AxiosInstance;
  constructor(config: RequestConfig) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // console.log("所有实例都请求拦截成功");
        const token = cache.getItem("token");
        store.dispatch(setLoading({ loading: true }));
        if (token) {
          config.headers!.Authorization = token;
        }
        return config;
      },
      (err: any) => {
        // console.log(err, "所有实例都请求拦截失败");
        return Promise.reject(err);
      }
    );
    // 不同实例的请求拦截器
    this.service.interceptors.request.use(
      config.interceptors?.requestSuccess,
      config.interceptors?.requestErr
    );
    this.service.interceptors.response.use(
      (res: AxiosResponse) => {
        // console.log(res, "公共响应拦截成功");
        store.dispatch(setLoading({ loading: false }));
        if (res.data.code === 500) {
          store.dispatch(incrementDatedNum());
          if (store.getState().user.datedNum === 1) {
            store.dispatch(changeisShowReloginModal());
          }
        }
        return res.data;
      },
      (err) => {
        if (err.response.status === 500) {
          store.dispatch(incrementDatedNum());
          if (store.getState().user.datedNum === 1) {
            store.dispatch(changeisShowReloginModal());
          }
        }
        store.dispatch(setLoading({ loading: false }));
        return Promise.reject(err);
      }
    );
    // 不同实例的响应拦截器
    this.service.interceptors.response.use(
      config.interceptors?.responseSuccess,
      config.interceptors?.responseErr
    );
  }
  request<T = IMyResponse>(config: RequestConfig): Promise<T> {
    // 这个return才是真正执行请求，在执行请求前进行请求拦截--目的就是改变config
    if (config?.interceptors?.requestSuccess) {
      config = config.interceptors.requestSuccess(config);
    }
    return new Promise((resolve, reject) => {
      this.service
        .request<any, T>(config)
        .then((res) => {
          if ((res as any).success && config.successMsg) {
            message.success(config.successMsg);
          }
          // 响应成功的拦截
          if (config.interceptors?.responseSuccess) {
            res = config.interceptors?.responseSuccess<T>(res);
          }
          resolve(res);
        })
        .catch((err: any) => {
          if (config.interceptors?.responseErr) {
            err = config.interceptors?.responseErr(err);
          }
          reject(err);
        });
    });
  }
}
