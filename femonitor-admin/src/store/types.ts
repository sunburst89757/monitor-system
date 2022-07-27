import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from ".";
// 对dispatch 和 useSelector作类型扩展
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface IUserInfo {
  /* 用户信息 */
  userId: number;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  avater: string;
  roleName: string;
}

export interface stateType {
  userInfo: IUserInfo;
  token: string;
  isShowReloginModal: boolean;
  datedNum: number;
  loading: boolean;
}
export interface IEndRoute {
  id: number;
  name: string;
  parentId: number;
  icon: string;
  path: string;
  perms: any;
  children?: IEndRoute[];
}
