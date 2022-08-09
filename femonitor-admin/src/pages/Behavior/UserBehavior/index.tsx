import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useCallback, useRef, useState } from "react";
import { dataList } from "./config";
export type DataType = {
  id: number;
  userId: string;
  userTag: string;
  page: string;
  device: string;
  ip: string;
  location: string;
  occurrenceTime: string;
};
export default function UserBehavior() {
  const [form] = Form.useForm();
  const [userList, setUserList] = useState<DataType[]>(dataList);
  const columns = useRef<ColumnsType<DataType>>([
    {
      title: "用户id",
      dataIndex: "userId",
      key: "userId",
      align: "center"
    },
    {
      title: "用户tag",
      dataIndex: "userTag",
      key: "userTag",
      align: "center",
      render: (_, text) => <Tag>{text.userTag}</Tag>
    },
    {
      title: "页面",
      dataIndex: "page",
      key: "page",
      align: "center"
    },
    {
      title: "设备平台",
      dataIndex: "device",
      key: "device",
      align: "center"
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
              handleSearchUser(record.id);
            }}
          >
            用户细查
          </a>
        </Space>
      )
    }
  ]);
  const handleSearchUser = useCallback((id: number) => {
    console.log(id);
  }, []);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const handleReset = useCallback(() => {
    form.resetFields();
  }, [form]);
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
        pagination={false}
        bordered
      />
    </div>
  );
}
