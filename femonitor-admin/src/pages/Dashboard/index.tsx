import { ClockCircleOutlined, UndoOutlined } from "@ant-design/icons";
import { Col, Row, Select } from "antd";
import { useCallback, useState } from "react";
import { timeSelect1, timeSelect2 } from "./config";
import style from "./dashboard.module.scss";
import { IOptionType } from "./types";
const { Option } = Select;
export default function Dashboard() {
  const [timeSelect, settimeSelect] = useState("1");
  const [queryTimeSelect, setqueryTimeSelect] = useState("30");
  const timeSelectChange = (value: string) => {
    console.log(`selected ${parseInt(value)}`);
    settimeSelect(value);
  };
  const querySelectChange = useCallback((value: string) => {
    console.log(`selected ${parseInt(value)}`);
    setqueryTimeSelect(value);
  }, []);
  return (
    <div>
      <div className={style.header}>
        <Select
          defaultValue="1"
          style={{ width: 120 }}
          onChange={timeSelectChange}
          value={timeSelect}
          suffixIcon={<ClockCircleOutlined />}
        >
          {timeSelect1.map((item) => (
            <Option value={item.value} key={item.label}>
              {item.label}
            </Option>
          ))}
        </Select>

        <Select
          defaultValue="30"
          style={{ width: 120 }}
          onChange={querySelectChange}
          value={queryTimeSelect}
          suffixIcon={<UndoOutlined />}
        >
          {timeSelect2.map((item) => (
            <Option value={item.value} key={item.label}>
              {item.label}
            </Option>
          ))}
        </Select>
      </div>
      <div className={style.content}>
        <div className={style.block}>
          <div className={style.blockHeader}>健康状态</div>
          <div className={style.blockContent}>
            <div className={style.healthyAll}></div>
            <div className={style.divided}></div>
            <div className={style.healthyDetail}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
//  https://developer.51cto.com/article/706002.html
