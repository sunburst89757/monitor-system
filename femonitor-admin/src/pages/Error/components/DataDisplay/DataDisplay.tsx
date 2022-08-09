import style from "./DataDisplay.module.scss";
import { dataDisplayType } from "../types";
import { Map } from "../Map/Map";
import { useState, useEffect } from "react";
export default function DataDisplay({
  label,
  id,
  option,
  wAh
}: dataDisplayType) {
  const [errorTotal, setErrorTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    if (id === "js-error-precent-pie") {
      total = option.pvTotal;
      for (let item of option.series[0].data) {
        total -= item.value;
      }
      option.series[0].data.push({
        value: total,
        name: "correct"
      });
      total = option.errorPercent;
    } else if (id === "js-error-pie") {
      for (let item of option.series[0].data) {
        total += item.value;
      }
    } else if (id === "js-error-user-pie") {
      total = option.userNum;
    }
    setErrorTotal(total);
  }, [option, id]);

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
