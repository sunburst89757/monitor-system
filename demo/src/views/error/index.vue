<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable padded-blocks -->
<!-- eslint-disable no-trailing-spaces -->
<template>
  <div class="error-container">
    <div class="error-text">onerror</div>
    <el-button
      type="primary"
      @click="RangeErrorHandler(1)"
    >RangeError 1</el-button>
    <el-button
      type="primary"
      @click="RangeErrorHandler(2)"
    >RangeError 2
    </el-button>
    <el-button
      type="primary"
      @click="ReferenceErrorHandler(1)"
    >ReferenceError 1</el-button>
    <el-button
      type="primary"
      @click="SyntaxErrorHandler(1)"
    >SyntaxError 1</el-button>
    <el-button
      type="primary"
      @click="TypeErrorHandler(1)"
    >TypeError 1</el-button>
    <el-button
      type="primary"
      @click="TypeErrorHandler(2)"
    >TypeError 2
    </el-button>
    <!--<el-button
      type="primary"
      @click="ScriptErrorHandler(1)"
    >ScriptError 1
    </el-button> -->
    <div class="error-text">console.error</div>
    <el-button
      type="primary"
      @click="consoleErrorHandler(1)"
    >consoleError 2
    </el-button>
    <el-button
      type="primary"
      @click="consoleErrorHandler(2)"
    >consoleError 2
    </el-button>
    <div class="error-text">Promise - error</div>
    <el-button
      type="primary"
      @click="PromiseErrorHandler(1)"
    >PromiseError 1
    </el-button>
    <div class="error-text">Vue - error</div>
    <el-button
      type="primary"
      @click="VueHandler()"
    >Vue 1
    </el-button>
    <div class="error-text">Resource - error</div>
    <el-button
      type="primary"
      @click="ResourveErrorHandler(1)"
    >ResourceError JS
    </el-button>
    <el-button
      type="primary"
      @click="ResourveErrorHandler(2)"
    >ResourceError CSS
    </el-button>
  </div>
</template>

<script>
import { RangeError, ReferenceError, SyntaxError, TypeError, ScriptError } from "./onerror.js"
import consoleError from "./consoleError.js"
import { PromiseError } from "./promiseError.js"
// eslint-disable-next-line no-unused-vars
import { ResourveError } from "./resourceError.js"
export default {
  name: "Error",
  data() {
    return {
      imgType: true
    };
  },
  computed: {},
  methods: {
    // eslint-disable-next-line space-before-function-paren
    RangeErrorHandler (type) {
      RangeError(type)
      // eslint-disable-next-line padded-blocks
    },
    // eslint-disable-next-line space-before-function-paren
    ReferenceErrorHandler (type) {
      ReferenceError(type)
    },
    SyntaxErrorHandler(type) {
      SyntaxError(type)
    },
    TypeErrorHandler(type) {
      TypeError(type)
    },
    consoleErrorHandler(type) {
      consoleError(type)
    },
    ScriptErrorHandler(type) {
      ScriptError(type)
    },
    PromiseErrorHandler(type) {
      PromiseError()
    },
    ResourveErrorHandler(type) {
      // this.imgType = !this.imgType
      // console.log("this.imgType", this.imgType)
      ResourveError(type)
    },
    VueHandler() {
      console.log(Date.now())
      console.log(Date.parse("2022/8/1 10:05"))

      obj
    }
  },
};
</script>

<style lang="scss" scoped>
.error {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.img {
  height: 100px;
  width: 100px;
}
</style>
