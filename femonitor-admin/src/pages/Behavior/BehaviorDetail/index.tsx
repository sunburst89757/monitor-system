import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { DatePicker, Input, Space } from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./behaviorDetail.module.scss";
import { UserDetail } from "./components/userDetail/userDetail";
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
      {isCollapse ? "" : <UserDetail></UserDetail>}
    </div>
  );
}
