import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseUa } from "../../../utils/parseUa";
import { getUserBehaviorList } from "../../../api/behavior";
import { dataList } from "./config";
import { IQueryUserBehavior, IUserBehaviorList } from "./types";
import { timeStamp2date } from "../../../utils/handleTime";
import { ua2icon } from "../../../utils/ua2icon";
import { nanoid } from "nanoid";

export default function UserBehaviorOverView() {
  const query = useRef<IQueryUserBehavior>({
    pageNum: 1,
    pageSize: 10,
    startTime: 1660669176053,
    endTime: Date.now()
  });
  const [form] = Form.useForm();
  const [userList, setUserList] = useState<IUserBehaviorList[]>(dataList);
  const [pageInformation, setPageInformation] = useState({
    pageNum: 1,
    pageSize: 10
  });
  const [total, setTotal] = useState(10);
  const columns = useRef<ColumnsType<IUserBehaviorList>>([
    {
      title: "用户id",
      dataIndex: "userID",
      key: "userID",
      align: "center"
    },
    {
      title: "页面",
      dataIndex: "pageUrl",
      key: "pageUrl",
      align: "center"
    },
    {
      title: "设备平台",
      dataIndex: "ua",
      key: "ua",
      align: "center",
      render: (_, text) => ua2icon(parseUa(text.ua))
    },
    {
      title: "用户ip地址",
      dataIndex: "ip",
      key: "ip",
      align: "center"
    },
    {
      title: "位置",
      dataIndex: "city",
      key: "city",
      align: "center"
    },
    {
      title: "发生时间",
      dataIndex: "time",
      key: "time",
      align: "center",
      render: (value, record) => timeStamp2date(record.time)
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              handleSearchUser(record);
            }}
          >
            用户细查
          </a>
        </Space>
      )
    }
  ]);
  const navigate = useNavigate();
  const getDataList = useCallback(() => {
    getUserBehaviorList(query.current).then((res) => {
      setUserList(res.data.result);
      setPageInformation({
        pageNum: res.data.pageNum,
        pageSize: res.data.pageSize
      });
      setTotal(res.data.num);
    });
  }, []);
  const handleSearchUser = useCallback(
    (userInfo: IUserBehaviorList) => {
      navigate(
        { pathname: "/behavior/behaviorDetail" },
        {
          state: {
            userInfo
          }
        }
      );
      // console.log(id);
    },
    [navigate]
  );
  const onFinish = (values: { userId: string }) => {
    query.current.uesrId = values.userId;
    getDataList();
  };
  const handleReset = useCallback(() => {
    form.resetFields();
    query.current.uesrId = "";
    getDataList();
  }, [form, getDataList]);
  const onChange = useCallback(
    (pageNumber: number, pageSize: number) => {
      query.current.pageNum = pageNumber;
      query.current.pageSize = pageSize;
      setPageInformation({
        pageNum: pageNumber,
        pageSize: pageSize
      });
      getDataList();
    },
    [getDataList]
  );

  useEffect(() => {
    getDataList();
  }, []);
  return (
    <div>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 5 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="关键字" name="userId">
              <Input placeholder="请输入UserId,精确搜索用户行为" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                >
                  查询
                </Button>
                <Button
                  type="primary"
                  icon={<UndoOutlined />}
                  onClick={handleReset}
                >
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        rowKey={nanoid()}
        dataSource={userList}
        columns={columns.current}
        pagination={{
          position: ["bottomRight"],
          showQuickJumper: true,
          defaultCurrent: 1,
          total: total,
          onChange: onChange,
          pageSize: pageInformation.pageSize,
          pageSizeOptions: [10, 20],
          showSizeChanger: true,
          showTotal: (total) => `总计${total}`
        }}
        bordered
      />
    </div>
  );
}
