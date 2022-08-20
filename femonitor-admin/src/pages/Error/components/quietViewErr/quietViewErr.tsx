import { quietViewErrType, QuietViewErrListType } from "../types";
import style from "./quietViewErr.module.scss";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState, useContext, createContext } from "react";
import { Context } from "./context";
import { nanoid } from "nanoid";
import { JsErrorType, IQueryJsErrorType } from "../../JsErr/types";
import { useEffect } from "react";

import {
  getJsErrorList,
  getConsoleErrorList,
  getPromiseErrorList,
  getVueErrorList
} from "../../../../api/error";

export default function QuietViewErr({
  label,
  value,
  showPage,
  pageSize,
  timeSelect
}: quietViewErrType) {
  console.log("label", label);
  console.log("value", value);
  const nowTime = new Date().toLocaleDateString();

  const fun1 = useContext(Context)?.dispacth;

  const [endTime, setEndTime] = useState(Date.now());

  const [startTime, setStartTime] = useState(endTime);

  const TablePageChange = (page: number) => {
    console.log("page", page);
  };

  const columns: ColumnsType<QuietViewErrListType> = [
    {
      title: "ErrorName",
      dataIndex: "name",
      key: "name",
      render: (text, row) => (
        <span className={style.linkText} onClick={() => fun1?.(row)}>
          {text}
        </span>
      )
    },
    {
      title: "内容",
      dataIndex: "describe",
      key: "describe"
    },
    {
      title: "错误次数",
      dataIndex: "times",
      key: "times"
    },
    {
      title: "影响人数",
      key: "effects",
      dataIndex: "effects"
    },
    {
      title: "最后出错时间",
      key: "lastTIme",
      dataIndex: "lastTIme"
    }
  ];
  const [errList, setErrList] = useState<QuietViewErrListType[]>([
    {
      id: "#1111",
      name: "CustomizeError",
      describe: "网络开小差啦",
      times: 1777,
      effects: 800,
      lastTIme: "2022-03-03 00:45:01"
    },
    {
      id: "#1234",
      name: "CustomizeError",
      describe: "Network request failed",
      times: 1777,
      effects: 800,
      lastTIme: "2022-03-03 00:45:01"
    },
    {
      id: "#112311",
      name: "CustomizeError",
      describe: "{'fetchStatus':'timeout'}",
      times: 1777,
      effects: 800,
      lastTIme: "2022-03-03 00:45:01"
    },
    {
      id: "#12312312",
      name: "CustomizeError",
      describe: "查询结果失败",
      times: 1777,
      effects: 800,
      lastTIme: "2022-03-03 00:45:01"
    },
    {
      id: "#1asdf",
      name: "CustomizeError",
      describe: "网络开小差啦",
      times: 1777,
      effects: 800,
      lastTIme: "2022-03-03 00:45:01"
    }
  ]);

  useEffect(() => {
    let timeStamp = parseInt(timeSelect) * 60 * 60 * 1000;
    let startime = endTime - timeStamp;
    setStartTime(startime);
  }, [timeSelect, endTime]);

  useEffect(() => {
    let newErrList: QuietViewErrListType[] = [];
    if (value === "console.error") {
      getConsoleErrorList({
        pageNum: 1,
        pageSize: 100,
        startTime: startTime,
        endTime: endTime
      }).then((res) => {
        let data = res.data;
        let result = data.result;
        if (result.length) {
          result.forEach((item) => {
            newErrList.push({
              id: nanoid(),
              name: "Console.error",
              describe: item.error,
              times: item.num,
              effects: item.userNum,
              lastTIme: item.createdAt.replace("T", " ").split(".")[0],
              data: item
            });
          });
        } else {
        }
        setErrList(newErrList);
      });
    } else if (value === "promiseError") {
      getPromiseErrorList({
        pageNum: 1,
        pageSize: 100,
        startTime: startTime,
        endTime: endTime
      }).then((res) => {
        let data = res.data;
        let result = data.result;
        if (result.length) {
          result.forEach((item) => {
            let des = "";
            if (item.msg) des = item.msg;
            newErrList.push({
              id: nanoid(),
              name: "Uncaught (in promise)",
              describe: des,
              times: item.num,
              effects: item.userNum,
              lastTIme: item.createdAt.replace("T", " ").split(".")[0],
              data: item
            });
          });
        } else {
        }
        setErrList(newErrList);
      });
    } else if (value === "vue-error") {
      getVueErrorList({
        pageNum: 1,
        pageSize: 100,
        startTime: startTime,
        endTime: endTime
      }).then((res) => {
        let data = res.data;
        let result = data.result;
        if (result.length) {
          result.forEach((item) => {
            newErrList.push({
              id: nanoid(),
              name: item.error.split(":")[0],
              describe: item.info,
              times: item.num,
              effects: item.userNum,
              lastTIme: item.createdAt.replace("T", " ").split(".")[0],
              data: item
            });
          });
        } else {
        }
        setErrList(newErrList);
      });
    } else {
      getJsErrorList({
        pageNum: 1,
        pageSize: 100,
        startTime: startTime,
        endTime: endTime
      }).then((res) => {
        let data = res.data;
        let result = data.result;
        if (result.length) {
          result.forEach((item) => {
            newErrList.push({
              id: nanoid(),
              name: item.error.split(":")[0],
              describe: item.msg,
              times: item.num,
              effects: item.userNum,
              lastTIme: item.createdAt.replace("T", " ").split(".")[0],
              data: item
            });
          });
        } else {
        }
        setErrList(newErrList);
      });
    }
  }, [startTime, endTime, setErrList]);

  return (
    <div className={style.container}>
      <div className={style.title}>
        <div className={style.titleContext}>
          <span>{label}</span>
          {value === "" ? null : <span>{"（" + value + "）"}</span>}
        </div>
        <div>{nowTime}</div>
      </div>
      <div className={style.tableContainer}>
        <Table
          columns={columns}
          dataSource={errList}
          pagination={
            showPage
              ? {
                  pageSize: pageSize,
                  onChange: TablePageChange
                }
              : false
          }
          rowKey={(record) => record.id}
        />
      </div>
    </div>
  );
}
