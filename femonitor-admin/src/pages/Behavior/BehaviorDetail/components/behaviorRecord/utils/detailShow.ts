import { tz2ymdsms } from "../../../../../../utils/handleTime";
import { DetailType } from "../types";

type IItem = {
  type: "2" | "3" | "4" | "5";
  subType: string;
  [prop: string]: any;
};
export const transFormDetail = (item: IItem): DetailType[] => {
  let res: DetailType[] = [];
  switch (item.type) {
    case "2":
      res = [
        {
          title: "事件类型",
          description: "页面浏览"
        },
        {
          title: "发生时间",
          description: tz2ymdsms(item.createdAt)
        },
        {
          title: "来源页面",
          description: item.referrer
        },
        {
          title: "访问页面",
          description: item.pageURL
        },
        {
          title: "停留时间",
          description: (item.startTime / 1000).toFixed(2) + "s"
        }
      ];
      break;
    case "3":
      if (item.subType === "resource") {
        res = [
          {
            title: "事件类型",
            description: item.subType + " 错误"
          },
          {
            title: "发生时间",
            description: tz2ymdsms(item.createdAt)
          },
          {
            title: "加载类型",
            description: item.resourceType
          },
          {
            title: "加载结构",
            description: item.html
          },
          {
            title: "请求url",
            description: item.url
          }
        ];
      } else if (item.subType === "vue") {
        const index = String(item.error).indexOf("(");

        res = [
          {
            title: "事件类型",
            description: item.subType + " 错误"
          },
          {
            title: "发生时间",
            description: tz2ymdsms(item.createdAt)
          },
          {
            title: "错误位置",
            description: item.error.substring(index)
          },
          {
            title: "错误信息",
            description: String(item.error).substring(0, index)
          }
        ];
      } else {
        res = [
          {
            title: "事件类型",
            description: item.subType + " 错误"
          },
          {
            title: "发生时间",
            description: tz2ymdsms(item.createdAt)
          },
          {
            title: "错误位置",
            description: item.pageURL
          },
          {
            title: "错误信息",
            description: item?.msg || item.errData || item?.error
          }
        ];
      }

      break;
    case "4":
      res = [
        {
          title: "事件类型",
          description: item.success ? "request: 成功" : "request: 失败"
        },
        {
          title: "发生时间",
          description: tz2ymdsms(item.createdAt)
        },
        {
          title: "响应时间",
          description: item.duration / 1000 + "s"
        },
        {
          title: "发生页面",
          description: item.pageURL
        },
        {
          title: "请求路径",
          description: item.url
        },
        {
          title: "请求方式",
          description: item.method
        },
        {
          title: "发送数据",
          description: item?.sendData || "无"
        },
        {
          title: "响应值",
          description: item?.responseData
        }
      ];
      console.log(res, "you");

      break;
    case "5":
      res = [
        {
          title: "事件类型",
          description: "点击"
        },
        {
          title: "发生时间",
          description: tz2ymdsms(item.createdAt)
        },
        {
          title: "发生页面",
          description: item.pageURL
        },
        {
          title: "点击目标",
          description: item.outerHTML
        }
      ];
      break;
  }
  return res;
};
