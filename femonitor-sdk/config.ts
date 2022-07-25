export type IConfig = {
  url: string;
  //  设备Id
  deviceId: string;
  //   用户id
  userId: string;
  //   没有登录来确定用户就使用ip
  ip: string;
  vue?: {
    Vue: any;
    router: any;
  };
  react?: {
    React: any;
    router: any;
  };
};
export const config: IConfig = {
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
export const setConfig = (options: IConfig) => {
  for (const key in config) {
    if (options[key as keyof IConfig]) {
      config[key as keyof IConfig] = options[key as keyof IConfig] as any;
    }
  }
};
