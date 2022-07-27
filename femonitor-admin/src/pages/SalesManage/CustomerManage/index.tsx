import { Button, Form, Input } from "antd";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
import { useCallback } from "react";
export default function CustomerManage() {
  const [form] = Form.useForm();
  const onReset = useCallback(() => {
    form.resetFields();
  }, [form]);
  const onFinish = useCallback((values: any) => {
    console.log(values, "触发");
  }, []);
  return (
    <div className={style.container}>
      <Form
        name="basic"
        labelAlign="right"
        autoComplete="off"
        layout="inline"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label="顾客姓名" name="customerName">
          <Input placeholder="请输入顾客姓名"></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
            搜索
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            icon={<RedoOutlined />}
            htmlType="button"
            onClick={onReset}
          >
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
