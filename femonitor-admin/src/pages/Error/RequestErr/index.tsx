/* 
包括 console.err
包括 window.onerror
包括 promise

*/
import type { MenuProps } from "antd";
import { Menu, Button, Drawer } from "antd";
import Overview from "./Overview/overview";
import ErrList from "./ErrList/ErrList";
import { ErrorDetail } from "../components/errorDetail/errorDetail";
import style from "./index.module.scss";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { JsErrorShowItem } from "../JsErr/types";
import { Context } from "../components/quietViewErr/context";
const items: MenuProps["items"] = [
  {
    label: "概览",
    key: "overview"
  },
  {
    label: "请求错误列表",
    key: "SubMenu",
    children: [
      {
        label: "xhr请求",
        key: "xhr"
      },
      {
        label: "fetch请求",
        key: "fetch"
      }
    ]
  }
];

export default function RequestErr() {
  const [current, setCurrent] = useState("overview");
  const [visible, setVisible] = useState(false);
  const [data2, setData] = useState<JsErrorShowItem>({
    id: nanoid(),
    name: "",
    describe: "",
    times: 0,
    effects: 0,
    lastTime: "",
    data: {}
  });

  const showDrawer = (row: JsErrorShowItem) => {
    setVisible(true);
    setData(row);
    console.log("rowData", row);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("e", e);
    setCurrent(e.key);
  };

  return (
    <div className={style.box}>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Context.Provider value={{ dispacth: showDrawer }}>
        {current === "overview" ? (
          <Overview />
        ) : (
          <ErrList errortype={current}></ErrList>
        )}
      </Context.Provider>

      <Drawer
        title="请求错误详情"
        placement="right"
        onClose={onClose}
        visible={visible}
        width="80vw"
      >
        <ErrorDetail></ErrorDetail>
      </Drawer>
    </div>
  );
}
