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
export const pvConfig = {
  // width: 500,
  // height: 100,
  title: {
    text: "PV/UV"
  },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    data: ["PV", "UV"]
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "00:00",
      "01:15",
      "02:30",
      "03:45",
      "05:00",
      "06:15",
      "07:30",
      "08:45",
      "10:00",
      "11:15",
      "12:30",
      "13:45",
      "15:00",
      "16:15",
      "17:30",
      "18:45",
      "20:00",
      "21:15",
      "22:30",
      "23:45"
    ]
  },
  yAxis: {
    type: "value",
    axisLabel: {
      formatter: "{value} 次"
    }
  },
  series: [
    {
      name: "PV",
      type: "line",
      stack: "Total",
      data: [
        300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500,
        600, 750, 800, 700, 600, 400
      ]
    },
    {
      name: "UV",
      type: "line",
      stack: "Total",
      data: [
        300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500,
        600, 750, 800, 700, 600, 400
      ]
    }
  ]
};
export const areaUvDataList = [
  { value: 1048, name: "武汉" },
  { value: 735, name: "广州" },
  { value: 580, name: "上海" },
  { value: 484, name: "深圳" },
  { value: 300, name: "北京" }
];
export const areaMapOption1 = {
  title: {
    text: "PV 前五地区",
    left: "center"
  },
  tooltip: {
    trigger: "item"
  },
  // legend: {
  //   orient: "vertical",
  //   left: "left"
  // },
  series: [
    {
      type: "pie",
      radius: "50%",
      data: areaUvDataList,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
};
export const areaMapOption2 = {
  title: {
    text: "UV 前五地区",
    left: "center"
  },
  tooltip: {
    trigger: "item"
  },
  // legend: {
  //   orient: "vertical",
  //   left: "left"
  // },
  series: [
    {
      type: "pie",
      radius: "50%",
      data: areaUvDataList,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
};
