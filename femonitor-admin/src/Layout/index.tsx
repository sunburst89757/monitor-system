import { Layout } from "antd";
import { MySider } from "./Sider/Sider";
import { MyHeader } from "./Header/Header";
import { MyContent } from "./Content/Content";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/types";
import { getUserInfo } from "../api/user";
import { updateUserInfo } from "../store/module/user";
import { getUserMenuList, getUserMenuPerms } from "../api/permission";
import { useAsyncEffect } from "ahooks";
import {
  generateAccessRoutes,
  generateRouterForBackEnd
} from "../router/config";
import { cache } from "../utils/localStorage";
import {
  addRoutes,
  updateAccessRoutes,
  updateEndPermission
} from "../store/module/permission";
export default function MyLayout() {
  const [isCollapse, setisCollapse] = useState(false);
  const dispatch = useAppDispatch();
  const accessRoutes = useAppSelector((state) => state.permission.accessRoutes);
  const toggle = useCallback(() => {
    setisCollapse(!isCollapse);
  }, [isCollapse]);
  // 首次渲染执行  刷新时重新获取
  useAsyncEffect(async () => {
    if (accessRoutes.length === 0) {
      const { data: userInfo } = await getUserInfo();
      dispatch(updateUserInfo(userInfo));
      const { data: menuRoutes } = await getUserMenuList();
      const realMenuRoutes = generateAccessRoutes(menuRoutes);
      const siderRoutes = generateRouterForBackEnd(menuRoutes);
      cache.setItem("accessRoutes", realMenuRoutes);
      const { data: permission } = await getUserMenuPerms();
      // 生成菜单路由
      dispatch(addRoutes(siderRoutes));
      // 生成权限
      dispatch(updateEndPermission(permission));
      // 生成可以访问的路由结构
      dispatch(updateAccessRoutes(realMenuRoutes));
    }
  }, []);
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
