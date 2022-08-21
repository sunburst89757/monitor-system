export interface getResourceOverviewType {
  errNum: number;
  errUserNum: number;
  pv: number;
  userNum: number;
}

export interface getResourceCountItemType {
  errorNum: number;
  pv: number;
  rate: number | null;
}

export interface getResourceCountType {
  IMG?: any;
  SCRIPT?: any;
  PNG?: any;
  CSS?: any;
}

export interface getResourceDataItemType {
  num: number;
  html: string;
  resourceType: string;
  createdAt: string;
  appID: string;
  pageURL: string;
  userID: string;
  ip: string;
  userNum: number;
  error: string;
}
