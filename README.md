# monitor-system

一个简易的支持 web 前端的监控系统，由四个部分构成

- femonitor-sdk 前端监控 sdk，sdk 的形式嵌入项目进行监控，并上报数据给后台
- femonitor-backend 监控系统的后台，将 sdk 上报的数据进行存储、清洗、分析，并传递给可视化的前端中后台 femonitor-admin 展示监视的结果。
- femonitor-admin 将后台传递的监视结果以可视化的形式展示
- demo:用于演示监视成功的，将 sdk 集成到 demo，在 demo 内监测数据。
