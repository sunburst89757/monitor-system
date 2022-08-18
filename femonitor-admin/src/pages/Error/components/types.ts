export interface dataDisplayType {
  label: string;
  id: string;
  option: any;
  wAh: {
    width: string;
    height: string;
  };
}
export interface quietViewErrType {
  label: string;
  value: string;
  showPage: boolean;
  pageSize: number;
  timeSelect: string;
}

export interface QuietViewErrListType {
  id: string;
  name: string;
  describe: string;
  lastTIme: string;
  effects: number;
  times: number;
  data?: object;
}
export interface errListType {
  errortype: string;
}
