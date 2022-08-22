export interface IOptionType {
  label: string;
  value: string;
}
export interface ICircleType {
  percent: number;
  content: string;
}
export interface IDataDisplay {
  title: string;
  content: number | string;
  rate: number;
}
export interface IPerformanceDisplay {
  title: string;
  promptMessage: string;
  content: any;
}
