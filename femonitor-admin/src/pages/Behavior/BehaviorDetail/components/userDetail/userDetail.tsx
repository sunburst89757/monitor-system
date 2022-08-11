import { Map } from "../../../../../components/Map/Map";
import { timeOption, timeOption1 } from "../../config";
import style from "./userDetail.module.scss";
export const UserDetail = () => {
  return (
    <div className={style.detail}>
      <div className={style.block}>
        <div className={style.title}>用户基本信息</div>
        <ul className={style.body}>
          <li>
            <div className={style.left}>用户id:</div>
            <div className={style.right}>hhhh</div>
          </li>
          <li>
            <div className={style.left}>浏览器:</div>
            <div className={style.right}>hhhh</div>
          </li>
          <li>
            <div className={style.left}>操作系统:</div>
            <div className={style.right}>hhhh</div>
          </li>
          <li>
            <div className={style.left}>ip地址:</div>
            <div className={style.right}>hhhh</div>
          </li>
          <li>
            <div className={style.left}>所在地区:</div>
            <div className={style.right}>hhhh</div>
          </li>
        </ul>
      </div>
      <div className={style.block}>
        <div className={style.title}>页面平均加载时间</div>
        <div className={style.mapBody}>
          <Map option={timeOption}></Map>
        </div>
      </div>
      <div className={style.block}>
        <div className={style.title}>接口耗时区间分布</div>
        <div className={style.mapBody}>
          <Map option={timeOption1}></Map>
        </div>
      </div>
    </div>
  );
};
