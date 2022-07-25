"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const report_1 = require("../utils/report");
function handleError() {
    window.onerror = () => {
        console.log(arguments, "错误监控的结果");
        (0, report_1.report)(arguments);
    };
}
exports.handleError = handleError;
