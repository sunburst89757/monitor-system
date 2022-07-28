export type IConfig = {
  url: string;
  //  设备Id
  deviceId?: string;
  //   用户id
  userId?: string;
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
