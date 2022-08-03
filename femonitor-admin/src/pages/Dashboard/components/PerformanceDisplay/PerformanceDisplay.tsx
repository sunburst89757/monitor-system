import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { IPerformanceDisplay } from "../../types";
import style from "./PerformanceDisplay.module.scss";
export const PerformanceDisplay = ({
  title,
  content,
  promptMessage
}: IPerformanceDisplay) => {
  return (
    <div className={style.container1}>
      <div className={style.title}>
        {title}{" "}
        <Tooltip title={promptMessage}>
          <QuestionCircleOutlined />
        </Tooltip>
      </div>
      <div className={style.content}>{content}</div>
    </div>
  );
};
