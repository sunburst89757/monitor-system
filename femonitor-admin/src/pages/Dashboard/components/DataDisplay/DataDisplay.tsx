import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { IDataDisplay } from "../../types";
import style from "./dataDidsplay.module.scss";
export const DataDisplay = ({ title, content, rate }: IDataDisplay) => {
  const color = useMemo(() => {
    if (rate > 0) {
      return "green";
    }
    return "red";
  }, [rate]);
  return (
    <div className={style.container1}>
      <div className={style.title}>{title}</div>
      <div className={style.content}>{content}</div>
      <div className={style.rate}>
        较昨日{" "}
        <span style={{ color: color }}>
          {rate}
          {rate > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        </span>
      </div>
    </div>
  );
};
