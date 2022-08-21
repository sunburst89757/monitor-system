import * as echarts from "echarts";
export const errorTimeMap = {
  color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
  title: {
    text: "请求错误趋势图"
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    }
  },
  legend: {
    data: ["xhr", "fetch"]
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
  ],
  yAxis: [
    {
      type: "value"
    }
  ],
  series: [
    {
      name: "xhr",
      type: "line",
      stack: "Total",
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
            color: "rgb(128, 255, 165)"
          },
          {
            offset: 1,
            color: "rgb(1, 191, 236)"
          }
        ])
      },
      emphasis: {
        focus: "series"
      },
      data: [0, 12, 12, 12, 12, 1, 16]
    },
    {
      name: "fetch",
      type: "line",
      stack: "Total",
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
            color: "rgb(0, 221, 255)"
          },
          {
            offset: 1,
            color: "rgb(77, 119, 255)"
          }
        ])
      },
      emphasis: {
        focus: "series"
      },
      data: [30, 26, 12, 9, 18, 16, 10]
    }
  ]
};
