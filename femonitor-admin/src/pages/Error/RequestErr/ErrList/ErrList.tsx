import { errListType } from "../../components/types";
import { Select } from "antd";
import React, { useState } from "react";
import style from "./ErrList.module.scss";
import { ClockCircleOutlined } from "@ant-design/icons";
import { timeSelect1 } from "../../../Dashboard/config";
import QuietViewErr from "../../components/quietViewErr/quietViewErr";

const { Option } = Select;

interface DataMap {
  [key: string]: string;
}

export default function ErrList({ errortype = "xhr" }: errListType) {
  const [timeSelect, settimeSelect] = useState("1");

  const dataMap: DataMap = {
    xhr: "请求错误",
    fetch: "请求错误"
  };

  const timeSelectChange = (value: string) => {
    console.log(`selected ${parseInt(value)}`);
    settimeSelect(value);
  };
  return (
    <div>
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
      <div>
        <QuietViewErr
          label={dataMap[errortype]}
          value={errortype}
          showPage={true}
          pageSize={10}
          timeSelect={timeSelect}
        ></QuietViewErr>
      </div>
    </div>
  );
}
