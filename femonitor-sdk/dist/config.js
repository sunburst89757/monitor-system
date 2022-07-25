"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfig = exports.config = void 0;
exports.config = {
    url: "",
    deviceId: "",
    userId: "",
    ip: "",
    vue: {
        Vue: null,
        router: null
    },
    react: {
        React: null,
        router: null
    }
};
const setConfig = (options) => {
    for (const key in exports.config) {
        if (options[key]) {
            exports.config[key] = options[key];
        }
    }
};
exports.setConfig = setConfig;
