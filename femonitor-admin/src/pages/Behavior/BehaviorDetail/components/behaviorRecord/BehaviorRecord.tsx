import {
  Divider,
  List,
  // Pagination,
  Radio,
  RadioChangeEvent,
  Skeleton,
  Space
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCallback, useEffect, useRef, useState } from "react";
import style from "./BehaviorRecord.module.scss";
import { IconFont } from "../../../../../components/IconFont";
import { DetailType, IUserLogsQuery } from "./types";
import { getUserLogs } from "../../../../../api/behavior";
import { transFormDetail } from "./utils/detailShow";
type IProps = {
  isCollapse: boolean;
  endTime: number;
  userId: string;
};
const type2List = (item: {
  type: "2" | "3" | "4" | "5";
  [prop: string]: any;
}) => {
  switch (item.type) {
    case "2":
      return [
        "页面浏览",
        "icon-webpage-line",
        "http://localhost:9528/#" + item.pageURL
      ];
    case "3":
      return ["发生错误", "icon-error", item?.error || "console-error"];
    case "4":
      const icon = item.success ? "icon-ok" : "icon-cancel";
      return ["request", icon, item.url];
    case "5":
      return ["点击", "icon-click", item.target];
  }
};
export const BehaviorRecord = ({ isCollapse, endTime, userId }: IProps) => {
  const query = useRef<IUserLogsQuery>({
    type: "1",
    userId,
    // 指定日期的零点和24点
    startTime: endTime - 24 * 60 * 60 * 1000 + 1,
    endTime,
    pageNum: 1,
    pageSize: 10
  });
  const [num, setnum] = useState(10);
  const [behavior, setbehavior] = useState("1");
  const fetchDataList = (params: IUserLogsQuery, isUpdateDataList = false) => {
    getUserLogs(params)
      .then((res) => {
        setLoading(false);
        setnum(res.data.num);
        if (isUpdateDataList) {
          // 更改时间和切换行为和清除之前的dataList
          console.log("wufanying");

          setData(res.data.result);
        } else {
          setData([...dataList, ...res.data.result]);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const changeBehavior = useCallback((e: RadioChangeEvent) => {
    query.current.type = e.target.value;
    query.current.pageNum = 1;
    setbehavior(e.target.value);
    fetchDataList(query.current, true);
  }, []);
  const [dataList, setData] = useState<any[]>([]);
  const [detail, setdetail] = useState<DetailType[]>([]);
  const [loading, setLoading] = useState(false);
  const loadMoreData = () => {
    console.log("触发");
    query.current.pageNum = query.current.pageNum + 1;
    if (loading) {
      return;
    }
    setLoading(true);
    fetchDataList(query.current);
  };
  const handleDetail = useCallback((item: any) => {
    console.log(item, "ryf");

    setdetail(transFormDetail(item));
  }, []);
  useEffect(() => {
    query.current.endTime = endTime;
    query.current.startTime = endTime - 24 * 60 * 60 * 1000 + 1;
    console.log(query.current, "查看时间");

    // 时间改变要清空dataList,页面回到第一页
    query.current.pageNum = 1;
    fetchDataList(query.current, true);
  }, [endTime]);
  return (
    <div className={style.contain}>
      <div className={style.header}>
        <span className={style.title}>行为记录表</span>
        <Radio.Group
          value={behavior}
          onChange={changeBehavior}
          buttonStyle="outline"
          size="middle"
        >
          <Space>
            <Radio.Button value="1">全部</Radio.Button>
            <Radio.Button value="2">浏览</Radio.Button>
            <Radio.Button value="3">错误</Radio.Button>
            <Radio.Button value="4">接口</Radio.Button>
            <Radio.Button value="5">点击</Radio.Button>
          </Space>
        </Radio.Group>
      </div>
      <div className={style.body}>
        <div className={style.left}>
          <div className={!isCollapse ? style.listFold : style.listExpand}>
            <InfiniteScroll
              dataLength={dataList.length}
              next={loadMoreData}
              hasMore={dataList.length < num}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>所有记录加载完成🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={dataList}
                renderItem={(item) => {
                  const tempItem = type2List(item);
                  return (
                    <List.Item
                      key={item._id}
                      actions={[
                        <a
                          key="list-loadmore-more"
                          onClick={() => {
                            handleDetail(item);
                          }}
                        >
                          详情
                        </a>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<IconFont type={tempItem[1]}></IconFont>}
                        title={tempItem[0]}
                        description={tempItem[2]}
                      />
                      <div>{item.createdAt}</div>
                    </List.Item>
                  );
                }}
              />
            </InfiniteScroll>
          </div>
        </div>
        <div className={style.right}>
          <div className={!isCollapse ? style.detailFold : style.detailExpand}>
            <List
              dataSource={detail}
              renderItem={(item) => (
                <List.Item key={item.title}>
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
      {/* <div className={style.footer}>
        <Pagination
          total={50}
          showSizeChanger
          showQuickJumper
          // showTotal={(total) => ` ${total} items`}
          responsive
        />
      </div> */}
    </div>
  );
};
