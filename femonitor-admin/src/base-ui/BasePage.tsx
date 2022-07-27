import { ConfigProvider, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { PanelRender } from "rc-table/lib/interface";
import { Ref, useImperativeHandle } from "react";
import { useCallback, useRef, useState } from "react";
import { getDataList } from "../api/common";
import { TableLayout } from "../components/TableLayout";
import { IFormItemConfig, MyForm } from "./MyForm";
export interface IPageInformation {
  pageNum: number;
  pageSize: number;
}
type PObject = {
  id: number;
};
type TObject = {
  [prop: string]: string | number;
};
type IProps<U> = {
  url: string;
  formItems: IFormItemConfig[];
  columns: ColumnsType<U>;
  myRef: Ref<IMyRef>;
  headerBtns?: PanelRender<U>;
};
export interface IMyRef {
  getDataList: () => void;
}
// T是MyForm需要的查询表单所需的字段类型 U是Column必须是对象所以需要限制
export const BasePage = <T extends TObject, U extends PObject>({
  url,
  formItems,
  columns,
  myRef,
  headerBtns
}: IProps<U>) => {
  // 查询的所有变量 page pageSize包括
  const queryParams = useRef<T & IPageInformation>();
  const rowSelection = useRef({
    onChange: (selectedRowKeys: React.Key[], selectedRows: U[]) => {
      console.log(
        `选中行的key: ${selectedRowKeys}`,
        "选中行的值: ",
        selectedRows
      );
    }
  });
  const [pageInformation, setpageInformation] = useState<IPageInformation>({
    pageNum: 1,
    pageSize: 10
  });
  const [dataList, setdataList] = useState<U[]>();
  const [total, setTotal] = useState(0);
  const fetchDataList = useCallback(() => {
    getDataList<T & IPageInformation, U>(url, queryParams.current!).then(
      (res) => {
        if (res.success) {
          setpageInformation({
            pageNum: res.data.pageNum,
            pageSize: res.data.pageSize
          });
          setdataList(res.data.list);
          setTotal(res.data.total);
        }
      }
    );
  }, [url]);
  // 点击查询和重置时刷新表格
  const handleSearch = useCallback(
    (val: T) => {
      // val是form里面的查询数据
      queryParams.current = {
        ...val,
        pageNum: pageInformation.pageNum,
        pageSize: pageInformation.pageSize
      };
      fetchDataList();
    },
    [fetchDataList, pageInformation]
  );
  const onChange = useCallback(
    (pageNumber: number, pageSize: number) => {
      console.log(pageNumber, "页码", pageSize);
      queryParams.current = {
        ...queryParams.current,
        pageNum: pageNumber,
        pageSize: pageSize
      } as any;
      fetchDataList();
    },
    [fetchDataList]
  );
  //  把myRef 用作 props回避使用forwardRef 和泛型组件的结合 useImperativeHandle第一个参数ref类型变量 真正的current只能在Ref<IMyRef>这个泛型里
  useImperativeHandle(myRef, () => ({
    getDataList() {
      fetchDataList();
    }
  }));
  return (
    <div>
      <TableLayout>
        <>
          <MyForm<T> formItems={formItems} handleSeacrh={handleSearch}></MyForm>
          <ConfigProvider renderEmpty={undefined}>
            <Table
              rowKey={(record) => record.id}
              dataSource={dataList}
              columns={columns}
              rowSelection={{ type: "checkbox", ...rowSelection.current }}
              pagination={{
                position: ["bottomRight"],
                showQuickJumper: true,
                defaultCurrent: 1,
                total: total,
                onChange: onChange,
                pageSize: pageInformation.pageSize,
                pageSizeOptions: [10, 20],
                showSizeChanger: true,
                showTotal: (total) => `总计${total}`
              }}
              size="middle"
              scroll={{ y: 300 }}
              bordered
              title={headerBtns}
            />
          </ConfigProvider>
        </>
      </TableLayout>
    </div>
  );
};
