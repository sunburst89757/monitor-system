import { Col, Form, Input, Row } from "antd";

export default function UserBehavior() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={6}>
          <Col span={8}>
            <Form.Item label="关键信息" name="keyword">
              <Input placeholder="请输入UserId,精确搜索用户行为" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
