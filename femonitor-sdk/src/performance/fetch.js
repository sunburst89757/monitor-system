import { urlToJson } from "../utils/handleXhr";
import { lazyReportCache } from "../utils/report";

const originalFetch = window.fetch;

function overwriteFetch() {
  window.fetch = function newFetch(url, config) {
    const startTime = Date.now();
    const reportData = {
      startTime,
      url,
      method: (config?.method || "GET").toUpperCase(),
      subType: "fetch",
      type: "performance"
    };

    return originalFetch(url, config)
      .then((res) => {
        const data = res.clone();
        const responseData = await data.json();
        reportData.endTime = Date.now();
        reportData.duration = reportData.endTime - reportData.startTime;
        reportData.sendData = config.body || urlToJson(reportData.url);
        reportData.responseData = responseData;
        reportData.status = data.status;
        reportData.success = data.ok;

        lazyReportCache(reportData);

        return res;
      })
      .catch((err) => {
        reportData.endTime = Date.now();
        reportData.duration = reportData.endTime - reportData.startTime;
        reportData.status = 0;
        reportData.success = false;

        lazyReportCache(reportData);

        throw err;
      });
  };
}

export default function fetch() {
  overwriteFetch();
}
