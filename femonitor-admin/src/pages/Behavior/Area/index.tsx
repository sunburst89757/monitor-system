import { DatePicker, DatePickerProps, Table, Tooltip } from "antd";
import style from "./area.module.scss";
import moment from "moment";
import { RangePickerProps } from "antd/lib/date-picker";
import { WorldMap } from "./components/worldMap";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
interface DataType {
  id: number;
  index: number;
  city: string;
  users: number;
}
const columns: ColumnsType<DataType> = [
  {
    title: "排名",
    dataIndex: "index",
    key: "index",
    align: "center"
  },
  {
    title: "城市",
    dataIndex: "city",
    key: "city",
    align: "center"
  },
  {
    title: "用户数",
    dataIndex: "users",
    key: "users",
    align: "center"
  }
];
const dataList: DataType[] = [
  {
    id: 1,
    index: 1,
    city: "北京",
    users: 1110
  },
  {
    id: 2,
    index: 2,
    city: "上海",
    users: 1000
  },
  {
    id: 3,
    index: 3,
    city: "上海",
    users: 1000
  },
  {
    id: 4,
    index: 4,
    city: "上海",
    users: 1000
  },
  {
    id: 5,
    index: 5,
    city: "上海",
    users: 1000
  },
  {
    id: 6,
    index: 6,
    city: "上海",
    users: 1000
  },
  {
    id: 6,
    index: 6,
    city: "上海",
    users: 1000
  },
  {
    id: 7,
    index: 7,
    city: "上海",
    users: 1000
  },
  {
    id: 8,
    index: 8,
    city: "上海",
    users: 1000
  },
  {
    id: 9,
    index: 9,
    city: "上海",
    users: 1000
  },
  {
    id: 10,
    index: 9,
    city: "上海",
    users: 1000
  },
  {
    id: 11,
    index: 9,
    city: "上海",
    users: 1000
  },
  {
    id: 12,
    index: 9,
    city: "上海",
    users: 1000
  },
  {
    id: 13,
    index: 9,
    city: "上海",
    users: 1000
  },
  {
    id: 14,
    index: 9,
    city: "上海",
    users: 1000
  }
];
export default function Area() {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(dateString);
  };
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current > moment().endOf("day");
  };
  return (
    <div>
      <div className={style.header}>
        <DatePicker
          onChange={onChange}
          defaultValue={moment()}
          disabledDate={disabledDate}
        />
      </div>
      <div className={style.body}>
        <div className={style.map}>
          <div className={style.mapTitle}>
            用户地域分布图{" "}
            <Tooltip title="城市是根据ip地址查询出来的,并不是每个ip都能查询出结果,查询出来的结果也未必准确,只能作为趋势参考">
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
          <WorldMap id="chinaMap"></WorldMap>
        </div>
        <div className={style.table}>
          <Table
            rowKey={(record) => record.id}
            dataSource={dataList}
            columns={columns}
            pagination={false}
            size="small"
            scroll={{ y: 500 }}
            bordered
            // title={headerBtns}
          />
        </div>
      </div>
    </div>
  );
}
