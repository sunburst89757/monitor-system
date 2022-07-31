import style from "./css/BaseLayout.module.scss";
type IpropType = {
  children: JSX.Element;
};
export const BaseLayout = (props: IpropType) => {
  return <div className={style.layout}>{props.children}</div>;
};
