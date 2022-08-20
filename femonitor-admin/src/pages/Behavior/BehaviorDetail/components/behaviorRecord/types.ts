export interface IUserLogsQuery {
  type: "1" | "2" | "3" | "4" | "5";
  userId: string;
  startTime: number;
  endTime: number;
  pageNum: number;
  pageSize: number;
}
export interface DetailType {
  title: string;
  description?: any;
}
