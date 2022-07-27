import { ColumnsType } from "antd/lib/table";
import { useRef } from "react";
import { BasePage } from "../../../base-ui/BasePage";
import { useGetDataList } from "../../../hooks/useGetDataList";
import {
  columns as columnsConfig,
  formItemConfig,
  IQueryForm,
  IRoleList
} from "./config";
export default function RoleManage() {
  const columns = useRef<ColumnsType<IRoleList>>(columnsConfig);
  const { basePageConfig, getDataList } = useGetDataList(
    formItemConfig,
    "/sys/role/getRoleList"
  );
  return (
    <div>
      <BasePage<IQueryForm, IRoleList>
        {...basePageConfig}
        columns={columns.current}
      ></BasePage>
    </div>
  );
}
