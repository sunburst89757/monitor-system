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
      data: [99, 82, 101, 182, 180, 133, 120],
      type: "line",
      areaStyle: {}
    },
    {
      name: "一周前",
      data: [82, 92, 91, 94, 120, 130, 120],
      type: "line",
      areaStyle: {}
    }
  ]
};
