import { IFormItemConfig } from "../../../base-ui/MyForm";
export interface IUserList {
  id: number;
  username: string;
  password: string;
  nickname: string;
  userType: number;
  email: string;
  phone: string;
  sex: number;
  avatar: string;
  status: number;
  remark?: any;
  createTime: string;
  updateTime: string;
  deleted: number;
}
export type IQueryForm = {
  name: string;
  nickName: string;
  email: string;
  phone: string;
};
export const formItemConfig: IFormItemConfig[] = [
  {
    type: "Input",
    label: "用户名",
    name: "username",
    config: {
      placeholder: "请输入用户名",
      allowClear: true
    }
  },
  {
    type: "Input",
    label: "昵称",
    name: "nickName",
    config: {
      placeholder: "请输入昵称",
      allowClear: true
    }
  },
  {
    type: "Input",
    label: "邮箱",
    name: "email",
    config: {
      placeholder: "请输入邮箱",
      allowClear: true
    }
  },
  {
    type: "Input",
    label: "电话",
    name: "phone",
    config: {
      placeholder: "请输入电话",
      allowClear: true
    }
  }
];
export const ModalFormItems: IFormItemConfig[] = [
  {
    label: "用户名",
    name: "username",
    type: "Input",
    config: {
      placeholder: "请输入用户名",
      allowClear: true
    }
  },
  {
    label: "电话",
    name: "phone",
    type: "Input",
    config: {
      placeholder: "请输入电话",
      allowClear: true
    }
  },
  {
    label: "邮箱",
    name: "email",
    type: "Input",
    config: {
      placeholder: "请输入邮箱",
      allowClear: true
    }
  },
  {
    label: "昵称",
    name: "nickname",
    type: "Input",
    config: {
      placeholder: "请输入昵称",
      allowClear: true
    }
  },
  {
    label: "密码",
    name: "password",
    type: "Input",
    config: {
      placeholder: "请输入密码",
      allowClear: true
    }
  },
  {
    label: "性别",
    name: "sex",
    type: "Input",
    config: {
      placeholder: "请输入性别",
      allowClear: true
    }
  },
  {
    label: "头像",
    name: "avatar",
    type: "Input",
    config: {
      placeholder: "请输入头像url",
      allowClear: true
    }
  }
];
