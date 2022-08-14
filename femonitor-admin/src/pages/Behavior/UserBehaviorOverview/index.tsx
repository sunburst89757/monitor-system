import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconFont } from "../../../components/IconFont";
import { dataList } from "./config";
export type IUserInfo1 = {
  id: number;
  userId: string;
  pageUrl: string;
  device: string;
  ip: string;
  location: string;
  occurrenceTime: string;
};
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
export default function UserBehaviorOverView() {
  const [form] = Form.useForm();
  const [userList, setUserList] = useState<IUserInfo1[]>(dataList);
  const [pageInformation, setPageInformation] = useState({
    page: 1,
    pageSize: 10
  });
  const columns = useRef<ColumnsType<IUserInfo1>>([
    {
      title: "用户id",
      dataIndex: "userId",
      key: "userId",
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
      dataIndex: "device",
      key: "device",
      align: "center",
      render: (_, text) => confirmIcon(text.device)
    },
    {
      title: "用户ip地址",
      dataIndex: "ip",
      key: "ip",
      align: "center"
    },
    {
      title: "位置",
      dataIndex: "location",
      key: "location",
      align: "center"
    },
    {
      title: "发生时间",
      dataIndex: "occurrenceTime",
      key: "occurrenceTime",
      align: "center"
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
  const handleSearchUser = useCallback((userInfo: IUserInfo1) => {
    navigate(
      { pathname: "/behavior/behaviorDetail" },
      {
        state: {
          userInfo
        }
      }
    );
    // console.log(id);
  }, []);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const handleReset = useCallback(() => {
    form.resetFields();
  }, [form]);
  const onChange = useCallback((pageNumber: number, pageSize: number) => {
    console.log(pageNumber, "页码", pageSize);
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
            <Form.Item label="关键字" name="keyword">
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
        rowKey={(record) => record.id}
        dataSource={userList}
        columns={columns.current}
        pagination={{
          position: ["bottomRight"],
          showQuickJumper: true,
          defaultCurrent: 1,
          total: 20,
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
