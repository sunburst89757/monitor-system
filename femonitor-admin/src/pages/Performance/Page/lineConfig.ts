import * as echarts from "echarts";
import { getPerformanceList } from "../../../api/performance";

const data = [
  ["2000/06/05 00:00:00", 66],
  ["2000/06/05 01:00:00", 129],
  ["2000/06/05 02:20:43", 135],
  ["2000/06/05 03:00:00", 86],
  ["2000/06/05 04:00:00", 73],
  ["2000/06/05 05:00:00", 85],
  ["2000/06/05 06:30:00", 73],
  ["2000/06/05 07:00:00", 68],
  ["2000/06/05 08:00:00", 92],
  ["2000/06/05 09:00:00", 130],
  ["2000/06/05 10:00:00", 245]
];

const min_time = "2000/06/05 00:00:00";
const max_time = "2000/06/05 10:00:00";

export const metricsOption = {
  tooltip: {
    trigger: "axis"
  },
  legend: {
    data: ["FP", "FCP", "CLS", "LCP", "DOM全部加载", "首屏渲染"],
    selectedMode: "single"
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: "time",
    min: min_time,
    max: max_time
  },
  yAxis: {
    type: "value",
    axisLabel: {
      formatter: "{value} ms"
    }
  },
  series: [
    {
      name: "FP",
      type: "line",
      smooth: true,
      data: data
    },
    {
      name: "FCP",
      type: "line",
      stack: "Total",
      smooth: true,
      data: []
    },
    {
      name: "LCP",
      type: "line",
      stack: "Total",
      smooth: true,
      data: data
    },
    {
      name: "DOM全部加载",
      type: "line",
      stack: "Total",
      smooth: true,
      data: data
    }
  ]
};
