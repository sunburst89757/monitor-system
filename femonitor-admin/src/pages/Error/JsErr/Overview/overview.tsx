import style from "./overview.module.scss";
import React, { useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { timeSelect1 } from "../../../Dashboard/config";
import DataDisplay from "../components/DataDisplay/DataDisplay";
import { dataDisplayType, errListType } from "../types";
import { useSetState } from "ahooks";
import QuietViewErr from "../components/quietViewErr/quietViewErr";
const { Option } = Select;

export default function Overview() {
  const [timeSelect, settimeSelect] = useState("1");

  const timeSelectChange = (value: string) => {
    console.log(`selected ${parseInt(value)}`);
    settimeSelect(value);
  };

  const [dataFlow, setDataFlow] = useSetState<dataDisplayType[]>([
    {
      label: "错误数",
      value: "1"
    },
    {
      label: "JS错误率",
      value: "4.17%"
    },
    {
      label: "影响用户数",
      value: "1"
    }
  ]);

  return (
    <>
      <div className={style.titleTime}>
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
      </div>
      <div className={style.totalBox}>
        {dataFlow.map((item) => (
          <DataDisplay
            label={item.label}
            value={item.value}
            key={item.label}
          ></DataDisplay>
        ))}
      </div>
      <QuietViewErr label="JS错误" value="onerror"></QuietViewErr>
      <QuietViewErr label="自定义异常" value="console.error"></QuietViewErr>
      <QuietViewErr label="promise错误" value="promiseError"></QuietViewErr>
    </>
  );
}
