import * as echarts from "echarts";
import { useEffect } from "react";
import style from "./areaMap.module.scss";

export const AreaMap = ({ option, id }: { option: any; id: string }) => {
  useEffect(() => {
    const myChart = echarts.init(document.getElementById(id)!);
    myChart.setOption(option);
  });
  return <div id={id} className={style.areaMap}></div>;
};
