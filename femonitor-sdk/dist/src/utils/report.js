"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.report = exports.reportWithXhr = exports.isSupportSendBeacon = void 0;
const config_1 = require("../../config");
// 浏览器是否支持sendBeacon 上报数据
const isSupportSendBeacon = () => { var _a; return !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.sendBeacon); };
exports.isSupportSendBeacon = isSupportSendBeacon;
const reportWithXhr = (url, data) => {
    const xhr = new XMLHttpRequest();
    XMLHttpRequest.prototype.open.call(xhr, "post", url, true);
    XMLHttpRequest.prototype.send.call(xhr, data);
};
exports.reportWithXhr = reportWithXhr;
const sendBeacon = (0, exports.isSupportSendBeacon)()
    ? window.navigator.sendBeacon.bind(window.navigator)
    : exports.reportWithXhr;
const report = (data, isImmediate = false, timeout = 3000) => {
    const { url, userId, ip, deviceId } = config_1.config;
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
    window.requestIdleCallback(() => {
        sendBeacon(url, reportData);
    }, { timeout: timeout });
};
exports.report = report;
