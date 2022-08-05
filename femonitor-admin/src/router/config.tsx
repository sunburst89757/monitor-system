import { ReactNode, useEffect, useMemo } from "react";
import { RouteObject } from "react-router-dom";
import { LazyLoad } from "../components/LazyLoad";
import { Redirect } from "../components/Redirect";
import MyLayout from "../Layout";
import { Login } from "../pages/Login";
import { useAppSelector } from "../store/types";
import { cache } from "../utils/localStorage";

type interceptOBj = {
  children: ReactNode;
  role?: string[];
  title: string;
};
/* 
  配置说明
  菜单路由：siderRoutes：根据用户角色生成对应的菜单
  meta.role配置角色，没有这个属性的路由，表明全部都有这个菜单
  用户的role是super-admin的拥有全部路由的访问权限
  meta.role = ["admin","editor"]：表明admin editor super-admin拥有这三个菜单的访问权限
  meta.role配置的是菜单显示的路由，系统的权限路由依靠路由拦截器实现
  */
//  菜单路由
export const siderRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MyLayout></MyLayout>,
    meta: {
      title: "布局"
    },
    children: [
      {
        path: "dashboard",
        element: <LazyLoad path="Dashboard"></LazyLoad>,
        meta: {
          title: "概览"
        }
      }
    ]
  },
  {
    path: "/error",
    element: <MyLayout></MyLayout>,
    meta: {
      title: "错误监控"
    },
    children: [
      {
        path: "js-err",
        element: <LazyLoad path="Error/JsErr"></LazyLoad>,
        meta: {
          title: "js错误"
        }
      },
      {
        path: "request-err",
        element: <LazyLoad path="Error/RequestErr"></LazyLoad>,
        meta: {
          title: "请求错误"
        }
      },
      {
        path: "resource-err",
        element: <LazyLoad path="Error/ResourceErr"></LazyLoad>,
        meta: {
          title: "资源加载错误"
        }
      }
    ]
  },
  {
    path: "/performance",
    element: <MyLayout></MyLayout>,
    meta: {
      title: "性能监控"
    },
    children: [
      {
        path: "network",
        element: <LazyLoad path="Performance/Network"></LazyLoad>,
        meta: {
          title: "网络性能"
        }
      },
      {
        path: "page",
        element: <LazyLoad path="Performance/Page"></LazyLoad>,
        meta: {
          title: "页面性能"
        }
      }
    ]
  },
  {
    path: "/behavior",
    element: <MyLayout></MyLayout>,
    meta: {
      title: "行为监测"
    },
    children: [
      {
        path: "visit",
        element: <LazyLoad path="Behavior/Visit"></LazyLoad>,
        meta: {
          title: "访问数据"
        }
      },
      {
        path: "pageBehavior",
        element: <LazyLoad path="Behavior/Page"></LazyLoad>,
        meta: {
          title: "页面行为"
        }
      }
    ]
  },
  // 外部链接跳转github，这里的配置没什么意义
  {
    path: "/abc",
    element: <Redirect to="/404"></Redirect>,
    meta: {
      title: "Github"
    }
  }
];
const myRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login></Login>,
    meta: {
      title: "登录"
    }
  },
  {
    path: "/404",
    element: <LazyLoad path="NotFound"></LazyLoad>,
    meta: {
      title: "404"
    }
  },
  {
    path: "*",
    element: <Redirect to="/404"></Redirect>,
    meta: {
      title: "404"
    }
  },
  ...siderRoutes
];
// 一级路由不需要鉴权
const isInterceptRoute = (route: RouteObject): boolean => {
  if (
    route.children ||
    route.meta.title === "登录" ||
    route.meta.title === "404"
  ) {
    return false;
  }
  return true;
};
// 根据路由配置生成react router dom需要的路由结构
const generateRouter = (routes: RouteObject[]) => {
  return routes.map((route) => {
    if (route.children) {
      route.children = generateRouter(route.children);
    }
    // 路由拦截器 登录和授权页面不需要鉴权
    if (isInterceptRoute(route)) {
      route.element = (
        <RouterBeforeEach role={route.meta.role} title={route.meta.title}>
          {route.element}
        </RouterBeforeEach>
      );
    }
    return route;
  });
};
// 路由拦截器组件
const RouterBeforeEach = ({ children, role, title }: interceptOBj) => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  // 验证是否登录（刷新）
  const authLogin = useMemo(() => {
    const token = cache.getItem("token");
    if (!token) {
      return false;
      // } else {
      //   if (!userInfo.role) {
      //     // 说明没有获取用户的角色，第一次登录需要获取用户信息
      //     dispatch(getUserInfoAction());
      //   }
    }
    // 不用考虑刷新，因为role已经数据持久化了刷新不会丢失
    return true;
  }, []);
  // 验证权限路由
  const authRoute = useMemo(() => {
    if (!role || userInfo.role === "super-admin") {
      return true;
    }
    return role.includes(userInfo.role);
  }, [role, userInfo.role]);
  useEffect(() => {
    document.title = title;
  });
  return (
    <div>
      {authLogin ? (
        authRoute ? (
          children
        ) : (
          <Redirect to="/404"></Redirect>
        )
      ) : (
        <Redirect to="/login"></Redirect>
      )}
    </div>
  );
};

export const myRouter = generateRouter(myRoutes);
