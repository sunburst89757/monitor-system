import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from ".";
// 对dispatch 和 useSelector作类型扩展
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface userInfo {
  userId: number;
  role: string;
  username: string;
}
export interface stateType {
  userInfo: userInfo;
  token: string;
  isShowReloginModal: boolean;
  datedNum: number;
  loading: boolean;
}
