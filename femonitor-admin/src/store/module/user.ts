import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IUserInfo, stateType } from "../types";
import { cache } from "../../utils/localStorage";

const initialState: stateType = {
  userInfo: {
    userId: 0,
    username: "",
    nickname: "",
    email: "",
    phone: "",
    avater: "",
    roleName: ""
  },
  token: "",
  isShowReloginModal: false,
  datedNum: 0,
  loading: false
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      const { userId, nickname, username, email, phone, avater, roleName } =
        action.payload;
      state.token = cache.getItem("token");
      state.userInfo.userId = userId;
      // 用户角色本来应该从action.payload里传递，新项目需要接口更改
      state.userInfo.roleName = roleName;
      state.userInfo.username = username;
      state.userInfo.avater = avater;
      state.userInfo.email = email;
      state.userInfo.nickname = nickname;
      state.userInfo.phone = phone;
    },
    changeisShowReloginModal: (state) => {
      state.isShowReloginModal = !state.isShowReloginModal;
    },
    incrementDatedNum: (state) => {
      state.datedNum = state.datedNum + 1;
    },
    resetDatedNum: (state) => {
      state.datedNum = 0;
    },
    resetInitialState: () => initialState,
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    }
  }
});
// 导出selector
export const selectUser = (state: RootState) => state.user.userInfo;
// 导出actions
export const {
  updateUserInfo,
  changeisShowReloginModal,
  incrementDatedNum,
  resetDatedNum,
  resetInitialState,
  setLoading
} = userSlice.actions;
// 导出reducer
export const userReducer = userSlice.reducer;
