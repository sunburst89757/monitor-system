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
import { Context } from "../components/quietViewErr/context";
const items: MenuProps["items"] = [
  {
    label: "概览",
    key: "overview"
  },
  {
    label: "资源加载错误列表",
    key: "SubMenu"
  }
];

export default function JsErr() {
  const [current, setCurrent] = useState("overview");
  const [visible, setVisible] = useState(false);

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
        key="资源加载错误详情"
        title="资源加载错误详情"
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
