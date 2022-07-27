import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type tabObject = {
  title: string;
  key: string;
  /* key设置路由 title就是标题 */
};
type tabsState = {
  tabs: tabObject[];
  activeTab: string;
  menuActive: string[];
};
const initialState: tabsState = {
  tabs: [
    {
      key: "/dashboard",
      title: "首页"
    }
  ],
  activeTab: "/dashboard",
  menuActive: ["dashboard"]
};
const selectMenuActive = (key: string): string[] => {
  const arr: any[] = key.split("/");
  if (arr.length === 3) {
    arr.shift();
  }
  arr.shift();
  return arr;
};
const IsNewTabInTabs = (tabs: tabObject[], newTab: tabObject) => {
  return tabs.some((tab) => tab.key === newTab.key);
};
const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    removeTab: (state, action: PayloadAction<string>) => {
      const index = state.tabs.findIndex((tab) => tab.key === action.payload);
      // console.log(index);
      state.tabs.splice(index, 1);
      // 删除第一个
      if (index === 0) {
        // 第一个元素也是最后一个元素
        if (state.tabs.length === 0) {
          state.tabs.push({
            key: "/dashboard",
            title: "首页"
          });
          state.activeTab = "/dashboard";
          state.menuActive = ["dashboard"];
        } else {
          // 第一个元素不是最后一个元素
          state.activeTab = state.tabs[0].key;
          state.menuActive = selectMenuActive(state.tabs[0].key);
        }
      } else {
        // 删除中间的tab
        state.activeTab = state.tabs[index - 1].key;
        state.menuActive = selectMenuActive(state.tabs[index - 1].key);
      }
    },
    changeTab: (state, action: PayloadAction<tabObject>) => {
      if (IsNewTabInTabs(state.tabs, action.payload)) {
        // 说明点的菜单是tab里有的直接修改tabActive
        state.activeTab = action.payload.key;
        state.menuActive = selectMenuActive(action.payload.key);
      } else {
        // 新增tab
        state.tabs.push(action.payload);
        state.activeTab = action.payload.key;
        state.menuActive = selectMenuActive(action.payload.key);
      }
    },
    changeTabActive: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
      state.menuActive = selectMenuActive(action.payload);
    },
    resetInitialState: () => initialState
  }
});

export const tabsReducer = tabSlice.reducer;
export const { removeTab, resetInitialState, changeTab, changeTabActive } =
  tabSlice.actions;
