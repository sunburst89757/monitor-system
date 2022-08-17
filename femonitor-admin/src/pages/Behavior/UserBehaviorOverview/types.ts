export interface IQueryUserBehavior {
  uesrId?: string;
  pageNum: number;
  pageSize: number;
  startTime: number;
  endTime: number;
}
export interface IUserBehaviorList {
  pageUrl: string;
  userID: string;
  time: number;
  id: string;
  ip: string;
  city: string;
  ua: string;
}
