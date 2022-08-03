/* 
包括 console.err
包括 window.onerror
包括 promise

*/
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useState } from "react";
import Overview from "./Overview/overview";
import ErrList from "./ErrList/ErrList";

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
        label: "console.error",
        key: "consoleErr"
      },
      {
        label: "window.error",
        key: "windowErr"
      },
      {
        label: "promise错误",
        key: "promiseErr"
      }
    ]
  }
];

export default function JsErr() {
  const [current, setCurrent] = useState("overview");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      {current === "overview" ? (
        <Overview />
      ) : (
        <ErrList errortype={current}></ErrList>
      )}
    </div>
  );
}
