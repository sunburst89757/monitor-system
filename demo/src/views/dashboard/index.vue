<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-button type="primary" @click="handleClick">正确接口</el-button>
    <el-button type="primary" @click="handleTest">错误接口</el-button>
  </div>
</template>

<script>
import { login, getUserMenuList } from "@/api/login";
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  methods: {
    handleClick() {
      const params = {
        username: "admin",
        password: "admin",
      };
      login(params).then((res) => {
        console.log(res, "hhhhh");
      });
    },
    handleTest() {
      getUserMenuList().then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
