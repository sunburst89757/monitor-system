//  2022-08-11 --> 2022-08-11 8点的时间戳
// 相对于8点
// 给定日期的0点
/* export const date2timeStampZero = (date: string) => {
  return (Date.parse(date) - 8 * 60 * 60 * 1000) / 1000;
};
// 给定日期的24点
export const date2timeStampEnd = (date: string) => {
  return (Date.parse(date) - 22 * 60 * 60 * 1000) / 1000;
}; */
// 输入时间戳计算当天0点的时间戳
export const date2zeroTimeStamp = (timeStamp: number) => {
  return timeStamp - ((timeStamp + 8 * 3600) % 86400);
};
export const timeStamp2date = (timeStamp: number) => {
  const date = new Date(timeStamp);
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D = date.getDate() + " ";
  const h =
    date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
  const m =
    date.getMinutes() < 10
      ? "0" + date.getMinutes() + ":"
      : date.getMinutes() + ":";
  const s =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
};
// 'Mon Oct 23 2017 17:20:13 GMT+0800 (中国标准时间)' 化零点时间;
export const standardTime2TimeStamp = (time: string) =>
  new Date(time).setHours(0, 0, 0, 0);
export const standardTime2TimeStampEnd = (time: string) =>
  new Date(time).setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1;
export const standardTime2date = (time: string) =>
  timeStamp2date(new Date(1000).getTime() * 1000);
