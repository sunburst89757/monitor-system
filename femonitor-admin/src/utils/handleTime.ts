//  2022-08-11 --> 2022-08-11 8点的时间戳
// 相对于8点
// 给定日期的0点
export const date2timeStampZero = (date: string) => {
  return (Date.parse(date) - 8 * 60 * 60 * 1000) / 1000;
};
// 给定日期的24点
export const date2timeStampEnd = (date: string) => {
  return (Date.parse(date) - 22 * 60 * 60 * 1000) / 1000;
};
