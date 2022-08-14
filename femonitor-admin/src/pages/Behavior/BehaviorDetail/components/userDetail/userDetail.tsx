import { IUserInfo1 } from "../../../UserBehaviorOverview";
import { Map } from "../../../../../components/Map/Map";
import { timeOption, timeOption1 } from "../../config";
import style from "./userDetail.module.scss";
import { Space } from "antd";
import { IconFont } from "../../../../../components/IconFont";
const confirmIcon = (index: string) => {
  switch (index) {
    case "00":
      return (
        <Space>
          <IconFont type="icon-windows"></IconFont>
          <IconFont type="icon-chrome"></IconFont>
        </Space>
      );
    case "01":
      return (
        <Space>
          <IconFont type="icon-windows"></IconFont>
          <IconFont type="icon-firefox"></IconFont>
        </Space>
      );
    case "10":
      return (
        <Space>
          <IconFont type="icon-mac"></IconFont>
          <IconFont type="icon-chrome"></IconFont>
        </Space>
      );
    case "11":
      return (
        <Space>
          <IconFont type="icon-mac"></IconFont>
          <IconFont type="icon-safari"></IconFont>
        </Space>
      );
  }
};
export const UserDetail = ({ userId, device, ip, location }: IUserInfo1) => {
  return (
    <div className={style.detail}>
      <div className={style.block}>
        <div className={style.title}>用户基本信息</div>
        <ul className={style.body}>
          <li>
            <div className={style.left}>用户id:</div>
            <div className={style.right}>{userId}</div>
          </li>
          <li>
            <div className={style.left}>设备平台:</div>
            <div className={style.right}>{confirmIcon(device)}</div>
          </li>
          <li>
            <div className={style.left}>ip地址:</div>
            <div className={style.right}>{ip}</div>
          </li>
          <li>
            <div className={style.left}>所在地区:</div>
            <div className={style.right}>{location}</div>
          </li>
        </ul>
      </div>
      <div className={style.block}>
        <div className={style.title}>页面平均加载时间</div>
        <div className={style.mapBody}>
          <Map option={timeOption}></Map>
        </div>
      </div>
      <div className={style.block}>
        <div className={style.title}>接口耗时区间分布</div>
        <div className={style.mapBody}>
          <Map option={timeOption1}></Map>
        </div>
      </div>
    </div>
  );
};
