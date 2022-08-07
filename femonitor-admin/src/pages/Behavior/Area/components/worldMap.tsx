import * as echarts from "echarts";
import { useEffect } from "react";
import china from "./china.json";
import { mapOptions } from "./config";
export const WorldMap = ({ id }: { id: string }) => {
  useEffect(() => {
    const myChart = echarts.init(document.getElementById(id)!);
    echarts.registerMap("china", china as any);
    myChart.setOption(mapOptions);
  });

  return <div id={id} style={{ width: "55vw", height: "65vh" }}></div>;
};
