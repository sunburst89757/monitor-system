export type IConfig = {
  url: string;
  //  设备Id
  deviceId?: string;
  //   用户id
  userId?: string;
  //   没有登录来确定用户就使用ip
  ip?: string;
  vue?: {
    Vue: any;
    router: any;
  };
  react?: {
    React: any;
    router: any;
  };
};
export namespace monitor {
  function init(options: IConfig): any;
}
