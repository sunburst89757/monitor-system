<template>
  <div class="app-container">
    <h2>接口行为</h2>
    <div class="card-row">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>xhr接口</span>
        </div>
        <el-button type="primary" @click="xhrSuccess">请求成功</el-button>
        <el-button type="primary" @click="xhrFailure">请求失败</el-button>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>fetch接口</span>
        </div>
        <el-button type="primary" @click="fetchSuccess">请求成功</el-button>
        <el-button type="primary" @click="fetchFailure">请求失败</el-button>
      </el-card>
    </div>
    <h2>错误行为</h2>
    <div class="card-row">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>vue</span>
        </div>
        <el-button type="primary" @click="handleVue">错误测试</el-button>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>JS</span>
        </div>
        <el-button type="primary" @click="handleJS">错误测试</el-button>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>资源加载错误</span>
        </div>
        <el-button type="primary" @click="handleResourceJS"
          >js加载失败</el-button
        >
        <el-button type="primary" @click="handleResourceCss"
          >css加载失败</el-button
        >
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserList, getUserMenuList } from "@/api/test";

export default {
  data() {
    return {};
  },
  methods: {
    xhrSuccess() {
      getUserList({ pageNum: 1, pageSize: 10 }).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    xhrFailure() {
      getUserMenuList().then(
        (res) => {},
        (err) => {
          console.log(err);
        }
      );
    },
    fetchSuccess() {
      fetch("https://api.github.com/users/ruanyf")
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => console.log("Request Failed", err));
    },
    fetchFailure() {
      // 不做catch处理 会暴露promise错误 和 fetch访问失败两种错误，sdk还要继续处理上传失败的数据输入和输出反馈
      fetch("http://119.91.226.289bhbhjb")
        .then((response) => response.json())
        .then((json) => console.log(json));
      // .catch((err) => console.log("Request Failed", err));
    },
    handleVue() {
      // vue接管的undefined错误
      console.log(obj);
    },
    handleJS() {
      // WINDOW捕捉的异步错误所以是js
      setTimeout(() => {
        console.log(notdefined);
      });
    },
    handleResourceJS() {
      const oScript = document.createElement("script");
      oScript.type = "text/javascript";
      oScript.src = "//g.alicdn.com/sd/smartCaptcha";
      document.body.appendChild(oScript);
      // 创建一个无效的js引入script文件
    },
    handleResourceCss() {
      const img = document.createElement("img");
      img.src = "./test.png";
      document.body.appendChild(img);
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
.box-card {
  flex: 1;
}
.card-row {
  width: 100%;
  display: flex;
}
.card-row:nth-child(1) {
  margin-right: 30px;
}
</style>
