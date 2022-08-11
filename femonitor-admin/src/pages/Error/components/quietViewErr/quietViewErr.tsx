import { quietViewErrType, QuietViewErrListType } from "../types";
import style from "./quietViewErr.module.scss";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState, useContext } from "react";
import { Context } from "../../JsErr/context";
import { useSetState } from "ahooks";

export default function QuietViewErr({
  label,
  value,
  showPage,
  pageSize
}: quietViewErrType) {
  const nowTime = new Date().toLocaleDateString();
  const fun1 = useContext(Context)?.dispacth;
  console.log("fun1", fun1);
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
  const [errList, setErrList] = useSetState<QuietViewErrListType[]>([
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
  return (
    <div className={style.container}>
      <div className={style.title}>
        <div className={style.titleContext}>{label + "（" + value + "）"}</div>
        <div>{nowTime}</div>
      </div>
      <div className={style.tableContainer}>
        <Table
          columns={columns}
          dataSource={errList}
          pagination={showPage ? undefined : false}
          rowKey={(record) => record.id}
        />
      </div>
    </div>
  );
}
