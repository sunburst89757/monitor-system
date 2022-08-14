// import { useState } from "react";
// import { ICircleType } from "./types";

// import { Circle } from "./components/Circle/Circle";
import style from "./Network.module.scss";

import { ClockCircleOutlined } from "@ant-design/icons";
import { Table, Select } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

import { timeSelect1 } from "../../Dashboard/config";
import { Circle } from "../../Dashboard/components/Circle/Circle";
import { ICircleType } from "../../Dashboard/types";

import WhitePane from "../components/WhitePane/WhitePane";
import SmallPane from "../components/SmallPane/SmallPane";

import { useState } from "react";
const { Option } = Select;
// 网络性能 xhr fetch两种请求的耗时
export default function Network() {
  const nowTime = new Date().toLocaleDateString();

  const [timeSelect, settimeSelect] = useState("1");

  const timeSelectChange = (value: string) => {
    console.log(`selected ${parseInt(value)}`);
    settimeSelect(value);
  };

  const [circle, setcircle] = useState<ICircleType[]>([
    {
      content: "接口请求成功率",
      percent: 88
    }
  ]);

  interface DataType {
    key: string;
    url: string;
    duration: number;
    startTime: string;
    endTime: string;
    method: string;
    success: boolean;
  }

  const dataSource: DataType[] = [
    {
      key: "1",
      url: "http://localhost:7777/performance/test",
      duration: 214,
      startTime: "2022/08/01 07:34:54.000",
      endTime: "2022/08/01 07:34:54.214",
      method: "GET",
      success: true
    },
    {
      key: "2",
      url: "http://localhost:7777/performance/test",
      duration: 214,
      startTime: "2022/08/01 07:34:54.001",
      endTime: "2022/08/01 07:34:54.214",
      method: "POST",
      success: true
    },
    {
      key: "3",
      url: "http://localhost:7777/performance/test",
      duration: 214,
      startTime: "2022/08/01 07:34:54.002",
      endTime: "2022/08/01 07:34:54.214",
      method: "POST",
      success: true
    },
    {
      key: "4",
      url: "http://localhost:7777/performance/test",
      duration: 215,
      startTime: "2022/08/01 07:34:54.000",
      endTime: "2022/08/01 07:34:54.214",
      method: "GET",
      success: true
    },
    {
      key: "5",
      url: "http://localhost:7777/performance/test",
      duration: 214,
      startTime: "2022/08/01 07:34:54.000",
      endTime: "2022/08/01 07:34:54.214",
      method: "GET",
      success: true
    },
    {
      key: "6",
      url: "http://localhost:7777/performance/test",
      duration: 214,
      startTime: "2022/08/01 07:34:54.000",
      endTime: "2022/08/01 07:34:54.214",
      method: "GET",
      success: true
    }
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "地址url",
      dataIndex: "url",
      key: "url"
    },
    {
      title: "请求耗时(ms)",
      dataIndex: "duration",
      key: "duration",
      sorter: (a, b) => Number(a.duration) - Number(b.duration)
    },
    {
      title: "起始时间",
      dataIndex: "startTime",
      key: "startTime"
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
      key: "endTime"
    },
    {
      title: "请求方式",
      dataIndex: "method",
      key: "method",
      filters: [
        {
          text: <span>GET</span>,
          value: "GET"
        },
        {
          text: <span>POST</span>,
          value: "POST"
        }
      ],
      // onFilter: (value: string | number | boolean, record) =>
      //   record.method.startsWith(value as string),这有什么用
      filterSearch: false
    },
    {
      title: "是否成功",
      dataIndex: "success",
      key: "success",
      render: (isSuccess: boolean) => (isSuccess ? "成功" : "失败")
    }
  ];
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
      <WhitePane label="xhr请求信息">
        <div className={`${style.healthyDetail} ${style.pad10_0}`}>
          {circle.map((item) => (
            <Circle
              percent={item.percent}
              content={item.content}
              key={item.content}
            ></Circle>
          ))}
          <SmallPane value="263" title="接口请求总量"></SmallPane>
          <SmallPane value="132.21ms" title="接口请求平均耗时"></SmallPane>
        </div>

        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </WhitePane>
      <WhitePane label="fetch请求信息">
        <div className={`${style.flex} ${style.pad15_0}`}>
          <SmallPane value="88%" title="接口请求成功率"></SmallPane>
          <SmallPane value="263" title="接口请求总量"></SmallPane>
          <SmallPane value="132.21ms" title="接口请求平均耗时"></SmallPane>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </WhitePane>
    </div>
  );
}
