import { Button, Result } from "antd";
import { useEffect } from "react";
import { getUserMenuList, getUserMenuPerms } from "../../api/permission";
import { getUserInfo } from "../../api/user";
import {
  generateRouterForBackEnd,
  generateRouterForReactRouter
} from "../../router/config";
import { addRoutes, updateEndPermission } from "../../store/module/permission";
import { updateUserInfo } from "../../store/module/user";
import { useAppDispatch, useAppSelector } from "../../store/types";

export default function NotFound() {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.userInfo.username);
  useEffect(() => {
    document.title = "not found";
  });
  useEffect(() => {
    if (!username) {
      // 说明没有获取用户的角色，第一次登录需要获取用户信息 获取菜单和权限 | 或者说是刷新导致的
      getUserInfo().then((res) => {
        dispatch(updateUserInfo(res.data));
      });
      getUserMenuList().then((res) => {
        // 后端生成需要的路由结构
        const accessibleRoutes = generateRouterForBackEnd(res.data);
        // 生成react router需要的路由结构
        const routes = generateRouterForReactRouter(accessibleRoutes);
        dispatch(addRoutes(routes));
      });
      getUserMenuPerms().then((res) => {
        dispatch(updateEndPermission(res.data));
      });
      window.history.go(-1);
    }
  });
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，您访问的页面不存在"
      extra={<Button type="primary">返回</Button>}
    />
  );
}
