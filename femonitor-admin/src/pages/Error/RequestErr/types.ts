export interface apiOverviewItemType {
  total: number;
  error: number;
  user: number;
}

export interface apiOverviewType {
  xhr: apiOverviewItemType;
  fetch: apiOverviewItemType;
  all: apiOverviewItemType;
}

export interface apiCountItemType {
  total: number;
  errorNum: number;
  rate: number | null;
}
export interface apiCountType {
  xhr: apiCountItemType[];
  fetch: apiCountItemType[];
}

export interface apiItemType {
  num: number;
  status: number;
  duration: number;
  startTime: string;
  endTime: string;
  method: string;
  success: boolean;
  sendData: {
    t: string;
  };
  responseData: string;
  createdAt: string;
  appID: string;
  pageURL: string;
  userID: string;
  ip: string;
  userNum: number;
  url: string;
}
