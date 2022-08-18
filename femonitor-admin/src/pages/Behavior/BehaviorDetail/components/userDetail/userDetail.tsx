import { IUserBehaviorList } from "../../../UserBehaviorOverview/types";
import { Map } from "../../../../../components/Map/Map";
import { timeOption, timeOption1 } from "../../config";
import style from "./userDetail.module.scss";
import { parseUa } from "../../../../../utils/parseUa";
import { ua2icon } from "../../../../../utils/ua2icon";
import { useCallback, useEffect, useRef, useState } from "react";
import { getApiLoadTime, getPageLoadTime } from "../../../../../api/behavior";
const handleProduct = (item: string): string => {
  let res = "";
  if (item.includes("10")) {
    res = "5s-10s";
  } else if (item.includes("5")) {
    res = "1s-5s";
  } else if (item.includes("1")) {
    res = "1s内";
  } else if (item.includes("30")) {
    res = "10s-30s";
  } else {
    res = "30s以上";
  }
  return res;
};
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
export interface IPageSource {
  pageURL: string;
  time: number;
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
  const [apiData, setapiData] = useState<IApiSource[]>([
    {
      product: "小于1s",
      number: 220
    },
    {
      product: "1s-5s",
      number: 10
    },
    {
      product: "5s-10s",
      number: 0
    },
    {
      product: "10s-30s",
      number: 0
    },
    {
      product: "大于30",
      number: 0
    }
  ]);
  const [pageData, setPageData] = useState<IPageSource[]>([
    {
      pageURL: " ",
      time: 1
    }
  ]);
  const getDataList = useCallback(() => {
    getApiLoadTime(query.current).then((res) => {
      const source: IApiSource[] = [];
      Object.keys(res.data).forEach((item, i) => {
        const obj: IApiSource = {
          product: "",
          number: 1
        };
        obj.product = handleProduct(item);
        obj.number = Object.values(res.data)[i];
        source.push(obj);
      });
      setapiData(source!);
    });
    getPageLoadTime(query.current).then((res) => {
      const data = res.data;
      data.forEach((item) => {
        item.time = Number((item.time / 1000).toFixed(2));
      });
      setPageData(data);
    });
  }, []);
  useEffect(() => {
    query.current.startTime = endTime - 24 * 60 * 60 * 1000 + 1;
    getDataList();
  }, [endTime, getDataList]);
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
          <Map option={timeOption} dataSource={pageData}></Map>
        </div>
      </div>
      <div className={style.block}>
        <div className={style.title}>接口耗时区间分布</div>
        <div className={style.mapBody}>
          <Map option={timeOption1} dataSource={apiData}></Map>
        </div>
      </div>
    </div>
  );
};
