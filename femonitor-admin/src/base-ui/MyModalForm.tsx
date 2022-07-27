import { Button, Modal, Space } from "antd";
import { useCallback, useEffect, useRef } from "react";
import { addData, updateData } from "../api/common";
import { IFormItemConfig, IMyRef, MyForm } from "./MyForm";
// 用于增加和修改的Modal弹窗
export interface IModalInfo<FormFields> {
  type: "add" | "update";
  title: string;
  visible: boolean;
  formInfo?: FormFields;
  formItems: IFormItemConfig[];
  url: string;
  width?: number;
  handleOk: () => any;
  handleCancel: () => any;
}
export function MyModalForm<FormFields extends { id: number }>({
  type,
  title,
  visible,
  formInfo,
  formItems,
  url,
  width = 1000,
  handleOk,
  handleCancel
}: IModalInfo<FormFields>) {
  const myRef = useRef<IMyRef<FormFields>>(null);
  const submitForm = useCallback(() => {
    if (type === "add") {
      addData(url, myRef.current?.getForm().getFieldsValue()).then((res) => {
        if (res.success) {
          handleOk();
        }
      });
    } else {
      updateData(url, {
        ...myRef.current?.getForm().getFieldsValue(),
        id: formInfo?.id
      }).then((res) => {
        if (res.success) {
          handleOk();
        }
      });
    }
  }, [formInfo?.id, handleOk, type, url]);
  //   初始化一次渲染
  useEffect(() => {
    // 消除警告提示 useEffect里使用form方法必须在组件挂载后实施
    if (visible) {
      if (formInfo) {
        myRef.current?.getForm().setFieldsValue({ ...(formInfo as any) });
      }
    }
  }, []);
  return (
    <>
      <Modal
        title={title}
        visible={visible}
        footer={null}
        width={width}
        onCancel={handleCancel}
        // destroyOnClose
      >
        <MyForm<FormFields>
          formItems={formItems}
          searchBtns={false}
          myRef={myRef}
        >
          <Space>
            <Button onClick={handleCancel}>取消</Button>
            <Button type="primary" onClick={submitForm}>
              确定
            </Button>
          </Space>
        </MyForm>
      </Modal>
    </>
  );
}
