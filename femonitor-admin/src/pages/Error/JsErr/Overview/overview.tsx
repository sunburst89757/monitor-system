import style from "./overview.module.scss";
import React, { useState, useEffect } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { timeSelect1 } from "../../../Dashboard/config";
import DataDisplay from "../../components/DataDisplay/DataDisplay";
import { Map } from "../../components/Map/Map";
import { nanoid } from "nanoid";
import { dataDisplayType, errListType } from "../../components/types";
import { JsErrorOverviewType, JsErrorCountTypeItem } from "../types";
import { getJsErrorOverview, getJsErrorCount } from "../../../../api/error";
import QuietViewErr from "../../components/quietViewErr/quietViewErr";
import { timeStamp2Month2Second } from "../../../../utils/handleTime";
import { errorTimeMap } from "../config";
const { Option } = Select;

export default function Overview() {
  const [timeSelect, settimeSelect] = useState("1");
  const timeSelectChange = (value: string) => {
    console.log(`selected ${parseInt(value)}`);
    settimeSelect(value);
  };

  const [endTime, setEndTime] = useState(Date.now());

  const [startTime, setStartTime] = useState(endTime);

  const [dataFlow, setDataFlow] = useState<dataDisplayType[]>([]);

  useEffect(() => {
    let timeStamp = parseInt(timeSelect) * 60 * 60 * 1000;
    let startime = endTime - timeStamp;
    setStartTime(startime);
  }, [timeSelect, endTime]);

  function handlerStr(str: string): string {
    if (str === "js") str = "onerror";
    else if (str === "promise") str = "promise-error";
    else if (str === "vue") str = "vue-error";
    else if (str === "console-error") str = "console-error";
    return str;
  }

  useEffect(() => {
    let handlerFunction = getJsErrorOverview;
    handlerFunction({
      startTime: startTime,
      endTime: endTime
    })
      .then((res) => {
        //console.log("res", res);
        let data: JsErrorOverviewType = res.data;
        let newDataFlow: dataDisplayType[] = [
          {
            label: "错误数",
            id: "js-error-pie",
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
                      name: "onerror"
                    },
                    {
                      value: 0,
                      name: "console-error"
                    },
                    {
                      value: 0,
                      name: "promise-error"
                    },
                    {
                      value: 0,
                      name: "vue-error"
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
            label: "JS错误率",
            id: "js-error-precent-pie",
            option: {
              errorPercent: "0%",
              pvTotal: 100,
              tooltip: {
                trigger: "item"
              },
              series: [
                {
                  type: "pie",
                  data: [
                    {
                      value: 0,
                      name: "onerror"
                    },
                    {
                      value: 0,
                      name: "console-error"
                    },
                    {
                      value: 0,
                      name: "promise-error"
                    },
                    {
                      value: 0,
                      name: "vue-error"
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
            id: "js-error-user-pie",
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
                      name: "onerror"
                    },
                    {
                      value: 0,
                      name: "console-error"
                    },
                    {
                      value: 0,
                      name: "promise-error"
                    },
                    {
                      value: 0,
                      name: "vue-error"
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
        let data1 = [];
        let data2 = [];
        let data3 = [];
        for (let key in data) {
          let str = "";
          if (key === "all") continue;
          str = handlerStr(key);
          let dataItem = {
            value: data[key as keyof typeof data].errNum,
            name: str
          };
          data1.push(dataItem);
          data2.push({
            value: data[key as keyof typeof data].errNum,
            name: str
          });
          data3.push({
            value: data[key as keyof typeof data].errUserNum,
            name: str
          });
          // data3.push({
          //   value: data["all"].,
          //   name:"correct"
          // })
        }
        newDataFlow[0].option.series[0].data = data1;
        data2.push({
          name: "uv",
          value: data["all"].pv
        });
        newDataFlow[1].option.series[0].data = data2;
        newDataFlow[2].option.series[0].data = data3;
        let percent = (data["all"].errNum / data["all"].pv) * 100;
        newDataFlow[1].option.errorPercent = percent.toFixed(2);
        newDataFlow[1].option.errorPercent += "%";
        if (isNaN(newDataFlow[1].option.errorPercent))
          newDataFlow[1].option.errorPercent = 0;
        newDataFlow[1].option.pvTotal = data["all"].errNum;
        newDataFlow[2].option.userNum = data["all"].errUserNum;
        setDataFlow(newDataFlow);
      })
      .catch((err) => {
        let newDataFlow: dataDisplayType[] = [
          {
            label: "错误数",
            id: "js-error-pie",
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
                      name: "onerror"
                    },
                    {
                      value: 0,
                      name: "console-error"
                    },
                    {
                      value: 0,
                      name: "promise-error"
                    },
                    {
                      value: 0,
                      name: "vue-error"
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
            label: "JS错误率",
            id: "js-error-precent-pie",
            option: {
              errorPercent: "0",
              pvTotal: 0,
              tooltip: {
                trigger: "item"
              },
              series: [
                {
                  type: "pie",
                  data: [
                    {
                      value: 0,
                      name: "onerror"
                    },
                    {
                      value: 0,
                      name: "console-error"
                    },
                    {
                      value: 0,
                      name: "promise-error"
                    },
                    {
                      value: 0,
                      name: "vue-error"
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
            id: "js-error-user-pie",
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
                      name: "onerror"
                    },
                    {
                      value: 0,
                      name: "console-error"
                    },
                    {
                      value: 0,
                      name: "promise-error"
                    },
                    {
                      value: 0,
                      name: "vue-error"
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
        setDataFlow(newDataFlow);
      });

    getJsErrorCount({
      startTime: startTime,
      endTime: endTime
    }).then((res) => {
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
      let data = res.data;
      let handlerArr = ["js", "console-error", "promise", "vue"];
      for (let i = 0; i < handlerArr.length; i++) {
        let str = handlerStr(handlerArr[i]);
        let index = handlerArr[i];
        let newArr: JsErrorCountTypeItem[] = data[index as keyof typeof data];
        errorTimeMap.series[i].data = [];
        for (let j = 0; j < newArr.length; j++) {
          errorTimeMap.series[i].data.push(newArr[j].errorNum);
        }
      }
      //console.log("data", data);
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
      <QuietViewErr
        label="JS错误"
        value="onerror"
        showPage={false}
        pageSize={5}
        timeSelect={timeSelect}
      ></QuietViewErr>
      <QuietViewErr
        label="自定义异常"
        value="console.error"
        showPage={false}
        pageSize={5}
        timeSelect={timeSelect}
      ></QuietViewErr>
      <QuietViewErr
        label="promise错误"
        value="promiseError"
        showPage={false}
        pageSize={5}
        timeSelect={timeSelect}
      ></QuietViewErr>
    </>
  );
}
