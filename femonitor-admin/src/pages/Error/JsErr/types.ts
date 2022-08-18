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
