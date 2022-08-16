import { lazyReportCache } from "../utils/report";
import { getUUID } from "./utils";

export default function onVueRouter(router) {
  router.beforeEach((to, from, next) => {
    // 首次加载页面不用统计
    if (!from.name) {
      return next();
    }

    const data = {
      params: to.params,
      query: to.query
    };

    lazyReportCache({
      data,
      name: to.name || to.path,
      type: "behavior",
      subType: "vue-router-change",
      startTime: performance.now(),
      from: from.fullPath,
      to: to.fullPath,
      uuid: getUUID()
    });
    lazyReportCache({
      type: "behavior",
      subType: "pv",
      startTime: performance.now(),
      referrer: from.fullPath,
      pageURL: to.fullPath,
      uuid: getUUID()
    });

    next();
  });
}
