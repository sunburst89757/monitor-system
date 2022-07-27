// 类型扩展
import { RouteObject } from "react-router-dom";
interface MetaObj {
  hidden?: boolean;
  title: string;
  icon?: string;
  perms?: any;
}
declare module "react-router-dom" {
  export interface RouteObject {
    meta: MetaObj;
    children?: RouteObject[];
  }
}
