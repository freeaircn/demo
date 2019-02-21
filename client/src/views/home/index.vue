<template>
  <div class="home-container">
    <h3 class="title">Home Page</h3>
    <el-form ref="Form" :model="Msg" label-position="left">
      <el-form-item prop="message">
        <el-input v-model="Msg" name="Msg" type="text" auto-complete="on" />
      </el-form-item>
    </el-form>
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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.home-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
</style>
