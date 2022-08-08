import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import style from "./map.module.scss";

export const Map = ({
  option,
  wAh
}: {
  option: any;
  wAh: {
    width: string;
    height: string;
  };
}) => {
  const ref = useRef<HTMLDivElement>(null);
  let mapInstance: any = null;
  const renderMap = () => {
    const renderedMapInstance = echarts.getInstanceByDom(ref.current!);
    if (renderedMapInstance) {
      mapInstance = renderedMapInstance;
    } else {
      mapInstance = echarts.init(ref.current!);
    }
    mapInstance?.setOption(option);
  };
  useEffect(() => {
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
  return <div className={style.areaMap} style={wAh} ref={ref!}></div>;
};
