import { RouteObject } from "react-router-dom";
import { tabObject } from "../store/module/tabs";

export const matchRoute = (routes: RouteObject[], route: string): tabObject => {
  //   route只能是 /dashboard 或者 /systemSetting/userManage 以及系统刚启动时进入/(缓存未清)
  const routeArr = route.split("/");
  let title: string = "";
  console.log(routeArr);
  console.log(routes);
  if (routeArr.length === 2) {
    // 只能是一级路由 一定是 / 作为一级路由 dashboard作为二级路由
    if (routeArr[1] === "") {
      // 特例： 上一次进入系统未退出登录 缓存还在，直接进入 / ---> routeArr = ["",""]避免tab报错
      window.location.href = "/dashboard";
    } else {
      const childRoute = routes.find((route) => route.path === "/")!;
      const element = childRoute.children?.find(
        (route) => route.path === routeArr[1]
      );
      title = element!.meta.title;
    }
  } else {
    //    二级路由  /systemSetting/userManage
    const childRoute = routes.find((route) => route.path === "/" + routeArr[1]);
    const element = childRoute?.children?.find(
      (route) => route.path === routeArr[2]
    );
    title = element!.meta.title;
  }
  return {
    key: route,
    title
  };
};
