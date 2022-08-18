import style from "./DataDisplay.module.scss";
import { dataDisplayType } from "../types";
import { Map } from "../Map/Map";
import { useState, useEffect } from "react";
interface DataMap {
  [key: string]: number;
}

export default function DataDisplay({
  label,
  id,
  option,
  wAh
}: dataDisplayType) {
  const [errorTotal, setErrorTotal] = useState(0);
  const dataMap: DataMap = {
    "resource-error-precent-pie": 1,
    "js-error-precent-pie": 1,
    "resource-error-pie": 2,
    "js-error-pie": 2,
    "resource-error-user-pie": 3,
    "js-error-user-pie": 3
  };
  useEffect(() => {
    let total = 0;
    if (dataMap[id] === 1) {
      total = option.pvTotal;
      console.log("option123", option);
      for (let item of option.series[0].data) {
        total -= item.value;
      }
      option.series[0].data.push({
        value: total,
        name: "correct"
      });
      total = option.errorPercent;
    } else if (dataMap[id] === 2) {
      for (let item of option.series[0].data) {
        total += item.value;
      }
    } else if (dataMap[id] === 3) {
      total = option.userNum;
    }
    console.log("total", total);
    setErrorTotal(total);
  }, [option, id, dataMap]);

  return (
    <div className={style.box}>
      <div className={style.label}>{label}</div>
      <div className={style.value}>{errorTotal}</div>
      <div className={style.mapBox}>
        <Map id={id} option={option} wAh={wAh}></Map>
      </div>
    </div>
  );
}
