# femonitor-sdk

femonitor-sdk 是一个用于 web 前端的监控 SDK，主要支持对
错误行为、性能数据、用户行为数据这三方面的数据进行监控上报

## 功能

- 错误监控

  - console.error 监控
  - css js 资源加载错误
  - js 错误
  - promise 错误
  - vue 监控的错误

- 性能数据上报

  - FCP FP
  - LCP
  - CLS
  - FID
  - xhr/fetch 请求耗时
  - fps
  - load

- 用户行为监测
  - PV
  - 页面访问深度
  - 页面停留时间
  - 点击事件
  - 页面浏览

## 安装

```
npm i femonitor-sdk-learning
```

## 使用

```
import {monitor} from "femonitor-sdk-learning"
monitor.init({
    url: "", // 上报数据的后台，必填
    appID: "", //项目ID，非必填，不填写会生成唯一id
    userID: "", // 用户ID，非必填，不填会生成唯一id，
    vue: { // 非必填，用于监控vue下的spa应用
        Vue: Vue, // Vue实例
        router: router // VueRouer实例
    }

})
```
