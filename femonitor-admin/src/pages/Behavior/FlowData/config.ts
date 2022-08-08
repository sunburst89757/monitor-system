let data1 = [];
let data2 = [];
let xAxisData = [];
for (let i = 0; i < 10; i++) {
  xAxisData.push("Class" + i);
  data1.push(+(Math.random() * 2).toFixed(2));
  data2.push(+(Math.random() * 5).toFixed(2));
  // data3.push(+(Math.random() + 0.3).toFixed(2));
  // data4.push(+Math.random().toFixed(2));
}
var emphasisStyle = {
  itemStyle: {
    shadowBlur: 10,
    shadowColor: "rgba(0,0,0,0.3)"
  }
};
export const userTotalOption = {
  legend: {
    data: ["老用户", "新用户"],
    left: "10%"
  },
  brush: {
    toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
    xAxisIndex: 0
  },
  toolbox: {
    show: false,
    feature: {
      magicType: {
        type: ["bar"]
      },
      dataView: {}
    }
  },
  tooltip: {
    trigger: "item"
  },
  xAxis: {
    data: xAxisData,
    // name: 'X Axis',
    axisLine: { onZero: true },
    splitLine: { show: false },
    splitArea: { show: false }
  },
  yAxis: {},
  grid: {
    bottom: 100
  },
  series: [
    {
      name: "老用户",
      type: "bar",
      stack: "one",
      emphasis: emphasisStyle,
      data: data1
    },
    {
      name: "新用户",
      type: "bar",
      stack: "one",
      emphasis: emphasisStyle,
      data: data2
    }
  ]
};
