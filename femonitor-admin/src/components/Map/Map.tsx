import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import _ from "lodash";
import style from "./map.module.scss";

export function Map<T extends Record<string, any>[]>({
  option,
  dataSource
}: {
  option: Record<string, any>;
  dataSource?: T;
}) {
  const ref = useRef<HTMLDivElement>(null);
  let mapInstance: any = null;
  const renderMap = () => {
    const renderedMapInstance = echarts.getInstanceByDom(ref.current!);
    if (renderedMapInstance) {
      mapInstance = renderedMapInstance;
    } else {
      mapInstance = echarts.init(ref.current!);
    }
    // debugger;
    const mapOption = _.cloneDeep(option);
    Object.defineProperty(mapOption, "dataset", {
      value: { source: dataSource },
      writable: true,
      enumerable: true,
      configurable: true
    });
    mapInstance?.setOption(mapOption);
  };
  useEffect(() => {
    renderMap();
  }, [dataSource]);
  useEffect(() => {
    window.onresize = function () {
      mapInstance.resize();
    };
    return () => {
      mapInstance && mapInstance.dispose();
    };
  }, []);
  return (
    <div
      className={style.areaMap}
      style={{ width: "100%", height: "100%" }}
      ref={ref!}
    ></div>
  );
}
