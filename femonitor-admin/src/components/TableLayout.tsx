import style from "./css/TableLayout.module.scss";
type IpropType = {
  children: JSX.Element;
};
export const TableLayout = (props: IpropType) => {
  return <div className={style.layout}>{props.children}</div>;
};
