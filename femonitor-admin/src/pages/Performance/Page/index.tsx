/* 
页面性能 FCP FP LCP CLS FPS 首屏渲染 DOM渲染
*/
import { Map } from "../../Error/components/Map/Map";
import WhitePane from "../components/WhitePane/WhitePane";
import { timeSelect1 } from "../../Dashboard/config";

import { Table, Select, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { ClockCircleOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";

import { metricsOption } from "./lineConfig";
import { pieOption } from "./pieConfig";
import style from "./Page.module.scss";

import { getPerformanceList } from "../../../api/performance";

const { Option } = Select;

export default function Page() {
  const [timeSelect, settimeSelect] = useState("1");

  const timeSelectChange = (value: string) => {
    settimeSelect(value);
  };
  const [endTime, setEndTime] = useState(Date.now());

  const [startTime, setStartTime] = useState(endTime);

  interface DataType {
    key: string;
    url: string;
    duration: number;
  }

  interface clsType {
    key: string;
    url: string;
    value: number;
  }

  const [routerSource, setRouterSource] = useState<DataType[]>([
    { key: "", url: "", duration: 0 }
  ]);

  const [clsSource, setclsSource] = useState<clsType[]>([
    { key: "", url: "", value: 0 }
  ]);

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

  const clsColumns: ColumnsType<clsType> = [
    {
      title: "地址url",
      dataIndex: "url",
      key: "url"
    },
    {
      title: "得分",
      dataIndex: "value",
      key: "value",
      render: (value: number) => {
        if (value < 0.1) {
          return <Tag color="success">良好</Tag>;
        } else if (value < 0.25) {
          return <Tag color="warning">需改进</Tag>;
        } else {
          return <Tag color="error">差</Tag>;
        }
      }
    }
  ];

  const [routerPageNum, setrouterPageNum] = useState(1);
  const routerPageChange = (page: number) => {
    setrouterPageNum(page);
  };

  const [clsPageNum, setclsPageNum] = useState(1);
  const clsPageChange = (page: number) => {
    setclsPageNum(page);
  };

  const [routerTotal, setRouterTotal] = useState(0);
  const [clsTotal, setclsTotal] = useState(0);

  const timeFormat = (UTCTime: string) => {
    const t = new Date(UTCTime).toLocaleString();
    return t;
  };
  // 时间下拉框触发
  useEffect(() => {
    let timeStamp = parseInt(timeSelect) * 60 * 60 * 1000;
    let startime = endTime - timeStamp;
    setStartTime(startime);
    setrouterPageNum(1);
  }, [timeSelect]);

  // 获取router页面数据信息
  useEffect(() => {
    let handlerFunction = getPerformanceList;
    handlerFunction({
      startTime: startTime,
      endTime: endTime,
      pageSize: 5,
      pageNum: routerPageNum,
      type: "vue-router-change-paint"
    }).then((res) => {
      setRouterTotal(res.data.total);
      let data: any[] = res.data.data;
      let newData: DataType[] = [];
      data.forEach((item, index) => {
        const { pageURL, duration } = item;
        const obj: DataType = {
          key: index.toString(),
          url: pageURL,
          duration: duration.toFixed(2)
        };
        newData.push(obj);
      });
      setRouterSource(newData);
    });
  }, [startTime, endTime, routerPageNum]);

  // 获取CLS
  useEffect(() => {
    let handlerFunction = getPerformanceList;
    handlerFunction({
      startTime: startTime,
      endTime: endTime,
      pageSize: 5,
      pageNum: clsPageNum,
      type: "layout-shift"
    }).then((res) => {
      console.log(res);
      setclsTotal(res.data.total);
      let data: any[] = res.data.data;
      let newData: clsType[] = [];
      data.forEach((item, index) => {
        const { pageURL, value } = item;
        const obj: clsType = {
          key: index.toString(),
          url: pageURL,
          value: value
        };
        newData.push(obj);
      });
      setclsSource(newData);
    });
  }, [startTime, endTime, clsPageNum]);

  // 获取Fp数据信息
  useEffect(() => {
    metricsOption.xAxis.min = new Date(startTime).toLocaleString();
    metricsOption.xAxis.max = new Date(endTime).toLocaleString();
    // 获取FP
    getPerformanceList({
      startTime: startTime,
      endTime: endTime,
      pageSize: 10,
      pageNum: 1,
      type: "first-paint"
    }).then((res) => {
      let FpData = [
        { value: 0, name: "<1秒" },
        { value: 0, name: "1-5秒" },
        { value: 0, name: "5-10秒" },
        { value: 0, name: ">10秒" }
      ];
      let FpLine: any = [];
      res.data.data.forEach((item: any) => {
        if (item.startTime < 1000) {
          FpData[0].value += 1;
        } else if (item.startTime < 5000) {
          FpData[1].value += 1;
        } else if (item.startTime < 10000) {
          FpData[2].value += 1;
        } else {
          FpData[3].value += 1;
        }

        const FpLineItem = [];
        FpLineItem.push(timeFormat(item.updatedAt));
        FpLineItem.push(item.startTime.toFixed(1));
        FpLine.push(FpLineItem);
      });
      pieOption.series[0].data = FpData;
      metricsOption.series[0].data = FpLine;
    });

    // 获取FCP
    getPerformanceList({
      startTime: startTime,
      endTime: endTime,
      pageSize: 10,
      pageNum: 1,
      type: "first-contentful-paint"
    }).then((res) => {
      let FcpLine: any = [];
      res.data.data.forEach((item: any) => {
        const FcpLineItem = [];
        FcpLineItem.push(timeFormat(item.updatedAt));
        FcpLineItem.push(item.startTime.toFixed(1));
        FcpLine.push(FcpLineItem);
      });
      metricsOption.series[1].data = FcpLine;
    });

    // 获取LCP
    getPerformanceList({
      startTime: startTime,
      endTime: endTime,
      pageSize: 10,
      pageNum: 1,
      type: "largest-contentful-paint"
    }).then((res) => {
      let LcpLine: any = [];
      res.data.data.forEach((item: any) => {
        const LcpLineItem = [];
        LcpLineItem.push(timeFormat(item.updatedAt));
        LcpLineItem.push(item.startTime.toFixed(1));
        LcpLine.push(LcpLineItem);
      });
      metricsOption.series[2].data = LcpLine;
    });

    // 获取DOM全部加载
    getPerformanceList({
      startTime: startTime,
      endTime: endTime,
      pageSize: 10,
      pageNum: 1,
      type: "domcontentloaded"
    }).then((res) => {
      let DOMLine: any = [];
      res.data.data.forEach((item: any) => {
        const DOMLineItem = [];
        DOMLineItem.push(timeFormat(item.updatedAt));
        DOMLineItem.push(item.startTime.toFixed(1));
        DOMLine.push(DOMLineItem);
      });
      metricsOption.series[3].data = DOMLine;
    });
  }, [startTime, endTime, timeSelect]);

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
      <WhitePane label="首屏渲染">
        {/* 饼图 */}
        <Map
          option={pieOption}
          id="page-pie"
          wAh={{ width: "70vw", height: "500px" }}
        ></Map>
      </WhitePane>
      <WhitePane label="页面路由加载时间排行">
        <Table
          dataSource={routerSource}
          columns={columns}
          pagination={{
            pageSize: 5,
            total: routerTotal,
            onChange: routerPageChange
          }}
          // }}
        ></Table>
      </WhitePane>

      <WhitePane label="页面CLS">
        <Table
          dataSource={clsSource}
          columns={clsColumns}
          pagination={{
            pageSize: 5,
            total: clsTotal,
            onChange: clsPageChange
          }}
          // }}
        ></Table>
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
