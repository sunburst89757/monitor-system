import { Layout, Button, Dropdown, Space, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/user";
import style from "./Header.module.scss";
import { useAppSelector } from "../../store/types";
import { useCallback, useRef } from "react";
import { useRequest } from "ahooks";
type propType = {
  isCollapse: Boolean;
  onClick: () => void;
};
export function MyHeader({ isCollapse, onClick }: propType) {
  const { Header } = Layout;
  const navigate = useNavigate();
  const username = useAppSelector((state) => state.user.userInfo.username);
  const { run: handleLogout } = useRequest(logout, {
    manual: true,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const onClickDrop = useCallback(
    (menuInfo: any) => {
      const { key } = menuInfo;
      if (key === "0") {
        console.log("修改密码逻辑");
      } else {
        handleLogout();
      }
    },
    [handleLogout]
  );

  const menu = useRef(
    <Menu
      onClick={onClickDrop}
      items={[
        {
          label: "修改密码",
          key: "0"
        },
        {
          label: "退出登录",
          key: "1"
        }
      ]}
    />
  );
  return (
    <Header className={style.container}>
      <div className={style.leftBlock}>
        {isCollapse ? (
          <MenuUnfoldOutlined
            onClick={onClick}
            className={style.icon}
          ></MenuUnfoldOutlined>
        ) : (
          <MenuFoldOutlined
            onClick={onClick}
            className={style.icon}
          ></MenuFoldOutlined>
        )}
        <h2>XXX管理平台</h2>
      </div>
      <div className={style.rightBlock}>
        <div className={style.informBox}>
          <Button type="primary" block>
            通知详情
          </Button>
        </div>
        <Dropdown
          overlay={menu.current}
          trigger={["click"]}
          arrow
          className={style.font}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space className={style.userInfo}>{username}</Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
}
