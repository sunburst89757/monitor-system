import { random } from "../../../utils/generateRandomData";

export const generateDataOption = () => {
  let data1 = [];
  let data2 = [];
  let xAxisData = [];
  for (let i = 0; i < 12; i++) {
    xAxisData.push(i + 1 + "月");
    data1.push(random(50, 100));
    data2.push(random(10, 30));
  }
  return {
    xAxisData,
    data1,
    data2
  };
};
const { xAxisData, data1, data2 } = generateDataOption();
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
      data: data1
    },
    {
      name: "新用户",
      type: "bar",
      stack: "one",
      data: data2
    }
  ]
};
