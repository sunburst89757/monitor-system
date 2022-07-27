import { useAppDispatch } from "../store/types";
import { resetInitialState as reset1 } from "../store/module/tabs";
import { resetInitialState as reset2 } from "../store/module/user";
import { resetInitialState as reset3 } from "../store/module/permission";
export function useResetState() {
  const dispatch = useAppDispatch();
  const reset = () => {
    dispatch(reset1());
    dispatch(reset2());
    dispatch(reset3());
  };
  return reset;
}
