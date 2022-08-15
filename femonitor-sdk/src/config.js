const config = {
  // 上报地址
  url: "",
  // 项目id 支持H5 Web 小程序
  appID: "",
  // 登录用户的id
  userID: "",
  systemInfo: window.navigator.userAgent,
  vue: {
    Vue: null,
    router: null
  }
};

export default config;

export function setConfig(options) {
  for (const key in config) {
    if (options[key]) {
      config[key] = options[key];
    }
  }
}
