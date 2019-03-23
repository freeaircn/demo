<template>
  <div class="home-container">
    <h3 class="title">首 页</h3>
    <div class="area-routeto">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleToSignup">注 册</el-button>
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleToLogin">登 录</el-button>
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogout">退 出</el-button>
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleGetUserInfo">用户信息</el-button>
    </div>

    <div class="tips">
      <p style="margin-right:20px;">{{ Msg }}</p>
    </div>
  </div>
</template>

<script>
import { Constants } from '@/Constants'
import store from '@/store'
import { getToken } from '@/utils/auth' // 验权

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
    },
    handleGetUserInfo() {
      if (getToken()) {
        store.dispatch('GetInfo')
          .then(info => {
            console.log(info)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        console.log('no token in client')
      }
    },
    handleLogout() {
      if (getToken()) {
        store.dispatch('FedLogOut')
          .then(() => {
            console.log('logout !')
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        console.log('no token in client')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#fefefe;
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
    margin: 20px auto 20px auto;
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
