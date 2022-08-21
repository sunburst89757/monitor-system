import style from "./Network.module.scss";

import { ClockCircleOutlined } from "@ant-design/icons";
import { Table, Select } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

import { timeSelect1 } from "../../Dashboard/config";
import { Circle } from "../../Dashboard/components/Circle/Circle";
import { ICircleType } from "../../Dashboard/types";

import WhitePane from "../components/WhitePane/WhitePane";
import SmallPane from "../components/SmallPane/SmallPane";

import { getPerformanceList, getXHR } from "../../../api/performance";
import { useState, useEffect } from "react";
const { Option } = Select;
// 网络性能 xhr fetch两种请求的耗时
export default function Network() {
  const [timeSelect, settimeSelect] = useState("1");

  // 时间下拉框
  const timeSelectChange = (value: string) => {
    settimeSelect(value);
  };

  const [XhrPageNum, setXhrPageNum] = useState(1);
  const xhrPageChange = (page: number) => {
    setXhrPageNum(page);
  };
  const [FetchPageNum, setFetchPageNum] = useState(1);
  const fetchPageChange = (page: number) => {
    setFetchPageNum(page);
  };

  const [xhrTotal, setxhrTotal] = useState(0);
  const [fetchTotal, setfetchTotal] = useState(0);

  const [xhrAvgTime, setXhrAvgTime] = useState("0ms");
  const [xhr_success_percent, setxhr_success_percent] = useState("0%");

  const [endTime, setEndTime] = useState(Date.now());

  const [startTime, setStartTime] = useState(endTime);

  const [xhrSource, setxhrSource] = useState<DataType[]>([
    {
      key: "",
      url: "",
      duration: 0,
      startTime: "",
      endTime: "",
      method: "",
      success: false
    }
  ]);
  const [fetchSource, setFetchSource] = useState<DataType[]>([
    {
      key: "",
      url: "",
      duration: 0,
      startTime: "",
      endTime: "",
      method: "",
      success: false
    }
  ]);
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
      key: "method"
      // filters: [
      //   {
      //     text: <span>GET</span>,
      //     value: "GET"
      //   },
      //   {
      //     text: <span>POST</span>,
      //     value: "POST"
      //   }
      // ],
      // // onFilter: (value: string | number | boolean, record) =>
      // //   record.method.startsWith(value as string),这有什么用
      // filterSearch: false
    },
    {
      title: "是否成功",
      dataIndex: "success",
      key: "success",
      render: (isSuccess: boolean) => (isSuccess ? "成功" : "失败")
    }
  ];

  useEffect(() => {
    let timeStamp = parseInt(timeSelect) * 60 * 60 * 1000;
    let startime = endTime - timeStamp;
    setStartTime(startime);
    setXhrPageNum(1);
    setFetchPageNum(1);
  }, [timeSelect]);

  // 获取xhr数据信息
  useEffect(() => {
    let handlerFunction = getPerformanceList;
    handlerFunction({
      startTime: startTime,
      endTime: endTime,
      pageSize: 5,
      pageNum: XhrPageNum,
      type: "xhr"
    }).then((res) => {
      setxhrTotal(res.data.total);
      let data: any[] = res.data.data;
      let newData: DataType[] = [];
      data.forEach((item, index) => {
        const { url, duration, startTime, endTime, method, success } = item;
        const obj: DataType = {
          key: index.toString(),
          url: url,
          duration: duration,
          startTime: startTime,
          endTime: endTime,
          method: method,
          success: success
        };
        newData.push(obj);
      });
      setxhrSource(newData);
    });

    getXHR({
      startTime: startTime,
      endTime: endTime
    }).then((res) => {
      const success_percent = (res.data.xhrSuccess / res.data.xhrCount) * 100;
      if (isNaN(success_percent)) {
        setxhr_success_percent("0%");
      } else {
        setxhr_success_percent(success_percent.toFixed(1) + "%");
      }
      // console.log(res.data.xhrAverageDuration);
      setXhrAvgTime(res.data.xhrAverageDuration.toFixed(2) + "ms");
    });
  }, [startTime, endTime, XhrPageNum]);

  // 获取fetch数据信息
  useEffect(() => {
    let handlerFunction = getPerformanceList;
    handlerFunction({
      startTime: startTime,
      endTime: endTime,
      pageSize: 5,
      pageNum: FetchPageNum,
      type: "fetch"
    }).then((res) => {
      setfetchTotal(res.data.total);
      let data: any[] = res.data.data;
      let newData: DataType[] = [];
      data.forEach((item, index) => {
        const { url, duration, startTime, endTime, method, success } = item;
        const obj: DataType = {
          key: index.toString(),
          url: url,
          duration: duration,
          startTime: startTime,
          endTime: endTime,
          method: method,
          success: success
        };
        newData.push(obj);
      });
      setFetchSource(newData);
    });
  }, [startTime, endTime, FetchPageNum]);

  interface DataType {
    key: string;
    url: string;
    duration: number;
    startTime: string;
    endTime: string;
    method: string;
    success: boolean;
  }

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
          <SmallPane
            value={xhr_success_percent}
            title="接口请求成功率"
          ></SmallPane>
          <SmallPane value={xhrTotal} title="接口请求总量"></SmallPane>
          <SmallPane value={xhrAvgTime} title="接口请求平均耗时"></SmallPane>
        </div>
        <Table
          dataSource={xhrSource}
          columns={columns}
          pagination={{ pageSize: 5, total: xhrTotal, onChange: xhrPageChange }}
        />
      </WhitePane>

      <WhitePane label="fetch请求信息">
        <div className={`${style.flex} ${style.pad15_0}`}>
          <SmallPane value="88%" title="接口请求成功率"></SmallPane>
          <SmallPane value={fetchTotal} title="接口请求总量"></SmallPane>
          <SmallPane value="132.21ms" title="接口请求平均耗时"></SmallPane>
        </div>
        <Table
          dataSource={fetchSource}
          columns={columns}
          pagination={{
            pageSize: 5,
            total: fetchTotal,
            onChange: fetchPageChange
          }}
        />
      </WhitePane>
    </div>
  );
}
