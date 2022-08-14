/* 
页面性能 FCP FP LCP CLS FPS 首屏渲染 DOM渲染
*/
import { Map } from "../../Error/components/Map/Map";
import WhitePane from "../components/WhitePane/WhitePane";
import { timeSelect1 } from "../../Dashboard/config";

import { Table, Select } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { ClockCircleOutlined } from "@ant-design/icons";

import { useState } from "react";

import { metricsOption } from "./lineConfig";
import { pieOption } from "./pieConfig";
import style from "./Page.module.scss";
import { type } from "os";

const { Option } = Select;

export default function Page() {
  const [timeSelect, settimeSelect] = useState("1");

  const timeSelectChange = (value: string) => {
    console.log(`selected ${parseInt(value)}`);
    settimeSelect(value);
  };

  interface DataType {
    key: string;
    url: string;
    duration: number;
  }

  const dataSource: DataType[] = [
    {
      key: "1",
      url: "http://localhost:7777/performance/test",
      duration: 214
    },
    {
      key: "2",
      url: "http://localhost:7777/performance/test",
      duration: 214
    },
    {
      key: "3",
      url: "http://localhost:7777/performance/test",
      duration: 214
    },
    {
      key: "4",
      url: "http://localhost:7777/performance/tes2t",
      duration: 215
    },
    {
      key: "5",
      url: "http://localhost:7777/performance/test",
      duration: 214
    },
    {
      key: "6",
      url: "http://localhost:7777/performance/test",
      duration: 214
    }
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "地址url",
      dataIndex: "url",
      key: "url"
    },
    {
      title: "渲染耗时(ms)",
      dataIndex: "duration",
      key: "duration",
      sorter: (a, b) => Number(a.duration) - Number(b.duration)
    }
  ];
  const changeData = (record: any) => {
    alert("被选中了,根据你来渲染");
    console.log(record);
  };
  return (
    <div>
      <div className={style.pad10_0}>
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
      <WhitePane label="页面加载时间排行">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowSelection={{
            onSelect: changeData,
            type: "radio"
          }}
        ></Table>
        {/* 饼图 */}
        <Map
          option={pieOption}
          id="page-pie"
          wAh={{ width: "70vw", height: "500px" }}
        ></Map>
      </WhitePane>

      <WhitePane label="页面加载时间详情">
        <Map
          option={metricsOption}
          id="page-metrics"
          wAh={{ width: "80vw", height: "500px" }}
        ></Map>
      </WhitePane>
    </div>
  );
}
