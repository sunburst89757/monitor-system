import { Button, Progress } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Circle } from "../../components/Circle/Circle";
import { ICircleType } from "../../types";
import style from "../../dashboard.module.scss";
import { generateGrade } from "../../../../utils/generateRandomData";
import { random } from "lodash";
export const ErrorData = ({ endTime }: { endTime: number }) => {
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => {
    navigate("/behavior/userBehaviorOverview");
  }, [navigate]);
  const [healthyPercent, healthysetpercent] = useState(generateGrade());
  const circleColor = useMemo(() => {
    let color: string = "";
    if (healthyPercent > 90) {
      color = "#52c41a";
    } else if (healthyPercent > 70) {
      color = "#1890ff";
    } else {
      color = "#ff4d4f";
    }
    return color;
  }, [healthyPercent]);
  const healthyContent = useMemo(() => {
    if (healthyPercent > 90) {
      return "健康";
    } else if (healthyPercent > 70) {
      return "良好";
    } else {
      return "很差";
    }
  }, [healthyPercent]);
  const [circle, setcircle] = useState<ICircleType[]>([
    {
      content: "JS错误",
      percent: generateGrade()
    },
    {
      content: "自定义异常",
      percent: generateGrade()
    },
    {
      content: "静态资源异常",
      percent: generateGrade()
    },
    {
      content: "接口异常",
      percent: generateGrade()
    }
  ]);
  const query = useRef({
    startTime: endTime - 24 * 60 * 60 * 1000 + 1,
    endTime
  });
  useEffect(() => {
    query.current.endTime = endTime;
    query.current.startTime = endTime - 24 * 60 * 60 * 1000 + 1;
    healthysetpercent(random(60, 100));
    const newCircle = circle.map((item) => {
      item.percent = generateGrade();
      return item;
    });
    setcircle(newCircle);
    console.log(query.current);
  }, [endTime]);
  return (
    <div className={style.block}>
      <div className={style.blockHeader}>
        健康状态
        <div className={style.btn}>
          <Button type="primary" onClick={handleNavigate}>
            用户行为细查
          </Button>
        </div>
      </div>
      <div className={style.blockCenter}>
        <div className={style.healthyAll}>
          <div className={style.toolTip}>
            {/* <Tooltip
                title={healthyContent}
                visible={true}
                placement="rightTop"
                color={circleColor}
              ></Tooltip> */}
          </div>
          <Progress
            type="circle"
            percent={healthyPercent}
            strokeColor={circleColor}
            format={(percent) => (
              <div className={style.circle}>
                <div
                  className={style.circleFont}
                  style={{ color: circleColor }}
                >
                  {percent}
                </div>
                <div className={style.circleTitle}>健康状态</div>
              </div>
            )}
          ></Progress>
        </div>
        <div className={style.divided}></div>
        <div className={style.healthyDetail}>
          {circle.map((item) => (
            <Circle
              percent={item.percent}
              content={item.content}
              key={item.content}
            ></Circle>
          ))}
        </div>
      </div>
    </div>
  );
};
