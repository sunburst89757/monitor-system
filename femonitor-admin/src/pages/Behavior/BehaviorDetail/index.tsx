import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { DatePicker, DatePickerProps, Input, Space } from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Map } from "../../Dashboard/components/Map/Map";
import style from "./behaviorDetail.module.scss";
import { timeOption, timeOption1 } from "./config";
const { Search } = Input;
export default function BehaviorDetail() {
  const location = useLocation();
  const locationRef = useRef(location);
  const [isCollapse, setisCollapse] = useState(false);
  const queryForm = useRef({
    time: "1990",
    userId: "1"
  });
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current > moment().endOf("day");
  };
  const onChangeDay = useCallback((date: any, dataStr: string) => {
    queryForm.current.time = date;
    console.log(date, dataStr);
  }, []);
  const onSearch = useCallback((value: string) => {
    queryForm.current.userId = value;
    console.log(value, "huhiu");
  }, []);
  return (
    <div className={style.contain}>
      <div className={style.header}>
        <div
          className={style.leftBlock}
          onClick={() => {
            setisCollapse(!isCollapse);
          }}
        >
          <span>用户详情 </span>
          {isCollapse ? <UpOutlined /> : <DownOutlined />}
        </div>
        <div className={style.rightBlock}>
          <Space>
            <DatePicker
              onChange={onChangeDay}
              defaultValue={moment()}
              disabledDate={disabledDate}
            />
            <Search
              placeholder="请输入用户id"
              onSearch={onSearch}
              allowClear
              style={{ width: 200 }}
            />
          </Space>
        </div>
      </div>
      {isCollapse ? (
        ""
      ) : (
        <div className={style.detail}>
          <div className={style.block}>
            <div className={style.title}>用户基本信息</div>
            <ul className={style.body}>
              <li>
                <div className={style.left}>用户id:</div>
                <div className={style.right}>hhhh</div>
              </li>
              <li>
                <div className={style.left}>浏览器:</div>
                <div className={style.right}>hhhh</div>
              </li>
              <li>
                <div className={style.left}>操作系统:</div>
                <div className={style.right}>hhhh</div>
              </li>
              <li>
                <div className={style.left}>ip地址:</div>
                <div className={style.right}>hhhh</div>
              </li>
              <li>
                <div className={style.left}>所在地区:</div>
                <div className={style.right}>hhhh</div>
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
      )}
    </div>
  );
}
