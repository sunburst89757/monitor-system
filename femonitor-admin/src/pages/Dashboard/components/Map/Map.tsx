import * as echarts from "echarts";
import { useEffect } from "react";
import style from "./map.module.scss";

export const Map = ({
  option,
  id,
  wAh
}: {
  option: any;
  id: string;
  wAh: {
    width: string;
    height: string;
  };
}) => {
  useEffect(() => {
    const myChart = echarts.init(document.getElementById(id)!);
    myChart.setOption(option);
  });
  return <div id={id} className={style.areaMap} style={wAh}></div>;
};
