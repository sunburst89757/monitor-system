import { useCallback, useEffect, useRef, useState } from "react";
import { getPerformanceOverView } from "../../../../api/dashboard";
import { Map } from "../../../../components/Map/Map";
import { PerformanceDisplay } from "../../components/PerformanceDisplay/PerformanceDisplay";
import { apiMapOption, pageLoadOption } from "../../config";
import style from "../../dashboard.module.scss";
import { IPerformanceDisplay } from "../../types";

export const PerformanceData = ({ endTime }: { endTime: number }) => {
  const [performanceContent, setPerformanceContent] = useState([
    {
      content: "158.91ms"
    },
    {
      content: "2.58s"
    },
    {
      content: "2.74s"
    },
    {
      content: "263"
    },
    {
      content: "214.15ms"
    },
    {
      content: "100%"
    }
  ]);
  const performanceConfig = useRef([
    {
      title: "FCP平均时间",
      promptMessage:
        "从页面加载开始到页面内容的任何部分在屏幕上完成渲染的时间，为了提供良好的用户体验，FCP 的分数应该控制在 1.8 秒以内"
    },
    {
      title: "LCP平均时间",
      promptMessage:
        "从页面加载开始到最大文本块或图像元素在屏幕上完成渲染的时间。LCP 指标会根据页面首次开始加载的时间点来报告可视区域内可见的最大图像或文本块完成渲染的相对时间，一个良好的 LCP 分数应该控制在 2.5 秒以内。"
    },
    {
      title: "Dom解析时间",
      promptMessage: "Dom解析完成的时间，反映出DOM的复杂度"
    },
    {
      title: "接口请求总量",
      promptMessage: "发起请求的总数量"
    },
    {
      title: "接口请求平均耗时",
      promptMessage: "取24小时内的平均值"
    },
    {
      title: "接口请求成功率",
      promptMessage: "请求成功数/总请求数"
    }
  ]);
  const query = useRef({
    startTime: endTime - 24 * 60 * 60 * 1000 + 1,
    endTime
  });
  const getDataList = useCallback(() => {
    getPerformanceOverView(query.current).then((res) => {
      console.log(res.data, "性能");

      let contentArr: { content: any }[] = [];
      for (let i = 0; i < 6; i++) {
        let tempObj: {
          content: any;
        } = {
          content: ""
        };
        switch (i) {
          case 0:
            tempObj.content =
              (res.data.firstContentfulPaintTime / 1000).toFixed(2) + "s";
            break;
          case 1:
            tempObj.content =
              (res.data.largestContentfulPaintTime / 1000).toFixed(2) + "s";
            break;
          case 2:
            tempObj.content =
              (res.data.domcontentloadedTime / 1000).toFixed(2) + "s";

            break;
          case 3:
            tempObj.content = res.data.xhrCount;
            break;
          case 4:
            tempObj.content =
              (res.data.xhrAverageDuration / 1000).toFixed(2) + "s";
            break;
          case 5:
            tempObj.content =
              ((res.data.xhrSuccess / res.data.xhrCount) * 100).toFixed(2) +
              "%";
            break;
        }
        if (!tempObj.content) {
          tempObj.content = "无数据";
        }
        contentArr.push(tempObj);
      }
      setPerformanceContent(contentArr);
    });
  }, []);
  useEffect(() => {
    query.current.endTime = endTime;
    query.current.startTime = endTime - 24 * 60 * 60 * 1000 + 1;
    getDataList();
  }, [endTime]);
  return (
    <div className={style.block} style={{ height: "65vh" }}>
      <div className={style.blockHeader}>性能数据</div>
      <div
        className={style.blockCenter}
        style={{ justifyContent: "space-around" }}
      >
        {performanceConfig.current.map((item, index) => (
          <PerformanceDisplay
            {...item}
            content={performanceContent[index].content}
            key={item.title}
          ></PerformanceDisplay>
        ))}
      </div>
      <div className={style.blockBottom}>
        <div className={style.blockBottomItem}>
          {/* <div className={style.mapTitle}>页面加载时间</div> */}
          <Map option={pageLoadOption}></Map>
        </div>
        <div className={style.divided}></div>
        <div className={style.blockBottomItem}>
          <div className={style.mapTitle}>API成功耗时</div>
          <Map option={apiMapOption}></Map>
        </div>
      </div>
    </div>
  );
};
