import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { tabsReducer } from "./module/tabs";
import { userReducer } from "./module/user";
import { permissionReducer } from "./module/permission";
const allReducers = combineReducers({
  user: userReducer,
  tabs: tabsReducer,
  permission: permissionReducer
});

export const store = configureStore({
  reducer: allReducers,
  // 修复持久化时的serializableCheck检查报错行为
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
