import style from "./overview.module.scss";
import React, { useState, useEffect } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { timeSelect1 } from "../../../Dashboard/config";
import DataDisplay from "../../components/DataDisplay/DataDisplay";
import { Map } from "../../components/Map/Map";
import { errorTimeMap } from "../config";
import {
  getApiErrorCount,
  getResourceApiOverview
} from "../../../../api/error";
import { dataDisplayType } from "../../components/types";
import { timeStamp2Month2Second } from "../../../../utils/handleTime";

const { Option } = Select;

export default function Overview() {
  const [timeSelect, settimeSelect] = useState("1");

  const timeSelectChange = (value: string) => {
    console.log(`selected ${parseInt(value)}`);
    settimeSelect(value);
  };
  const [endTime, setEndTime] = useState(Date.now());

  const [startTime, setStartTime] = useState(endTime);

  const [dataFlow, setDataFlow] = useState<dataDisplayType[]>([
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
                name: "xhr"
              },
              {
                value: 1,
                name: "fetch"
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
                name: "xhr"
              },
              {
                value: 1,
                name: "fetch"
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

  useEffect(() => {
    let timeStamp = parseInt(timeSelect) * 60 * 60 * 1000;
    let startime = endTime - timeStamp;
    setStartTime(startime);
  }, [timeSelect, endTime]);

  useEffect(() => {
    // pie
    getResourceApiOverview({
      startTime: startTime,
      endTime: endTime
    })
      .then((res) => {
        let newDataFlow = [
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
                      name: "xhr"
                    },
                    {
                      value: 1,
                      name: "fetch"
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
                      name: "xhr"
                    },
                    {
                      value: 1,
                      name: "fetch"
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
        ];
        let data = res.data;
        newDataFlow[0].option.series[0].data[0].value = data["xhr"].error;
        newDataFlow[0].option.series[0].data[1].value = data["fetch"].error;
        newDataFlow[1].option.series[0].data[0].value = data["xhr"].user;
        newDataFlow[1].option.series[0].data[1].value = data["fetch"].user;
        setDataFlow(newDataFlow);
      })
      .catch((err) => {});
    // map
    getApiErrorCount({
      startTime: startTime,
      endTime: endTime
    })
      .then((res) => {
        let data = res.data;
        let start = startTime;
        let end = endTime;
        let times = 12;
        let diff = Math.floor((end - start) / times);
        let now = start - diff;
        let newTimeArr: string[] = [];
        for (let i = 0; i < times; i++) {
          now += diff;
          newTimeArr.push(timeStamp2Month2Second(now));
        }
        errorTimeMap.xAxis[0].data = newTimeArr;

        let targetArr = data["xhr"];
        errorTimeMap.series[0].data = new Array(12).fill(0);
        errorTimeMap.series[1].data = new Array(12).fill(0);
        for (let j = 0; j < 12; j++) {
          if (targetArr !== undefined) {
            errorTimeMap.series[0].data[j] = data["xhr"][j].errorNum;
            errorTimeMap.series[1].data[j] = data["fetch"][j].errorNum;
          } else {
            break;
          }
        }
      })

      .catch((err) => {});
  }, [startTime, endTime, setDataFlow]);

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
