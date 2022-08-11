import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { useMemo } from "react";
import { Map } from "../../../../components/Map/Map";
import style from "./dataFlowMap.module.scss";
import { option1 } from "./config";
type IProps = {
  title: string;
  promptMessage: string;
  variation?: number;
  time?: string;
};
export const DataFlowMap = ({ title, promptMessage, variation }: IProps) => {
  const fontColor = useMemo(() => {
    let color: string = "";
    if (variation) {
      if (variation > 0) {
        color = "#00af56";
      } else {
        color = "#f85149";
      }
      return color;
    }
    return "#fff";
  }, [variation]);
  return (
    <div className={style.contain}>
      <div className={style.mainHeader}>
        <div className={style.leftBlock}>
          {title}{" "}
          <Tooltip title={promptMessage}>
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
        {variation ? (
          <div className={style.rightBlock} style={{ color: fontColor }}>
            {variation + "%"}{" "}
            {variation > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={style.subHeader}>
        <span>2022-08-08</span>
        {variation ? <span>较一周前</span> : ""}
      </div>
      <div className={style.map}>
        <Map option={option1}></Map>
      </div>
    </div>
  );
};
