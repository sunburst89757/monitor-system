import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import style from "./Login.module.scss";
import { userType } from "./types";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useRequest } from "ahooks";
import { login } from "../../api/user";
import { cache } from "../../utils/localStorage";
import { useResetState } from "../../hooks/useResettState";

export function Login() {
  const navigate = useNavigate();
  const { run: handleLogin } = useRequest((params: userType) => login(params), {
    manual: true,
    onSuccess: async (res) => {
      if (res.success) {
        cache.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      console.log(error, "错误信息");
    }
  });
  // 验证通过后登录
  const onFinish = useCallback(
    (val: userType) => {
      handleLogin(val);
    },
    [handleLogin]
  );
  const [form] = Form.useForm<userType>();
  const reset = useResetState();
  useEffect(() => {
    document.title = "登录";
  });
  useEffect(() => {
    // 每次到登录页面都清除所有状态 包括登出 登录过期重定向
    cache.clear();
    reset();
  });
  return (
    <div className={style.loginContainer}>
      <div className={style.title}></div>
      <div className={style.middleBlock}>
        <div className={style.leftBlock}></div>
        <div className={style.rightBlock}>
          <div className={style.formTitle}>用户登录</div>
          <Form
            className={style.form}
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 6, span: 16 }}
            >
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className={style.copyright}>
        Copyright @ 2022 汉谷云智（武汉）科技有限公司
      </div>
    </div>
  );
}
