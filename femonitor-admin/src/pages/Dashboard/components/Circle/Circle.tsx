import { Progress } from "antd";
import { useMemo } from "react";
import { ICircleType } from "../../types";
import style from "./circle.module.scss";
export const Circle = ({ percent, content }: ICircleType) => {
  const circleColor = useMemo(() => {
    let color: string = "";
    if (percent > 50) {
      color = "#ff4d4f";
    } else if (percent > 20) {
      color = "#1890ff";
    } else {
      color = "#52c41a";
    }
    return color;
  }, [percent]);
  return (
    <div className={style.circleContainer}>
      <Progress
        width={80}
        type="circle"
        percent={percent}
        strokeColor={circleColor}
        format={(percent) => (
          <div style={{ fontSize: "25px", fontWeight: "bold" }}>{percent}%</div>
        )}
      ></Progress>
      <div style={{ marginTop: "10px" }}>{content}</div>
    </div>
  );
};
