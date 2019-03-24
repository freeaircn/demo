<template>
  <div class="reset-pwd-container">
    <div v-show="show_contents === 0">
      <el-form ref="resetPwdForm" :model="resetPwdForm" :rules="resetPwdRules" class="reset-pwd-form" label-position="left">
        <h3 class="title">新密码</h3>

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
          <el-input :type="pwdType" v-model="resetPwdForm.confirmPassword" name="confirmPassword" placeholder="确认新密码" clearable />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleResetPassword">提交新密码</el-button>
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
          <span style="margin:20px 0px 20px 0px; text-align:left">新密码提交成功，用户请重新登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resetPassword } from '@/api/login'
import { Constants } from '@/Constants'
import { Config } from '@/Freeair_App_Config'

export default {
  name: 'ResetPassword',
  data() {
    const regexPassword = Config.REGEX_PASSWORD
    const validatePssword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (!regexPassword.test(value)) {
        callback(new Error('密码最小长度为8位，必须包含大写、小写字母、数字！'))
      } else {
        if (this.resetPwdForm.confirmPassword !== '') {
          this.$refs.resetPwdForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validateconfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.resetPwdForm.password) {
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
      validate_code: '',
      // ! show_contents 0: 新密码表单页面；1：后台更新成功，提供登录页面链接。
      show_contents: 0,
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
          const password = this.resetPwdForm.password
          const validate_code = this.validate_code

          resetPassword(validate_code, password)
            .then((data) => {
              console.log(data)
              this.loading = false
              this.$message({
                type: 'info',
                message: data.msg,
                duration: 3 * 1000
              })

              if (data.code === Constants.SUCCESS) {
                // this.btn_name = '返回登录页面'
                // const mailServerReg = /@([a-z1-9]{2,3})/
                // const mailServer = mailServerReg.exec(this.emailLowcase)
                // if (mailServer !== null && mailServer[0] === '@163') {
                //   this.mailServerUrl = Config.MAIL_163_URL
                //   this.btn_name = '登录邮箱'
                // }
                // if (mailServer !== null && mailServer[0] === '@126') {
                //   this.mailServerUrl = Config.MAIL_126_URL
                //   this.btn_name = '登录邮箱'
                // }
                // if (mailServer !== null && mailServer[0] === '@qq') {
                //   this.mailServerUrl = Config.MAIL_QQ_URL
                //   this.btn_name = '登录邮箱'
                // }
                this.show_contents = 1
              }
            })
            .catch((error) => {
              this.loading = false
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleGotoLogin() {
      // window.location.replace('http://127.0.0.1/login')
      this.$router.replace({
        name: 'login'
      })
    }
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
