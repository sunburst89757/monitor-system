import { Button, Col, Form, Input, Modal, Row, Space } from "antd";
import { useCallback, useEffect } from "react";
import { addUser, updateUser } from "../../../../api/systemSetting/userManage";
import { IUserList } from "../config";
export function UserModal({
  type,
  visible,
  handleOk,
  handleCancel,
  userInfo
}: {
  type: string;
  visible: boolean;
  userInfo?: IUserList;
  handleOk: () => any;
  handleCancel: () => any;
}) {
  const [form] = Form.useForm<IUserList>();
  const onFinish = useCallback(() => {
    if (type === "add") {
      addUser(form.getFieldsValue()).then((res) => {
        if (res.success) {
          handleOk();
        }
      });
    } else {
      updateUser({ ...form.getFieldsValue(), id: userInfo?.id! }).then(
        (res) => {
          if (res.success) {
            handleOk();
          }
        }
      );
    }
  }, [form, handleOk, type, userInfo?.id]);
  useEffect(() => {
    // 消除警告提示 useEffect里使用form方法必须在组件挂载后实施
    if (visible) {
      form.setFieldsValue({ ...userInfo });
    }
  }, [visible]);
  return (
    <>
      <Modal
        title={type === "add" ? "新增用户" : "修改用户信息"}
        visible={visible}
        width={1000}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          labelAlign="right"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="用户名" name="username">
                <Input allowClear placeholder="请输入用户名" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="电话" name="phone">
                <Input allowClear placeholder="请输入电话" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[{ type: "email", required: true }]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="昵称" name="nickname">
                <Input allowClear placeholder="请输入昵称" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="密码" name="password">
                <Input allowClear placeholder="请输入密码" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="性别" name="sex">
                <Input allowClear placeholder="请输入性别" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="头像" name="avatar">
                <Input allowClear placeholder="请输入头像url" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4} offset={20}>
              <Space>
                <Button onClick={handleCancel}>取消</Button>
                <Button htmlType="submit" type="primary">
                  确定
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
