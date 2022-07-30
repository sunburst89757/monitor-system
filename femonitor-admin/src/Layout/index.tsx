import { Layout } from "antd";
import { MySider } from "./Sider/Sider";
import { MyHeader } from "./Header/Header";
import { MyContent } from "./Content/Content";
import { useState } from "react";
export default function MyLayout() {
  const [isCollapse, setisCollapse] = useState(false);
  const toggle = () => {
    setisCollapse(!isCollapse);
  };
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <MyHeader isCollapse={isCollapse} onClick={toggle}></MyHeader>
        <Layout style={{ height: "100%" }}>
          <MySider isCollapse={isCollapse}></MySider>
          <MyContent></MyContent>
        </Layout>
      </Layout>
    </>
  );
}
