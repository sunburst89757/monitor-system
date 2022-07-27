import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { changeisShowReloginModal, resetDatedNum } from "../store/module/user";
import { useAppDispatch, useAppSelector } from "../store/types";

export function ReLoginModal() {
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector((state) => state.user.isShowReloginModal);
  const navigate = useNavigate();
  const handleOk = () => {
    dispatch(changeisShowReloginModal());
    dispatch(resetDatedNum());
    navigate("/login");
  };
  const handleCancel = () => {
    dispatch(changeisShowReloginModal());
    dispatch(resetDatedNum());
  };
  return (
    <>
      <Modal
        title="重新登录"
        visible={loginStatus}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>登录过期，请重新登录</p>
      </Modal>
    </>
  );
}
