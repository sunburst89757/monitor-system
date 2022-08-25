import * as echarts from "echarts";
export const option1 = {
  legend: {
    data: ["今天", "一周前"]
  },
  tooltip: {
    trigger: "axis"
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value"
  },
  grid: {
    top: "20%",
    left: "10%",
    right: "10%",
    bottom: "4%",
    containLabel: true
  },
  series: [
    {
      name: "今天",
      type: "line",
      // stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(55, 162, 255)"
          },
          {
            offset: 1,
            color: "rgb(116, 21, 219)"
          }
        ])
      },
      emphasis: {
        focus: "series"
      },
      data: [320, 132, 201, 334, 190, 130, 220]
    },
    {
      name: "一周前",
      type: "line",
      // stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      label: {
        show: true,
        position: "top"
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(255, 191, 0)"
          },
          {
            offset: 1,
            color: "rgb(224, 62, 76)"
          }
        ])
      },
      emphasis: {
        focus: "series"
      },
      data: [220, 302, 181, 234, 210, 290, 150]
    }
  ]
};
