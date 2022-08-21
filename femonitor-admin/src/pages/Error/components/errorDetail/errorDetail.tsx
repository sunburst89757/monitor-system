import { Layout, Descriptions, Collapse, Button } from "antd";
import React from "react";
import style from "./errorDetail.module.scss";
import { useState } from "react";
import { JsErrorShowItem } from "../../JsErr/types";
import { timeStamp2date } from "../../../../utils/handleTime";
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
export function ErrorDetail({ data }: any) {
  const [mdata, setMdata] = useState(() => {
    return [
      { label: "国家和地区", value: "中国/广东" },
      { label: "URL", value: "http://localhost:9528/#/error/error" },
      { label: "路由", value: "http://localhost:9528/#/error/error" },
      {
        label: "User Agent",
        value:
          "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"
      },
      { label: "SDK版本", value: "2.1.3" }
    ];
  });

  const getValue = function (): string {
    let str = "";
    if (data.msg) return data.msg;
    if (data.info) return data.info;
    if (data.error) return data.error;

    return str;
  };

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

  const getContext = function (): string {
    let str = "异常";
    if (data.info) return data.info;
    if (data.reason !== undefined) return "Promise";
    if (data.msg) return data.error.split(":")[0];
    if (data.error) return "控制台异常";
    return str;
  };

  const getContext2 = function (): string {
    let str = "异常";
    if (data.info) return "Vue";
    if (data.reason !== undefined) return "Promise";
    if (data.msg) return "Js";
    if (data.error) return "Console";
    return str;
  };

  const getErrorValue = function (): string {
    let str = "异常";
    if (data.info) return data.info;
    if (data.reason !== undefined) return "Uncaught (in promise)";
    if (data.msg) return data.error.split(":")[0];
    if (data.error) return data.error.split('"')[1];
    return str;
  };

  const getErrorStack = function (): string {
    if (data.reason !== undefined) return data.reason;
    return data.error;
  };

  const getErrorReason = function (): string {
    if (data.reason !== undefined) return "Uncaught (in promise)";
    return data.error.split("at")[0];
  };

  return (
    <>
      <Layout className={style.container}>
        <Header className={style.Header}>
          <Descriptions title="Error Info" column={1}>
            <Descriptions.Item label="pageUrl">
              {/* webpack-internal:///./src/modules/jsError/components/OverviewPanel/index.js:287:105 */}
              {data.pageURL}
            </Descriptions.Item>
            {/* <Descriptions.Item> </Descriptions.Item> */}
            <Descriptions.Item label="value">{getValue()}</Descriptions.Item>
            <Descriptions.Item>
              <div className={style.redbox}>
                <div className={style.context}>{getContext() + "</>"}</div>
              </div>
              {/* <div className={style.redbox}>
                <div className={style.context}>SyntaxError</div>
              </div>
              <div className={style.redbox}>
                <div className={style.context}>错误(控制台)</div>
              </div> */}
              <div className={style.bluebox}>
                <div className={style.context}>{getContext2()}</div>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="">
              <div className={style.timeContext}>
                {/* <span className={style.today}>今天</span> */}
                <span className={style.timedetail}>
                  {timeStamp2date(data.createdAt)}
                </span>
              </div>
            </Descriptions.Item>
          </Descriptions>
        </Header>
        <Layout>
          <Content className={style.Content}>
            <div className={style.title}>错误堆栈</div>
            <div className={style.value}>{getErrorValue()}</div>
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
                  header={getErrorReason()}
                  key={item.id}
                  className={style.Panel}
                >
                  <div className={style.errordirection}>
                    <span>【错误定位】：</span>
                    <span className={style.panelrow}>行 / 列：</span>
                    <span>
                      {data.line} / {data.column}
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
              {/* <Panel
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
              </Panel> */}
              <Panel header="堆栈明细" key="堆栈明细" className={style.Panel}>
                <div className={style.errordirection}>{getErrorStack()}</div>
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
                  {/* 100.0.4896.127 */}
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
                    1920 x 1080
                  </span>
                  {/* @ 1x */}
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
                    {data.ip}
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
