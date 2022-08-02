import { IOptionType } from "./types";

export const timeSelect1: IOptionType[] = [
  {
    label: "近1小时",
    value: "1"
  },
  {
    label: "近12小时",
    value: "12"
  },
  {
    label: "近24小时",
    value: "24"
  },
  {
    label: "近3天",
    value: "72"
  },
  {
    label: "近一周",
    value: "168"
  },
  {
    label: "近15天",
    value: "360"
  }
];
export const timeSelect2: IOptionType[] = [
  {
    label: "30s",
    value: "30"
  },
  {
    label: "60s",
    value: "60"
  },
  {
    label: "120s",
    value: "120"
  }
];
export const urgentProblemOptions: IOptionType[] = [
  {
    label: "网络请求报错",
    value: "1"
  },
  {
    label: "部分资源下载异常",
    value: "2"
  },
  {
    label: "js错误异常",
    value: "3"
  },
  {
    label: "React框架运行异常",
    value: "4"
  },
  {
    label: "Vue框架运行异常",
    value: "5"
  }
];
export const importantProblemOptions: IOptionType[] = [
  {
    label: "页面卡顿",
    value: "1"
  },
  {
    label: "白屏异常",
    value: "2"
  }
];
export const promptMessageOptions: IOptionType[] = [
  {
    label: "提示信息",
    value: "1"
  }
];
