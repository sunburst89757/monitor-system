import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import china from "./china.json";
import { mapOptions } from "./config";
export const WorldMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  let mapInstance: any = null;
  const renderMap = () => {
    const renderedMapInstance = echarts.getInstanceByDom(ref.current!);
    if (renderedMapInstance) {
      mapInstance = renderedMapInstance;
    } else {
      mapInstance = echarts.init(ref.current!);
    }
    mapInstance.setOption(mapOptions);
  };
  useEffect(() => {
    echarts.registerMap("china", china as any);
    renderMap();
  }, []);
  useEffect(() => {
    window.onresize = function () {
      mapInstance.resize();
    };
    return () => {
      mapInstance && mapInstance.dispose();
    };
  }, []);

  return <div style={{ width: "55vw", height: "65vh" }} ref={ref!}></div>;
};
