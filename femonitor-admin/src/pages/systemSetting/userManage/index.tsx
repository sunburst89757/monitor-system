import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useCallback, useRef, useState } from "react";
import { deleteUser } from "../../../api/systemSetting/userManage";
import { BasePage } from "../../../base-ui/BasePage";
import { MyModalForm } from "../../../base-ui/MyModalForm";
import { useGetDataList } from "../../../hooks/useGetDataList";
import {
  formItemConfig,
  IQueryForm,
  IUserList,
  ModalFormItems
} from "./config";
export default function UserManage() {
  const { basePageConfig, getDataList } = useGetDataList(
    formItemConfig,
    "/sys/user/listUser"
  );
  const columns = useRef<ColumnsType<IUserList>>([
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
      align: "center"
    },
    {
      title: "昵称",
      dataIndex: "nickname",
      key: "nickname",
      align: "center"
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      align: "center"
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
      align: "center"
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, { status }) => (
        <>
          {status ? (
            <Tag color="error">离线</Tag>
          ) : (
            <Tag color="success">在线</Tag>
          )}
        </>
      )
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      align: "center"
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Button
            danger
            type="text"
            onClick={() => {
              handleDelete(record.id);
            }}
          >
            删除
          </Button>
          <Button
            type="link"
            onClick={() => {
              handleEdit(record);
            }}
          >
            修改
          </Button>
        </Space>
      )
    }
  ]);
  const [isAdd, setisAdd] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  // 选中用户的信息
  const currentUserInfo = useRef<IUserList>();
  const handleDelete = useCallback(
    (userId: number) => {
      deleteUser(userId).then((res) => {
        if (res.success) {
          getDataList();
        }
      });
    },
    [getDataList]
  );
  const handleEdit = useCallback((userInfo: IUserList) => {
    setisUpdate(true);
    currentUserInfo.current = userInfo;
  }, []);
  return (
    <div>
      <BasePage<IQueryForm, IUserList>
        columns={columns.current}
        headerBtns={() => (
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setisAdd(true);
              }}
            >
              添加用户
            </Button>
          </Space>
        )}
        {...basePageConfig}
      ></BasePage>
      <MyModalForm<IUserList>
        type="add"
        title="添加用户"
        url="/sys/user/addOneUser"
        visible={isAdd}
        handleOk={() => {
          setisAdd(false);
          getDataList();
        }}
        handleCancel={() => {
          setisAdd(false);
        }}
        formItems={ModalFormItems}
      ></MyModalForm>
      <MyModalForm<IUserList>
        type="update"
        title="修改用户信息"
        url="/sys/user/updateOneUser"
        visible={isUpdate}
        handleOk={() => {
          setisUpdate(false);
          getDataList();
        }}
        handleCancel={() => {
          setisUpdate(false);
        }}
        formItems={ModalFormItems}
        formInfo={currentUserInfo.current}
      ></MyModalForm>
    </div>
  );
}
