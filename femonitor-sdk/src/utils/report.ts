import { config } from "../../config";

type IReportData = {
  type: "behavior" | "error" | "performance";
  subType: string;
  pageUrl: string;
  startTime: number;
  errorData?: any;
  line?: number;
  column?: number;
  msg?: string;
  error?: any;
  info?: any;
};
// 浏览器是否支持sendBeacon 上报数据
export const isSupportSendBeacon = () => !!window.navigator?.sendBeacon;
export const reportWithXhr = (url: string, data: string) => {
  const xhr = new XMLHttpRequest();
  XMLHttpRequest.prototype.open.call(xhr, "post", url, true);
  XMLHttpRequest.prototype.send.call(xhr, data);
};
const sendBeacon = isSupportSendBeacon()
  ? window.navigator.sendBeacon.bind(window.navigator)
  : reportWithXhr;
export const report = (
  data: IReportData,
  isImmediate: boolean = false,
  timeout = 3000
) => {
  const { url, userId, ip, deviceId } = config;
  const reportData = JSON.stringify({
    userId,
    ip,
    deviceId,
    data
  });
  if (isImmediate) {
    sendBeacon(url, reportData);
    return;
  }
  //   延时上报:不用定时器，这个可以在浏览器空闲时调用
  window.requestIdleCallback(
    () => {
      sendBeacon(url, reportData);
    },
    { timeout: timeout }
  );
};
