import { originalOpen, originalSend, originalProto } from "../utils/xhr";
import { lazyReportCache } from "../utils/report";
import { getPageURL } from "../utils/utils";

function overwriteOpenAndSend() {
  originalProto.open = function newOpen(...args) {
    this.url = args[1];
    this.method = args[0];
    originalOpen.apply(this, args);
  };

  originalProto.send = function newSend(...args) {
    this.startTime = Date.now();
    this.sendData = args[0];
    const onLoadend = (...args) => {
      this.endTime = Date.now();
      this.duration = this.endTime - this.startTime;
      const responseData = args[0].currentTarget.response;
      const { status, duration, startTime, endTime, url, method, sendData } =
        this;
      const reportData = {
        status,
        duration,
        startTime,
        endTime,
        url,
        sendData,
        responseData,
        method: (method || "GET").toUpperCase(),
        success: status >= 200 && status < 300,
        subType: "xhr",
        type: "performance",
        pageURL: getPageURL()
      };

      lazyReportCache(reportData);

      this.removeEventListener("loadend", onLoadend, true);
    };

    this.addEventListener("loadend", onLoadend, true);
    originalSend.apply(this, args);
  };
}

export default function xhr() {
  overwriteOpenAndSend();
}
