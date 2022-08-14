import style from "./SmallPane.module.scss";

export default function SmallPane(Props: any) {
  return (
    <div className={style.container}>
      <div className={style.value}>{Props.value}</div>
      <label className={style.title}>{Props.title}</label>
    </div>
  );
}
