"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const config_1 = require("../../config");
const getPageUrl_1 = require("../utils/getPageUrl");
const report_1 = require("../utils/report");
function handleError() {
    var _a;
    const _this = this;
    // console.error手动上报
    const originalConsoleError = window.console.error;
    window.console.error = (...args) => {
        originalConsoleError.apply(_this, args);
        (0, report_1.report)({
            type: "error",
            subType: "console-error",
            startTime: performance.now(),
            errorData: args,
            pageUrl: (0, getPageUrl_1.getPageUrl)()
        });
    };
    // 监听通用的js错误
    window.onerror = (msg, url, line, column, error) => {
        (0, report_1.report)({
            msg,
            line,
            column,
            type: "error",
            subType: "js",
            errorData: error === null || error === void 0 ? void 0 : error.stack,
            pageUrl: (0, getPageUrl_1.getPageUrl)(),
            startTime: performance.now()
        });
    };
    // 监听资源加载错误 js img
    window.addEventListener("error", function (e) {
        const target = e.target;
        if (!target)
            return;
        // src和href是资源加载类型错误的标志
        if (target.src ||
            target.href) {
            const url = target.src || target.href;
            (0, report_1.report)({
                type: "error",
                subType: "resource",
                pageUrl: (0, getPageUrl_1.getPageUrl)(),
                startTime: e.timeStamp,
                html: target.outerHTML,
                resourceType: target.tagName,
                paths: e.path
                    .map((item) => item.tagName)
                    .filter(Boolean)
            });
        }
    }, true);
    // 监听vue错误
    if ((_a = config_1.config.vue) === null || _a === void 0 ? void 0 : _a.Vue) {
        config_1.config.vue.Vue.config.errorHandler = (err, vm, info) => {
            console.log(err);
        };
    }
}
exports.handleError = handleError;
