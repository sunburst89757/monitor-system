import style from "./DataDisplay.module.scss";
import { dataDisplayType } from "../../types";
export default function DataDisplay({ label, value }: dataDisplayType) {
  return (
    <div className={style.box}>
      <div className={style.label}>{label}</div>
      <div className={style.value}>{value}</div>
    </div>
  );
}
