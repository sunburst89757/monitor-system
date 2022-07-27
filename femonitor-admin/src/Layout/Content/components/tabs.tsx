import { Tabs } from "antd";
import {
  useLocation,
  useNavigate,
  matchRoutes,
  RouteObject
} from "react-router-dom";
import { useUpdateEffect } from "ahooks";
import {
  changeTab,
  removeTab,
  changeTabActive,
  tabObject
} from "../../../store/module/tabs";
import { useAppDispatch, useAppSelector } from "../../../store/types";
import { useCallback, useEffect } from "react";
import { matchRoute } from "../../../utils/matchRoute";
import { cache } from "../../../utils/localStorage";
const { TabPane } = Tabs;
// 判断新生成的tab是否在已有的tabs内部
export function MyTabs() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const routes = useAppSelector((state) => state.permission.routes);
  const tabs = useAppSelector((state) => state.tabs.tabs);
  const tabActive = useAppSelector((state) => state.tabs.activeTab);
  const onTabClick = useCallback(
    (activeKey: string) => {
      dispatch(changeTabActive(activeKey));
      navigate(activeKey);
    },
    [dispatch, navigate]
  );
  const onDelete = useCallback(
    (targetKey: any, action: any) => {
      console.log(targetKey);
      dispatch(removeTab(targetKey));
      // tabActive有问题，dispatch更新后的最新的tabActive并不能在这里使用navigate跳转
    },
    [dispatch]
  );
  // 监视删除的时候使用
  useUpdateEffect(() => {
    navigate(tabActive);
  }, [tabActive]);
  // 注释掉这个useEffect可以解决直接关闭页面，等token过期后访问这个页面报错
  useEffect(() => {
    let newTab: tabObject = {
      title: "",
      key: ""
    };
    if (routes.length > 2) {
      // 没有刷新 正常路由跳转逻辑
      const matchRoute = matchRoutes(routes, location.pathname)!;
      newTab.key = location.pathname;
      newTab.title = matchRoute[matchRoute.length - 1].route.meta!.title;
    } else {
      console.log("退出登录2", location.pathname);
      // 刷新routes会丢失，所以从缓存里读取，但是缓存读取的路由并不能通过matchroutes获取 原因未知
      if (location.pathname === "/dashboard") {
        // 异常处理 第一次登录的时候 缓存里没有menuRoutes
        newTab.key = "/dashboard";
        newTab.title = "首页";
      } else {
        newTab = matchRoute(
          cache.getItem("menuRoutes") as RouteObject[],
          location.pathname
        );
      }
    }
    // 解决直接关闭页面后，重新打开页面，生成一个/路径 ----对应的tab
    if (newTab.title === "布局") {
      // 有redux的数据持久化，因此直接找到离开前激活的页面进行跳转即可
      navigate(tabActive);
    } else {
      dispatch(changeTab(newTab));
    }
  }, [location.pathname, dispatch, navigate, routes]);
  return (
    <Tabs
      type="editable-card"
      activeKey={tabActive}
      defaultActiveKey={"/dashboard"}
      hideAdd
      onTabClick={onTabClick}
      onEdit={onDelete}
    >
      {tabs.map((pane) => (
        <TabPane tab={pane.title} key={pane.key}></TabPane>
      ))}
    </Tabs>
  );
}
