import { Layout, Menu, MenuProps } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { RouteObject, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MenuInfo } from "rc-menu/lib/interface";
type MenuItem = Required<MenuProps>["items"][number];
// antd根据配置生成的菜单项
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}
const routeCallBack = (routes: RouteObject[]): MenuProps["items"] => {
  return routes.map((route) => {
    // 不是菜单栏直接隐藏
    if (route.meta?.hidden) {
      return null;
    } else {
      if (route.children && route.children.length > 0) {
        // 首页的特殊处理
        if (route.path === "/") {
          return getItem(
            route.children[0].meta?.title,
            route.children[0].path!,
            <AppstoreOutlined></AppstoreOutlined>
          );
        }
        return getItem(
          route.meta?.title,
          route.path!,
          <AppstoreOutlined></AppstoreOutlined>,
          routeCallBack(route.children)
        );
      } else {
        return getItem(
          route.meta?.title,
          route.path!,
          <AppstoreOutlined></AppstoreOutlined>
        );
      }
    }
  });
};
// 根据路由生成菜单
const generateMenuItem = (routes: RouteObject[]) => {
  return routeCallBack(routes);
};
// 生成一级菜单的key用于展开父级菜单
function generateRootSubmenuKeys(routes: RouteObject[]): string[] {
  const res: string[] = [];
  routes.forEach((route) => {
    res.push(route.path!);
  });
  return res;
}
export function MySider({ isCollapse }: { isCollapse: boolean }) {
  const { Sider } = Layout;
  const location = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<any[]>([]);
  const menuActive = useAppSelector((state) => state.tabs.menuActive);
  const routes = useAppSelector((state) => state.permission.routes);
  const rootSubmenuKeys = useMemo(
    () => generateRootSubmenuKeys(routes),
    [routes]
  );
  // 多级菜单点击箭头展开的回调
  const onOpenChange: MenuProps["onOpenChange"] = useCallback(
    (keys: string[]) => {
      console.log("查看keys", keys);
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
      if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    },
    [openKeys, rootSubmenuKeys]
  );
  // 点击菜单项
  const onClick: MenuProps["onClick"] = useCallback(
    (e: MenuInfo) => {
      // keypath数组控制菜单选中谁
      console.log(e, "candan");
      let path = e.keyPath.reverse().join("/");
      path === "dashboard" ? (path = "/dashboard") : (path = path);
      // abc这个是跳转外链的，不需要生成tab
      if (path !== "/abc") {
        navigate(path);
      } else {
        // 外链跳转不可以使用navigate
        window.location.href =
          "https://github.com/sunburst89757/react-ts-admin";
      }
    },
    [navigate]
  );
  const menuItems = useMemo(() => generateMenuItem(routes), [routes]);
  useEffect(() => {
    setOpenKeys(["/" + location.pathname.split("/")[1]!]);
  }, [location.pathname]);
  return (
    <Sider trigger={null} collapsible collapsed={isCollapse}>
      <Menu
        onClick={onClick}
        style={{ width: "100%", height: "100%" }}
        defaultSelectedKeys={["dashboard"]}
        selectedKeys={menuActive}
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        // 根据用户可以访问的路由生成显示的菜单结构
        items={menuItems}
        theme="dark"
      />
    </Sider>
  );
}
