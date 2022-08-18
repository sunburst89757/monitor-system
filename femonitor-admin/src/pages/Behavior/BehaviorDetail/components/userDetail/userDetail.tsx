import { IUserBehaviorList } from "../../../UserBehaviorOverview/types";
import { Map } from "../../../../../components/Map/Map";
import { timeOption, timeOption1 } from "../../config";
import style from "./userDetail.module.scss";
import { parseUa } from "../../../../../utils/parseUa";
import { ua2icon } from "../../../../../utils/ua2icon";
import { useCallback, useEffect, useRef, useState } from "react";
import { getApiLoadTime } from "../../../../../api/behavior";
export type IQueryParams = {
  userId: string;
  startTime: number;
  endTime: number;
};
export interface IApiLoadTime {
  "1": number;
  "5": number;
  "10": number;
  "30": number;
  other: number;
}
export interface IApiSource {
  product: string;
  number: number;
}
export const UserDetail = ({
  userID,
  ua,
  ip,
  city,
  endTime
}: IUserBehaviorList & { endTime: number }) => {
  const query = useRef<IQueryParams>({
    userId: userID,
    endTime,
    startTime: endTime - 24 * 60 * 60 * 1000 + 1
  });
  const [apiData, setapiData] = useState<IApiSource[] | null>(null);
  const apiOption = useRef(timeOption1);
  const getDataList = useCallback(() => {
    getApiLoadTime(query.current).then((res) => {
      const source: IApiSource[] = [];
      Object.keys(res.data).forEach((item, i) => {
        const obj: IApiSource = {
          product: "",
          number: 1
        };
        obj.product = item;
        obj.number = Object.values(res.data)[i];
        source.push(obj);
      });
      setapiData(source!);
    });
  }, []);
  useEffect(() => {
    query.current.startTime = endTime - 24 * 60 * 60 * 1000 + 1;
    getDataList();
  }, [endTime]);
  return (
    <div className={style.detail}>
      <div className={style.block}>
        <div className={style.title}>用户基本信息</div>
        <ul className={style.body}>
          <li>
            <div className={style.left}>用户id:</div>
            <div className={style.right}>{userID}</div>
          </li>
          <li>
            <div className={style.left}>设备平台:</div>
            <div className={style.right}>{ua2icon(parseUa(ua))}</div>
          </li>
          <li>
            <div className={style.left}>ip地址:</div>
            <div className={style.right}>{ip}</div>
          </li>
          <li>
            <div className={style.left}>所在地区:</div>
            <div className={style.right}>{city}</div>
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
