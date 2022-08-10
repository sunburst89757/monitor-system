import * as echarts from "echarts";
export const errorTimeMap = {
  color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
  title: {
    text: "资源加载错误趋势图"
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
    data: ["JS", "CSS", "JPG", "PNG"]
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
      name: "JS",
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
      name: "CSS",
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
    },
    {
      name: "PNG",
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
      data: [1, 5, 14, 19, 10, 9, 10]
    },
    {
      name: "JPG",
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
            color: "rgb(255, 0, 135)"
          },
          {
            offset: 1,
            color: "rgb(135, 0, 157)"
          }
        ])
      },
      emphasis: {
        focus: "series"
      },
      data: [10, 45, 12, 9, 14, 9, 16]
    }
  ]
};
