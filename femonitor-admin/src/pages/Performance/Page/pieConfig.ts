import * as echarts from "echarts";

// type EChartsOption = echarts.EChartsOption;

export const pieOption = {
  title: {
    left: "center",
    text: "首次渲染耗时近10次分布"
  },
  tooltip: {
    trigger: "item"
  },
  legend: {
    orient: "vertical",
    left: "left"
  },
  series: [
    {
      name: "首屏时间",
      type: "pie",
      radius: "50%",
      data: [
        { value: 0, name: "<1秒" },
        { value: 0, name: "1-5秒" },
        { value: 0, name: "5-10秒" },
        { value: 0, name: "10-30秒" }
      ]
    }
  ]
};
