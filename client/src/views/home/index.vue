<template>
  <div class="home-container">
    <h3 class="title">Home Page</h3>
    <div class="area-routeto">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleToSignup">To Signup</el-button>
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleToLogin">To Login</el-button>
    </div>

    <div class="tips">
      <p style="margin-right:20px;">{{ Msg }}</p>
    </div>
  </div>
</template>

<script>
import { Constants } from '@/Constants'

export default {
  name: 'Home',
  data() {
    return {
      Msg: Constants.TEST_MSG
    }
  },
  methods: {
    handleToSignup() {
      this.$router.push({ name: 'signup' })
    },
    handleToLogin() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#ffffff;
$light_gray:#eee;
$dark_gray:#606266;
$border_gray: #DCDFE6;

.home-container {
  // position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $dark_gray;
    margin: 30px auto 10px auto;
    text-align: center;
    font-weight: bold;
  }
  .area-routeto {
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 15px 35px 15px 35px;
    margin: 40px auto 20px auto;
    .el-button {
      margin: 8px;
    }
  }
  .tips {
    font-size: 14px;
    color: $dark_gray;
    text-align: center;
    margin-bottom: 10px;
  }
}
</style>
