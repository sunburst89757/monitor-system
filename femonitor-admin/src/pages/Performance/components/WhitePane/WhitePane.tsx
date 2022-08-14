import style from "./WhitePane.module.scss";

export default function WhitePane(Props: any) {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <div className={style.titleContext}>{Props.label}</div>
      </div>
      <div>{Props.children}</div>
    </div>
  );
}
