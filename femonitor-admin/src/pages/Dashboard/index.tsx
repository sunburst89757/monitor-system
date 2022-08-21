import { UndoOutlined } from "@ant-design/icons";
import { DatePicker, Select } from "antd";
import { useCallback, useState } from "react";
import { timeSelect2 } from "./config";
import style from "./dashboard.module.scss";
import moment from "moment";
import { RangePickerProps } from "antd/lib/date-picker";
import { ErrorData } from "./views/ErrorData";
import { FlowData } from "./views/FlowData";
import { PerformanceData } from "./views/performanceData";
import { standardTime2TimeStampEnd } from "../../utils/handleTime";
const { Option } = Select;
export default function Dashboard() {
  const [endTime, setEndTime] = useState(moment());
  const [queryTimeSelect, setqueryTimeSelect] = useState("30");
  const querySelectChange = useCallback((value: string) => {
    console.log(`selected ${parseInt(value)}`);
    setqueryTimeSelect(value);
  }, []);
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current > moment().endOf("day");
  };
  const onChangeDay = useCallback((date: any, dataStr: string) => {
    setEndTime(date);
    console.log(date, dataStr);
  }, []);
  return (
    <div className={style.contain}>
      <div className={style.header}>
        <DatePicker
          onChange={onChangeDay}
          // defaultValue={moment()}
          disabledDate={disabledDate}
          value={endTime}
        />

        <Select
          defaultValue="30"
          style={{ width: 120 }}
          onChange={querySelectChange}
          value={queryTimeSelect}
          suffixIcon={<UndoOutlined />}
        >
          {timeSelect2.map((item) => (
            <Option value={item.value} key={item.label}>
              {item.label}
            </Option>
          ))}
        </Select>
      </div>
      <div className={style.content}>
        <ErrorData
          endTime={standardTime2TimeStampEnd((endTime as any)._d)}
        ></ErrorData>
        <FlowData
          endTime={standardTime2TimeStampEnd((endTime as any)._d)}
        ></FlowData>
        <PerformanceData
          endTime={standardTime2TimeStampEnd((endTime as any)._d)}
        ></PerformanceData>
      </div>
    </div>
  );
}
