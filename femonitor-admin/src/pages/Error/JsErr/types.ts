import JsErr from "../ResourceErr/index";
export interface IQueryJsErrorType {
  pageNum: number;
  pageSize: number;
  startTime: number;
  endTime: number;
}

export interface JsErrorType {
  num: number;
  msg: string;
  line: string;
  column: string;
  createdAt: string;
  appID: string;
  pageURL: string;
  userID: string;
  ip: string;
  userNum: number;
  error: string;
}

export interface ConsoleErrorType {
  num: number;
  createdAt: string;
  appID: string;
  pageURL: string;
  userID: string;
  ip: string;
  userNum: number;
  error: string;
}

export interface VueErrorType {
  num: number;
  info: string;
  createdAt: string;
  appID: string;
  pageURL: string;
  userID: string;
  ip: string;
  userNum: number;
  error: string;
}

export interface PromiseErrorType {
  num: number;
  createdAt: string;
  appID: string;
  pageURL: string;
  userID: string;
  ip: string;
  userNum: number;
  reason: string | null;
  msg: string | null;
}

export interface JsErrorOverviewTypeItem {
  errNum: number;
  errUserNum: number;
  pv: number;
  userNum: number;
}

export interface JsErrorOverviewType {
  "console-error": JsErrorOverviewTypeItem;
  js: JsErrorOverviewTypeItem;
  promise: JsErrorOverviewTypeItem;
  vue: JsErrorOverviewTypeItem;
  all: JsErrorOverviewTypeItem;
}

export interface JsErrorCountTypeItem {
  errorNum: number;
  pv: number;
  rate: number | boolean;
}

export interface JsErrorCountType {
  js: JsErrorCountTypeItem[];
  promise: JsErrorCountTypeItem[];
  "console-error": JsErrorCountTypeItem[];
  vue: JsErrorCountTypeItem[];
}

export interface JsErrorShowItem {
  id: string;
  name: string;
  describe: string;
  times: number;
  effects: number;
  lastTime: string;
  data: any;
}
