import { useEffect, useRef, useState } from "react";
import { Map } from "../../../../components/Map/Map";
import { PerformanceDisplay } from "../../components/PerformanceDisplay/PerformanceDisplay";
import { apiMapOption, pageLoadOption } from "../../config";
import style from "../../dashboard.module.scss";
import { IPerformanceDisplay } from "../../types";

export const PerformanceData = ({ endTime }: { endTime: number }) => {
  const [performanceData, setperformanceData] = useState<IPerformanceDisplay[]>(
    [
      {
        title: "TTFB平均时间",
        promptMessage: "发起请求到第一个字节到达的时间，涉及DNS,TCP等",
        content: "158.91ms"
      },
      {
        title: "Dom解析时间",
        promptMessage: "Dom解析完成的时间，反映出DOM的复杂度",
        content: "2.58s"
      },
      {
        title: "页面平均加载时间",
        promptMessage: "页面加载完成的总时间",
        content: "2.74s"
      },
      {
        title: "接口请求总量",
        promptMessage: "发起请求的总数量",
        content: "263"
      },
      {
        title: "接口请求平均耗时",
        promptMessage: "取24小时内的平均值",
        content: "214.15ms"
      },
      {
        title: "接口请求成功率",
        promptMessage: "请求成功数/总请求数",
        content: "100%"
      }
    ]
  );
  const query = useRef({
    startTime: endTime - 24 * 60 * 60 * 1000 + 1,
    endTime
  });
  useEffect(() => {
    query.current.endTime = endTime;
    query.current.startTime = endTime - 24 * 60 * 60 * 1000 + 1;
  }, [endTime]);
  return (
    <div className={style.block} style={{ height: "65vh" }}>
      <div className={style.blockHeader}>性能数据</div>
      <div
        className={style.blockCenter}
        style={{ justifyContent: "space-around" }}
      >
        {performanceData.map((item) => (
          <PerformanceDisplay {...item} key={item.title}></PerformanceDisplay>
        ))}
      </div>
      <div className={style.blockBottom}>
        <div className={style.blockBottomItem}>
          <div className={style.mapTitle}>页面加载时间</div>
          <Map option={pageLoadOption}></Map>
        </div>
        <div className={style.divided}></div>
        <div className={style.blockBottomItem}>
          <div className={style.mapTitle}>API成功耗时</div>
          <Map option={apiMapOption}></Map>
        </div>
      </div>
    </div>
  );
};
