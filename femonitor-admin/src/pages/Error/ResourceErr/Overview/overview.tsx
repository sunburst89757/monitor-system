import style from "./overview.module.scss";
import React, { useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { timeSelect1 } from "../../../Dashboard/config";
import DataDisplay from "../../components/DataDisplay/DataDisplay";
import { Map } from "../../components/Map/Map";
import { errorTimeMap } from "../config";
import { dataDisplayType } from "../../components/types";
import { useSetState } from "ahooks";
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
      id: "resource-error-pie",
      option: {
        tooltip: {
          trigger: "item"
        },
        series: [
          {
            type: "pie",
            data: [
              {
                value: 1,
                name: "JS"
              },
              {
                value: 1,
                name: "CSS"
              },
              {
                value: 4,
                name: "PNG"
              },
              {
                value: 3,
                name: "JPG"
              }
            ]
          }
        ]
      },
      wAh: {
        width: "400px",
        height: "200px"
      }
    },
    {
      label: "资源加载错误率",
      id: "resource-error-precent-pie",
      option: {
        errorPercent: "4.11%",
        pvTotal: 100,
        tooltip: {
          trigger: "item"
        },
        series: [
          {
            type: "pie",
            data: [
              {
                value: 12,
                name: "JS"
              },
              {
                value: 1,
                name: "CSS"
              },
              {
                value: 7,
                name: "PNG"
              },
              {
                value: 7,
                name: "JPG"
              }
            ]
          }
        ]
      },
      wAh: {
        width: "400px",
        height: "200px"
      }
    },
    {
      label: "影响用户数",
      id: "resource-error-user-pie",
      option: {
        userNum: 11,
        tooltip: {
          trigger: "item"
        },
        series: [
          {
            type: "pie",
            label: {
              // 饼图图形上的文本标签
              normal: {
                show: true
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            data: [
              {
                value: 2,
                name: "JS"
              },
              {
                value: 1,
                name: "CSS"
              },
              {
                value: 5,
                name: "PNG"
              },
              {
                value: 3,
                name: "JPG"
              }
            ]
          }
        ]
      },
      wAh: {
        width: "400px",
        height: "200px"
      }
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
            id={item.id}
            option={item.option}
            wAh={item.wAh}
            key={item.id}
          ></DataDisplay>
        ))}
      </div>
      <div className={style.mapBox}>
        <Map
          option={errorTimeMap}
          id="error-time-map"
          wAh={{ width: "80vw", height: "500px" }}
        ></Map>
      </div>
    </>
  );
}
