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
import { Context } from "./context";
const items: MenuProps["items"] = [
  {
    label: "概览",
    key: "overview"
  },
  {
    label: "错误列表",
    key: "SubMenu",
    children: [
      {
        label: "console-error",
        key: "console-error"
      },
      {
        label: "onerror",
        key: "onerror"
      },
      {
        label: "promise错误",
        key: "promise-error"
      },
      {
        label: "VUE错误",
        key: "vue-error"
      }
    ]
  }
];

export default function JsErr() {
  const [current, setCurrent] = useState("overview");
  const [visible, setVisible] = useState(true);

  const showDrawer = (row: Object) => {
    setVisible(true);
    console.log("rowData", row);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onClick: MenuProps["onClick"] = (e) => {
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
        title="错误详情"
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
