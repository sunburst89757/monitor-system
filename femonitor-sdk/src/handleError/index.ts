import { config } from "../../config";
import { getPageUrl } from "../utils/getPageUrl";
import { report } from "../utils/report";

export function handleError() {
  const _this = this;
  // console.error手动上报
  const originalConsoleError = window.console.error;
  window.console.error = (...args) => {
    originalConsoleError.apply(_this, args);
    report({
      type: "error",
      subType: "console-error",
      startTime: performance.now(),
      errorData: args,
      pageUrl: getPageUrl()
    });
  };
  // 监听通用的js错误
  window.onerror = (msg, url, line, column, error) => {
    report({
      msg,
      line,
      column,
      type: "error",
      subType: "js",
      errorData: error?.stack,
      pageUrl: getPageUrl(),
      startTime: performance.now()
    });
  };
  // 监听资源加载错误 js img
  window.addEventListener(
    "error",
    function (e) {
      const target = e.target;
      if (!target) return;
      // src和href是资源加载类型错误的标志
      if (
        (target as HTMLEmbedElement).src ||
        (target as HTMLLinkElement).href
      ) {
        const url =
          (target as HTMLEmbedElement).src || (target as HTMLLinkElement).href;
        report({
          type: "error",
          subType: "resource",
          pageUrl: getPageUrl(),
          startTime: e.timeStamp,
          html: (target as Element).outerHTML,
          resourceType: (target as any).tagName,
          paths: (e as any).path
            .map((item: any) => item.tagName)
            .filter(Boolean)
        });
      }
    },
    true
  );
  // 监听vue错误
  if (config.vue?.Vue) {
    config.vue.Vue.config.errorHandler = (err: any, vm: any, info: any) => {
      console.log(err);
    };
  }
}
