import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RouteObject } from "react-router-dom";
import { initialMenuRoutes } from "../../router/config";
import { cache } from "../../utils/localStorage";
const isIncludeRoute = (
  route: RouteObject[],
  routes: RouteObject[]
): boolean => {
  if (
    routes[routes.length - 2].meta.title === route[route.length - 1].meta.title
  ) {
    return true;
  }
  return false;
};
type IPermissonType = {
  routes: RouteObject[];
  endPermission: string[];
  accessRoutes: string[];
};
const initialState: IPermissonType = {
  routes: initialMenuRoutes,
  endPermission: [],
  accessRoutes: []
};
const permissonSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    addRoutes: (state, action: PayloadAction<RouteObject[]>) => {
      if (!isIncludeRoute(action.payload, state.routes)) {
        state.routes = [...state.routes, ...action.payload];
        // 将github固定在最后
        const index = state.routes.findIndex(
          (item) => item.meta.title === "Github"
        );
        const GithubLink = state.routes[index];
        state.routes.splice(index, 1);
        state.routes.push(GithubLink);
        cache.setItem("menuRoutes", state.routes);
      }
    },
    updateEndPermission: (state, action: PayloadAction<string[]>) => {
      state.endPermission = action.payload;
    },
    updateAccessRoutes: (state, action: PayloadAction<string[]>) => {
      state.accessRoutes = [...action.payload];
      cache.setItem("accessRoutes", state.accessRoutes);
    },
    resetInitialState: () => initialState
  }
});
export const {
  addRoutes,
  updateEndPermission,
  resetInitialState,
  updateAccessRoutes
} = permissonSlice.actions;
export const permissionReducer = permissonSlice.reducer;
