import { ClockCircleOutlined, UndoOutlined } from "@ant-design/icons";
import { Progress, Select } from "antd";
import { useCallback, useMemo, useState } from "react";
import { AreaMap } from "./components/AreaMap/AreaMap";
import { Circle } from "./components/Circle/Circle";
import { DataDisplay } from "./components/DataDisplay/DataDisplay";
import { PerformanceDisplay } from "./components/PerformanceDisplay/PerformanceDisplay";
import { PvMap } from "./components/PvMap/PvMap";
import {
  areaMapOption1,
  areaMapOption2,
  pvConfig,
  timeSelect1,
  timeSelect2
} from "./config";
import style from "./dashboard.module.scss";
import { ICircleType, IDataDisplay, IPerformanceDisplay } from "./types";
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
  const [healthyPercent, healthysetpercent] = useState(50);
  const circleColor = useMemo(() => {
    let color: string = "";
    if (healthyPercent > 90) {
      color = "#52c41a";
    } else if (healthyPercent > 70) {
      color = "#1890ff";
    } else {
      color = "#ff4d4f";
    }
    return color;
  }, [healthyPercent]);
  const healthyContent = useMemo(() => {
    if (healthyPercent > 90) {
      return "健康";
    } else if (healthyPercent > 70) {
      return "良好";
    } else {
      return "很差";
    }
  }, [healthyPercent]);
  const [circle, setcircle] = useState<ICircleType[]>([
    {
      content: "JS错误",
      percent: 88
    },
    {
      content: "自定义异常",
      percent: 50
    },
    {
      content: "静态资源异常",
      percent: 20
    },
    {
      content: "接口异常",
      percent: 95
    }
  ]);
  const [dataFlows, setdataFlows] = useState<IDataDisplay[]>([
    {
      title: "浏览量(PV)",
      content: 2109832,
      rate: 16.57
    },
    {
      title: "访客数(UV)",
      content: 657891,
      rate: 4.78
    },
    {
      title: "新访客",
      content: 129871,
      rate: 18.2
    },
    {
      title: "IP数",
      content: 657591,
      rate: 0.04
    },
    {
      title: "频次(人均)",
      content: 3.21,
      rate: 11.46
    },
    {
      title: "跳出率",
      content: "59.05%",
      rate: -24.18
    }
  ]);
  const [performanceData, setperformanceData] = useState<IPerformanceDisplay[]>(
    [
      {
        title: "TTFB平均时间",
        promptMessage: "发起请求到第一个字节到达的时间，涉及DNS,TCP等",
        content: "158.91ms"
      },
      {
        title: "Dom解析时间",
        promptMessage: "Dom解析完成的时间，反映出DOM的复杂度",
        content: "2.58s"
      },
      {
        title: "页面平均加载时间",
        promptMessage: "页面加载完成的总时间",
        content: "2.74s"
      },
      {
        title: "接口请求总量",
        promptMessage: "发起请求的总数量",
        content: "263"
      },
      {
        title: "接口请求平均耗时",
        promptMessage: "取24小时内的平均值",
        content: "214.15ms"
      },
      {
        title: "接口请求成功率",
        promptMessage: "请求成功数/总请求数",
        content: "100%"
      }
    ]
  );
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
          <div className={style.blockCenter}>
            <div className={style.healthyAll}>
              <div className={style.toolTip}>
                {/* <Tooltip
                  title={healthyContent}
                  visible={true}
                  placement="rightTop"
                  color={circleColor}
                ></Tooltip> */}
              </div>
              <Progress
                type="circle"
                percent={healthyPercent}
                strokeColor={circleColor}
                format={(percent) => (
                  <div className={style.circle}>
                    <div
                      className={style.circleFont}
                      style={{ color: circleColor }}
                    >
                      {percent}
                    </div>
                    <div className={style.circleTitle}>健康状态</div>
                  </div>
                )}
              ></Progress>
            </div>
            <div className={style.divided}></div>
            <div className={style.healthyDetail}>
              {circle.map((item) => (
                <Circle
                  percent={item.percent}
                  content={item.content}
                  key={item.content}
                ></Circle>
              ))}
            </div>
          </div>
        </div>
        <div className={style.block} style={{ height: "60vh" }}>
          <div className={style.blockHeader}>流量数据</div>
          <div
            className={style.blockCenter}
            style={{ justifyContent: "space-around" }}
          >
            {dataFlows.map((item) => (
              <DataDisplay {...item} key={item.content}></DataDisplay>
            ))}
          </div>
          <div className={style.blockBottom}>
            <div className={style.blockBottomItem} id="mapBox">
              <PvMap option={pvConfig}></PvMap>
            </div>
            <div className={style.divided}></div>
            <div className={style.blockBottomItem} id="areaBox">
              <AreaMap option={areaMapOption1} id="pv"></AreaMap>
              <AreaMap option={areaMapOption2} id="uv"></AreaMap>
            </div>
          </div>
        </div>
        <div className={style.block}>
          <div className={style.blockHeader}>性能数据</div>
          <div
            className={style.blockCenter}
            style={{ justifyContent: "space-around" }}
          >
            {performanceData.map((item) => (
              <PerformanceDisplay
                {...item}
                key={item.title}
              ></PerformanceDisplay>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
//  https://developer.51cto.com/article/706002.html
