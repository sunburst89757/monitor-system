import { Layout, Descriptions, Collapse, Button } from "antd";
import React from "react";
import style from "./errorDetail.module.scss";
import { useState } from "react";
import {
  AndroidFilled,
  ChromeFilled,
  WindowsFilled,
  AppleFilled,
  IeOutlined,
  DesktopOutlined,
  UserOutlined,
  CaretRightOutlined
} from "@ant-design/icons";
const { Header, Sider, Content } = Layout;
const { Panel } = Collapse;
export function ErrorDetail() {
  const [mdata, setMdata] = useState(() => {
    return [
      { label: "国家和地区", value: "中国/广东" },
      { label: "URL", value: "http://localhost:8080/" },
      { label: "路由", value: "http://localhost:8080/" },
      {
        label: "User Agent",
        value:
          "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"
      },
      { label: "SDK版本", value: "1.1.12" }
    ];
  });

  const [errorData, setErrorData] = useState(() => {
    return [
      {
        col: 95,
        id: "#12312312",
        row: 1,
        url: "http://localhost:3000/dist/main.js",
        msg: "Uncaught ReferenceError: a is not defined",
        origin: ""
      },
      {
        col: 95,
        id: "#11412312",
        row: 1,
        url: "http://localhost:3000/dist/main.js",
        msg: "Uncaught ReferenceError: a is not defined",
        origin: "1 export default Page2;"
      }
    ];
  });

  return (
    <>
      <Layout className={style.container}>
        <Header className={style.Header}>
          <Descriptions title="Error Info" column={2}>
            <Descriptions.Item label="pageUrl">
              webpack-internal:///./src/modules/jsError/components/OverviewPanel/index.js:287:105
            </Descriptions.Item>
            <Descriptions.Item> </Descriptions.Item>
            <Descriptions.Item label="value">
              error is not defined
            </Descriptions.Item>
            <Descriptions.Item>
              <div className={style.redbox}>
                <div className={style.context}>异常</div>
              </div>
              {/* <div className={style.redbox}>
                <div className={style.context}>SyntaxError</div>
              </div>
              <div className={style.redbox}>
                <div className={style.context}>错误(控制台)</div>
              </div> */}
              <div className={style.bluebox}>
                <div className={style.context}>错误(控制台)</div>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="">
              <div className={style.timeContext}>
                <span className={style.today}>今天</span>
                <span className={style.timedetail}>2022-08-09 17:25:19</span>
              </div>
            </Descriptions.Item>
          </Descriptions>
        </Header>
        <Layout>
          <Content className={style.Content}>
            <div className={style.title}>JS 错误堆栈</div>
            <div className={style.value}>error is not defined</div>
            <Collapse
              bordered={false}
              defaultActiveKey={[errorData[0].id, "堆栈明细"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className={style.Collapse}
            >
              {errorData.map((item) => (
                <Panel
                  header={item.msg + " + 199 ms"}
                  key={item.id}
                  className={style.Panel}
                >
                  <div className={style.errordirection}>
                    <span>【错误定位】：</span>
                    <span className={style.panelrow}>行 / 列：</span>
                    <span>
                      {item.row} / {item.col}
                    </span>
                  </div>
                  <div className={style.errordirection}>
                    <span>【源码解析】：</span>
                    <Button type="primary">解析源码</Button>
                  </div>
                  {item.origin === "" ? null : (
                    <div className={style.errordirection}>
                      <span>【源代码】：</span>
                      <span className={style.origincontext}>{item.origin}</span>
                    </div>
                  )}
                </Panel>
              ))}
              <Panel
                header={" + 199 ms"}
                key="123123asd"
                className={style.Panel}
              >
                <div className={style.errordirection}>
                  <span>【内容】：</span>
                  <span className={style.panelrow}>/api/404</span>
                </div>
                <div className={style.errordirection}>
                  <span>【状态码】：</span>
                  <span className={style.panelrow}>200 - OK</span>
                </div>
              </Panel>
              <Panel header="堆栈明细" key="堆栈明细" className={style.Panel}>
                <div className={style.errordirection}>
                  {
                    "UncaughtInPromiseError: ReferenceError: error is not defined at _callee$ (webpack-internal:///./src/modules/jsError/components/OverviewPanel/index.js:287:105) at tryCatch (webpack-internal:///./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:45:40) at Generator.invoke [as _invoke] (webpack-internal:///./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:271:22) at Generator.prototype.<computed> [as next] (webpack-internal:///./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:97:21) at asyncGeneratorStep (webpack-internal:///./node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:24) at _next (webpack-internal:///./node_modules/@babel/runtime/helpers/asyncToGenerator.js:25:9) at eval (webpack-internal:///./node_modules/@babel/runtime/helpers/asyncToGenerator.js:32:7) at new Promise (<anonymous>) at eval (webpack-internal:///./node_modules/@babel/runtime/helpers/asyncToGenerator.js:21:12) at eval (webpack-internal:///./src/modules/jsError/components/OverviewPanel/index.js:317:25)"
                  }
                </div>
              </Panel>
            </Collapse>
          </Content>
          <Sider className={style.Sider} width="400px">
            <div className={style.borderBox}>
              <div className={style.userTitle}>用户数据</div>
              <div className={style.flexBox}>
                <span className={style.firstCow}>
                  <span>
                    <ChromeFilled className={style.icon} />
                    Chrome
                  </span>
                  100.0.4896.127
                </span>

                <span className={style.secondCow}>
                  {false ? (
                    <span>
                      <AndroidFilled className={style.icon} />
                      Android
                    </span>
                  ) : null}
                  <span>
                    <WindowsFilled className={style.icon} />
                    Windows
                  </span>
                  10
                </span>
              </div>
              <div className={style.flexBox}>
                <span className={style.firstCow}>
                  <span>
                    <DesktopOutlined className={style.icon} />
                    1233 x 923
                  </span>
                  @ 1x
                </span>
                <span className={style.secondCow}>
                  {false ? (
                    <span>
                      <AndroidFilled className={style.icon} />
                      Android
                    </span>
                  ) : null}
                  <span>
                    <UserOutlined className={style.icon} />
                    223.73.16.146
                  </span>
                </span>
              </div>
              <div className={style.line}></div>
              {mdata.map((item) => (
                <div key={item.label} className={style.flexBox}>
                  <span className={style.firstCow}>{item.label}</span>

                  <span className={style.secondCow2}>{item.value}</span>
                </div>
              ))}
            </div>
          </Sider>
        </Layout>
      </Layout>
    </>
  );
}
