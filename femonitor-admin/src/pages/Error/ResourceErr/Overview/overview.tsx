import style from "./overview.module.scss";
import React, { useState, useEffect } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { timeSelect1 } from "../../../Dashboard/config";
import DataDisplay from "../../components/DataDisplay/DataDisplay";
import { Map } from "../../components/Map/Map";
import { errorTimeMap } from "../config";
import {
  getResourceOverview,
  getResourceErrorCount
} from "../../../../api/error";
import { getResourceCountItemType } from "../types";
import { dataDisplayType } from "../../components/types";
import { timeStamp2Month2Second } from "../../../../utils/handleTime";
import { type } from "os";
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

  useEffect(() => {
    let timeStamp = parseInt(timeSelect) * 60 * 60 * 1000;
    let startime = endTime - timeStamp;
    setStartTime(startime);
  }, [timeSelect, endTime]);

  useEffect(() => {
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
                  value: 0,
                  name: "SCRIPT"
                },
                {
                  value: 0,
                  name: "CSS"
                },
                {
                  value: 0,
                  name: "IMG"
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
          userNum: 0,
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
                  value: 0,
                  name: "SCRIPT"
                },
                {
                  value: 0,
                  name: "CSS"
                },
                {
                  value: 0,
                  name: "IMG"
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
    getResourceErrorCount({
      startTime: startTime,
      endTime: endTime
    })
      .then((res) => {
        // map
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
        // overview
        let data = res.data;
        let targetArr = data["CSS"];
        let str = "CSS";
        let errNum = 0;
        let total = 0;
        errorTimeMap.series[1].data = new Array(12).fill(0);
        for (let j = 0; j < 12; j++) {
          if (targetArr !== undefined) {
            errNum += targetArr[j].errorNum;
            errorTimeMap.series[1].data[j] = targetArr[j].errorNum;
          } else {
            errNum = 0;
            break;
          }
        }
        // newDataFlow[0].option.series[0].data = [];
        if (errNum !== 0) {
          newDataFlow[0].option.series[0].data[1] = {
            value: errNum,
            name: str
          };
        }
        total += errNum;
        targetArr = data["SCRIPT"];
        str = "SCRIPT";
        errNum = 0;
        errorTimeMap.series[0].data = new Array(12).fill(0);
        for (let j = 0; j < 12; j++) {
          if (targetArr !== undefined) {
            errNum += targetArr[j].errorNum;
            errorTimeMap.series[0].data[j] = targetArr[j].errorNum;
          } else {
            errNum = 0;
            break;
          }
        }
        if (errNum !== 0) {
          newDataFlow[0].option.series[0].data[0] = {
            value: errNum,
            name: str
          };
          newDataFlow[1].option.series[0].data[0].value = 1;
        }
        total += errNum;
        targetArr = data["IMG"];
        str = "IMG";
        errNum = 0;
        errorTimeMap.series[2].data = new Array(12).fill(0);
        for (let j = 0; j < 12; j++) {
          if (targetArr !== undefined) {
            errNum += targetArr[j].errorNum;
            errorTimeMap.series[2].data[j] = targetArr[j].errorNum;
          } else {
            errNum = 0;
            break;
          }
        }
        if (errNum !== 0) {
          newDataFlow[0].option.series[0].data[2] = {
            value: errNum,
            name: str
          };
          newDataFlow[1].option.series[0].data[2].value = 1;
          newDataFlow[1].option.userNum = 2;
        }
        total += errNum;
        // targetArr = data["PNG"];
        // str = "PNG";
        // errNum = 0;
        // for (let j = 0; j < 12; j++) {
        //   if (targetArr !== undefined) {
        //     errNum += targetArr[j].errorNum;
        //   } else {
        //     errNum = 0;
        //     break;
        //   }
        // }
        // if (errNum !== 0) {
        //   newDataFlow[0].option.series[0].data.push({
        //     value: errNum,
        //     name: str
        //   });
        // }
        total += errNum;
        // let handlerArr = ["SCRITP", "CSS", "IMG", "PNG"];
        // for (let i = 0; i < handlerArr.length; i++) {
        //   let str = handlerArr[i];
        //   let index = handlerArr[i];
        //   let newArr: getResourceCountItemType[] =
        //     data[index as keyof typeof data];
        //   console.log("newArr", newArr, str);
        //   errorTimeMap.series[i].data = [];
        //   for (let j = 0; j < 12; j++) {
        //     if (newArr[j] !== undefined) {
        //       errorTimeMap.series[i].data.push(newArr[j].errorNum);
        //     } else {
        //       errorTimeMap.series[i].data.push(0);
        //     }
        //   }
        // }
        setDataFlow(newDataFlow);
      })
      .catch((err) => {
        setDataFlow(newDataFlow);
      });
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
            <Option value={item.value} key={item.label + "1"}>
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
