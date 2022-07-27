import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { IFormItemConfig } from "../../../base-ui/MyForm";
export interface IRoleList {
  id: number;
  name: string;
  nickname: string;
  status: number;
  createTime: string;
  updateTime: string;
  deleted: number;
}
export type IQueryForm = {
  name: string;
  nickname: string;
};
export const formItemConfig: IFormItemConfig[] = [
  {
    type: "Input",
    label: "角色",
    name: "name",
    config: {
      placeholder: "请输入角色",
      allowClear: true
    }
  },
  {
    type: "Input",
    label: "昵称",
    name: "nickname",
    config: {
      placeholder: "请输入昵称",
      allowClear: true
    }
  }
];
export const columns: ColumnsType<IRoleList> = [
  {
    title: "昵称",
    dataIndex: "nickname",
    key: "nickname",
    align: "center"
  },
  {
    title: "角色",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (text) => <a>{text}</a>
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
          // onClick={() => {
          //   handleDelete(record.id);
          // }}
        >
          删除
        </Button>
        <Button
          type="link"
          // onClick={() => {
          //   setisUpdate(true);
          //   handleEdit(record);
          // }}
        >
          修改
        </Button>
      </Space>
    )
  }
];
