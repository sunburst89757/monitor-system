"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const handleBehavior_1 = require("./src/handleBehavior");
const handleError_1 = require("./src/handleError");
const handlePerformance_1 = require("./src/handlePerformance");
const monitor = {
    init(options) {
        (0, config_1.setConfig)(options);
        // 错误监控
        (0, handleError_1.handleError)();
        // 行为监控
        (0, handleBehavior_1.handleBehavior)();
        // 性能监控
        (0, handlePerformance_1.handlePerformance)();
    }
};
exports.default = monitor;
