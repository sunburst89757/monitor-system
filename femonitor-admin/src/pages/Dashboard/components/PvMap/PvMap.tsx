import * as echarts from "echarts";
import style from "./pvMap.module.scss";
import { useEffect } from "react";

export const PvMap = ({ option }: { option: any }) => {
  useEffect(() => {
    const myChart = echarts.init(document.getElementById("pvMap")!);
    myChart.setOption(option);
  });
  return <div id="pvMap" className={style.pvMap}></div>;
};
