//  页面平均加载时间
export const timeOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  grid: {
    top: "5%",
    left: "2%",
    right: "2%",
    bottom: "4%",
    containLabel: true
  },
  xAxis: {
    // 隐藏x轴刻度
    show: false
  },
  yAxis: {
    type: "category",
    splitLine: { show: false },
    data: ["/page/1", "/page/2", "/page", "/page"],
    axisTick: {
      //y轴刻度线
      show: false
    },
    axisLine: {
      //y轴
      show: false
    },
    axisLabel: {
      fontSize: 12
    }
  },
  series: [
    {
      name: "加载时间",
      type: "bar",
      stack: "total",
      label: {
        show: true,
        position: "right",
        // 加单位
        formatter: `{c}s`
      },
      emphasis: {
        focus: "series"
      },
      color: "#ff8639",
      data: [1.0, 0.5, 1.1, 0.6]
    }
  ]
};
// 接口耗时区间分布
export const timeOption1 = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  grid: {
    top: "5%",
    left: "2%",
    right: "2%",
    bottom: "4%",
    containLabel: true
  },
  xAxis: {
    // 隐藏x轴刻度
    show: false
  },
  yAxis: {
    type: "category",
    splitLine: { show: false },
    data: ["小于1s", "1s-5s", "5s-10s", "10s-30s", "大于30s"],
    axisTick: {
      //y轴刻度线
      show: false
    },
    axisLine: {
      //y轴
      show: false
    },
    axisLabel: {
      fontSize: 12
    }
  },
  series: [
    {
      name: "加载时间",
      type: "bar",
      stack: "total",
      label: {
        show: true,
        position: "right",
        // 加单位
        formatter: `{c}次`
      },
      emphasis: {
        focus: "series"
      },
      color: "#59aefc",
      data: [220, 10, 0, 0, 0]
    }
  ]
};
