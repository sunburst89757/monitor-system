// import { PageTransition } from "@steveeeie/react-page-transition";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { BaseLayout } from "../../components/BaseLayout";
import { ReLoginModal } from "../../components/ReLoginModal";
import { MyTabs } from "./components/tabs";
import style from "./Content.module.scss";
export function MyContent() {
  const { Content } = Layout;
  // const location = useLocation();
  return (
    <Content className={style.container}>
      <MyTabs></MyTabs>
      <ReLoginModal></ReLoginModal>
      {/* <PageTransition
        preset="moveToLeftFromRight"
        transitionKey={location.pathname}
        enterAnimation="moveFromLeft"
        exitAnimation="moveToRight"
      > */}
      <BaseLayout>
        <Outlet></Outlet>
      </BaseLayout>
      {/* </PageTransition> */}
    </Content>
  );
}
