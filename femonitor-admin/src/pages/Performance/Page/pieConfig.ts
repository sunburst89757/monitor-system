import * as echarts from "echarts";

type EChartsOption = echarts.EChartsOption;

export const pieOption: EChartsOption = {
  title: {
    left: "center",
    text: "首次渲染耗时排行"
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
      name: "Access From",
      type: "pie",
      radius: "50%",
      data: [
        { value: 1048, name: "<1秒" },
        { value: 735, name: "1-5秒" },
        { value: 580, name: "5-10秒" },
        { value: 484, name: "10-30秒" },
        { value: 300, name: ">30秒" }
      ],
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
