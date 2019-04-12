<template>
  <div class="reset-pwd-wrapper">
    <div class="forgot-pwd-container">
      <div class="forgot-pwd-header py-responsive is-center">
        <h1 class="title">设置新密码</h1>
      </div>



    <div v-show="show_contents === 0">
      <el-form ref="resetPwdForm" :model="resetPwdForm" :rules="resetPwdRules" class="container-sm px-responsive" label-position="left">
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input :type="pwdType" v-model="resetPwdForm.password" name="password" placeholder="输入新密码" clearable />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input :type="pwdType" v-model="resetPwdForm.confirmPassword" name="confirmPassword" placeholder="再次输入新密码" clearable />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleResetPassword">提 交</el-button>
        </el-form-item>
        <div class="tips">
          <span style="margin-right:20px;">:)</span>
        </div>
      </el-form>
    </div>

    <div v-show="show_contents === 1">
      <div class="reset-pwd-form">
        <h3 class="title">新密码</h3>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleGotoLogin">返回登录</el-button>
        <hr align="center" width="100%" color="#DCDFE6" size="1" >
        <div class="tips">
          <span style="margin:20px 0px 20px 0px; text-align:left">用户(<span style="color:#409EFF;">{{ username }}</span>)新密码设置成功，用户请重新登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isValidPassword } from '@/utils/validate'
import { resetPassword } from '@/api/login'
import { Constants } from '@/Constants'

export default {
  name: 'ResetPassword',
  data() {
    const validatePssword = (rule, value, callback) => {
      if (!isValidPassword(value)) {
        callback(new Error('密码最小长度为8位，必须包含大写、小写字母、数字！'))
      } else {
        if (this.resetPwdForm.confirmPassword !== '') {
          this.$refs.resetPwdForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validateconfirmPassword = (rule, value, callback) => {
      if (value !== this.resetPwdForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      resetPwdForm: {
        password: '',
        confirmPassword: ''
      },
      resetPwdRules: {
        password: [{ required: true, trigger: 'change', validator: validatePssword }],
        confirmPassword: [{ required: true, trigger: 'change', validator: validateconfirmPassword }]
      },
      // ! show_contents 0: 新密码表单页面；1：后台更新成功，提供登录页面链接。
      show_contents: 0,
      username: '',
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleResetPassword() {
      this.$refs.resetPwdForm.validate(valid => {
        if (valid) {
          this.loading = true
          const hash_code = this.$route.params.code
          const password = this.resetPwdForm.password

          resetPassword(hash_code, password)
            .then((data) => {
              this.loading = false
              if (data.code === Constants.SUCCESS) {
                this.$message({
                  type: 'info',
                  message: '密码修改成功，将返回登录页面',
                  duration: 3 * 1000
                })
                this.$router.replace({ name: 'login' })
              } else {
                this.$message({
                  type: 'info',
                  message: data.msg,
                  duration: 3 * 1000
                })
              }
            })
            .catch((error) => {
              this.loading = false
              console.log(error)
            })
        } else {
          return false
        }
      })
    }
    // handleGotoLogin() {
    //   // window.location.replace('http://127.0.0.1/login')
    //   this.$router.replace({
    //     name: 'login'
    //   })
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#fefefe;
$light_gray:#eee;
$dark_gray:#606266;
$border_gray: #DCDFE6;

/* reset element-ui css */
.reset-pwd-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $dark_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid $border_gray;
    background: transparent;
    border-radius: 5px;
    //color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#fefefe;
$light_gray:#eee;
$dark_gray:#606266;
$border_gray: #DCDFE6;

.reset-pwd-container {
  // position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .reset-pwd-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 15px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: $dark_gray;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $dark_gray;
    margin: 40px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
</style>
