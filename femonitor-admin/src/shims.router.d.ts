// 类型扩展
import { RouteObject } from "react-router-dom";
interface MetaObj {
  hidden?: boolean;
  role?: string[];
  title: string;
}
declare module "react-router-dom" {
  export interface RouteObject {
    meta: MetaObj;
    children?: RouteObject[];
  }
}

declare module "*.module.css" {
  export const css: { readonly [key: string]: string };
}

declare module "*.module.sass" {
  export const sass: { readonly [key: string]: string };
}

declare module "*.module.scss" {
  export const scss: { readonly [key: string]: string };
}
