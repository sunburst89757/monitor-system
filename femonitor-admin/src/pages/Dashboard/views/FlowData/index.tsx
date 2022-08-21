import { useEffect, useRef, useState } from "react";
import { Map } from "../../../../components/Map/Map";
import { DataDisplay } from "../../components/DataDisplay/DataDisplay";
import { areaMapOption1, areaMapOption2, pvConfig } from "../../config";
import style from "../../dashboard.module.scss";
import { IDataDisplay } from "../../types";
export const FlowData = ({ endTime }: { endTime: number }) => {
  const [dataFlows, setdataFlows] = useState<IDataDisplay[]>([
    {
      title: "浏览量(PV)",
      content: 2109832,
      rate: 16.57
    },
    {
      title: "访客数(UV)",
      content: 657891,
      rate: 4.78
    },
    {
      title: "新访客",
      content: 129871,
      rate: 18.2
    },
    {
      title: "IP数",
      content: 657591,
      rate: 0.04
    },
    {
      title: "频次(人均)",
      content: 3.21,
      rate: 11.46
    },
    {
      title: "跳出率",
      content: "59.05%",
      rate: -24.18
    }
  ]);
  const query = useRef({
    startTime: endTime - 24 * 60 * 60 * 1000 + 1,
    endTime
  });
  useEffect(() => {
    query.current.endTime = endTime;
    query.current.startTime = endTime - 24 * 60 * 60 * 1000 + 1;
  }, [endTime]);
  return (
    <div className={style.block} style={{ height: "80vh" }}>
      <div className={style.blockHeader}>流量数据</div>
      <div
        className={style.blockCenter}
        style={{ justifyContent: "space-around" }}
      >
        {dataFlows.map((item) => (
          <DataDisplay {...item} key={item.content}></DataDisplay>
        ))}
      </div>
      <div className={style.blockBottom} style={{ flex: "3" }}>
        <div className={style.blockBottomItem} id="mapBox">
          <Map option={pvConfig}></Map>
        </div>
        <div className={style.divided}></div>
        <div className={style.blockBottomItem} id="areaBox">
          <Map option={areaMapOption1}></Map>
          <Map option={areaMapOption2}></Map>
        </div>
      </div>
    </div>
  );
};
