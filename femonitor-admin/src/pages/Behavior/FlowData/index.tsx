// 操作系统 设备 ip 地域分布
import { Radio, RadioChangeEvent } from "antd";
import { useCallback, useState } from "react";
import { Map } from "../../../components/Map/Map";
import { DataFlowMap } from "./componts/DataFlowMap";
import { userTotalOption } from "./config";
import style from "./flowData.module.scss";
export default function FlowData() {
  const [timeSelect, settimeSelect] = useState("1");
  const changeTime = useCallback((e: RadioChangeEvent) => {
    console.log(e);
    settimeSelect(e.target.value);
  }, []);

  return (
    <div className={style.contain}>
      <div className={style.block}>
        <div className={style.header}>
          <span style={{ marginRight: "20px" }}>用户量统计</span>
          <Radio.Group
            value={timeSelect}
            onChange={changeTime}
            buttonStyle="solid"
          >
            <Radio.Button value="1">30天</Radio.Button>
            <Radio.Button value="2">90天</Radio.Button>
            <Radio.Button value="3">半年</Radio.Button>
            <Radio.Button value="4">一年</Radio.Button>
          </Radio.Group>
        </div>
        <div className={style.content}>
          <Map
            // wAh={{ width: "80vw", height: "50vh" }}
            option={userTotalOption}
          ></Map>
        </div>
      </div>
      <div className={style.secondBlock}>
        <div className={style.item}>
          <DataFlowMap
            title="页面访问量趋势"
            promptMessage="1. 用户访问一次页面，增加一个PV数据。 2. 数量代表展示时段的总和，仅供参考，实际数据请看「今日流量」"
            variation={-0.93}
          ></DataFlowMap>
        </div>
        <div className={style.item}>
          <DataFlowMap
            title="用户活跃量趋势"
            promptMessage="这是用户每小时的活跃量数据，这里主要表现变化趋势，并非UV数据，UV数据请看上边。"
            variation={1.98}
          ></DataFlowMap>
        </div>
        <div className={style.item}>
          <DataFlowMap
            title="新用户活跃量趋势"
            promptMessage="1. 用户清理了缓存数据，下次进来程序也会认为是新访客。2. 数量代表展示时段的总和，仅供参考，实际数据请看「今日流量」"
            variation={-0.02}
          ></DataFlowMap>
        </div>
      </div>
      <div className={style.secondBlock}>
        <div className={style.item}>
          <DataFlowMap
            title="跳出率趋势"
            promptMessage="只访问了入口页面就离开的用户比例。"
            variation={0.18}
          ></DataFlowMap>
        </div>
        <div className={style.item}>
          <DataFlowMap
            title="用户在线平均时长"
            promptMessage="用户在应用上停留时长的平均值，总时长/总人数。"
            variation={5}
          ></DataFlowMap>
        </div>
        <div className={style.item}>
          <DataFlowMap
            title="新用户次日留存率"
            promptMessage="用户在应用上停留时长的平均值，总时长/总人数。"
          ></DataFlowMap>
        </div>
      </div>
    </div>
  );
}
