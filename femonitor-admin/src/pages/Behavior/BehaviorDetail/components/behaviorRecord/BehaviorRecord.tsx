import {
  Button,
  Divider,
  List,
  // Pagination,
  Radio,
  RadioChangeEvent,
  Skeleton,
  Space
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCallback, useEffect, useState } from "react";
import style from "./BehaviorRecord.module.scss";
import { IconFont } from "../../../../../components/IconFont";
interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}
interface DetailType {
  title: string;
  description?: any;
}
const fakeDetail: DetailType[] = [
  {
    title: "事件类型",
    description: "request"
  },
  {
    title: "发生时间",
    description: "2022-08-08 01:00:23"
  },
  {
    title: "事件内容",
    description: "hhhhhh"
  },
  {
    title: "发生页面",
    description: "baidu.com"
  },
  {
    title: "加载信息",
    description: ""
  },
  {
    title: "事件标识",
    description: "xxx"
  }
];
export const BehaviorRecord = ({ isCollapse }: { isCollapse: boolean }) => {
  const [behavior, setbehavior] = useState("1");
  const changeBehavior = useCallback((e: RadioChangeEvent) => {
    setbehavior(e.target.value);
  }, []);
  const [dataList, setData] = useState<DataType[]>([]);
  const [detail, setdetail] = useState<DetailType[]>(fakeDetail);
  const [loading, setLoading] = useState(false);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        console.log(body.results);

        setData([...dataList, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const handleDetail = useCallback((item: any) => {
    console.log(item, "shisha");
  }, []);
  useEffect(() => {
    loadMoreData();
  }, []);

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
              hasMore={dataList.length < 50}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>所有记录加载完成🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={dataList}
                renderItem={(item) => (
                  <List.Item
                    key={item.email}
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
                      avatar={<IconFont type="icon-cloud"></IconFont>}
                      title={item.name.last}
                      description={item.email}
                    />
                    <div>19:23</div>
                  </List.Item>
                )}
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
                    description={item.description ? item.description : ""}
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
