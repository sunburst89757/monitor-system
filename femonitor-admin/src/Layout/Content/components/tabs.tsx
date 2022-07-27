import { Tabs } from "antd";
import { useLocation, useNavigate, matchRoutes } from "react-router-dom";
import { useUpdateEffect } from "ahooks";
import { siderRoutes } from "../../../router/config";
import {
  changeTab,
  removeTab,
  changeTabActive,
  tabObject
} from "../../../store/module/tabs";
import { useAppDispatch, useAppSelector } from "../../../store/types";
import { useCallback, useEffect } from "react";
const { TabPane } = Tabs;
// 判断新生成的tab是否在已有的tabs内部
export function MyTabs() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
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
    const matchRoute = matchRoutes(siderRoutes, location.pathname)!;
    const newTab: tabObject = {
      key: matchRoute[matchRoute.length - 1].pathname,
      title: matchRoute[matchRoute.length - 1].route.meta!.title
    };
    // 解决直接关闭页面后，重新打开页面，生成一个/路径 ----对应的tab
    if (newTab.title === "布局") {
      // 有redux的数据持久化，因此直接找到离开前激活的页面进行跳转即可
      navigate(tabActive);
    } else {
      dispatch(changeTab(newTab));
    }
  }, [location.pathname, dispatch, navigate]);
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
