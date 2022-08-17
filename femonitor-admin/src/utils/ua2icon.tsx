import { Space } from "antd";
import { IconFont } from "../components/IconFont";
import { IUa } from "./parseUa";

export const ua2icon = (ua: IUa) => {
  const { os, browser } = ua;
  const osType = os.includes("Windows") ? "icon-windows" : "icon-mac";
  const browserType = browser.includes("Firefox")
    ? "icon-firefox"
    : browser.includes("Safari")
    ? "icon-safari"
    : "icon-chrome";
  return (
    <Space>
      <IconFont type={osType}></IconFont>
      <IconFont type={browserType}></IconFont>
    </Space>
  );
};
