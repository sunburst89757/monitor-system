// 操作系统 设备 ip 地域分布
import { Radio, RadioChangeEvent } from "antd";
import { useCallback, useState } from "react";
import { Map } from "../../Dashboard/components/Map/Map";
import { userTotalOption } from "./config";
import style from "./flowData.module.scss";
export default function FlowData() {
  const [timeSelect, settimeSelect] = useState("1");
  const changeTime = useCallback((e: RadioChangeEvent) => {
    console.log(e);
    settimeSelect(e.target.value);
  }, []);

  return (
    <div>
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
            id="userTotal"
            wAh={{ width: "80vw", height: "50vh" }}
            option={userTotalOption}
          ></Map>
        </div>
      </div>
    </div>
  );
}
