<template>
  <div class="forgot-pwd-wrapper">
    <div class="forgot-pwd-container mb-4">
      <div class="forgot-pwd-header py-responsive is-center">
        <router-link to="/home"><span><svg-logo logo-class="be_green" /></span></router-link>
        <h2 class="title">忘记密码</h2>
      </div>

      <el-form ref="forgotPwdForm" :model="forgotPwdForm" :rules="forgotPwdRules" class="container-sm px-responsive" label-position="left">
        <el-form-item prop="userphone">
          <span class="svg-container">
            <svg-icon icon-class="icon_mobilephone" />
          </span>
          <el-input v-model="forgotPwdForm.userphone" name="userphone" type="text" placeholder="输入注册的手机号" clearable />
        </el-form-item>

        <el-form-item ref="email" prop="email" >
          <span class="svg-container">
            <svg-icon icon-class="icon_dmail_fill" />
          </span>
          <el-input v-model="forgotPwdForm.email" name="email" type="text" placeholder="输入注册的电子邮箱" clearable />
        </el-form-item>

        <div style="margin: 0px 0px 15px 0px; color: #409EFF;"><router-link to="/login">去登录</router-link></div>

        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleForgotPassword">忘记密码</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import { isValidPhone, isValidEmail } from '@/utils/validate'
import { getMailServerUrl, wait5sOpenUrl } from '@/utils/common'
import { forgotPassword } from '@/api/login'
import { Constants } from '@/Constants'

export default {
  name: 'ForgotPassword',
  data() {
    const validateUserphone = (rule, value, callback) => {
      if (!isValidPhone(value)) {
        callback(new Error('请输入11位有效的手机号！'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!isValidEmail(value)) {
        callback(new Error('邮箱地址有误！'))
      } else {
        callback()
      }
    }
    return {
      forgotPwdForm: {
        userphone: '',
        email: ''
      },
      forgotPwdRules: {
        userphone: [{ required: true, trigger: 'change', validator: validateUserphone }],
        email: [{ required: true, trigger: 'change', validator: validateEmail }]
      },
      loading: false,
      redirect: undefined
    }
  },
  computed: {
    emailLowcase: function() {
      return this.forgotPwdForm.email.toLowerCase()
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
    handleForgotPassword() {
      this.$refs.forgotPwdForm.validate(valid => {
        if (valid) {
          this.loading = true
          const userphone = this.forgotPwdForm.userphone
          const email = this.emailLowcase

          forgotPassword(userphone, email)
            .then(function(data) {
              this.loading = false
              if (data.code !== Constants.SUCCESS) {
                this.$message({
                  type: 'info',
                  message: data.msg,
                  duration: 3 * 1000
                })
              }
              if (data.code === Constants.SUCCESS) {
                const url = getMailServerUrl(this.emailLowcase)
                if (url) {
                  this.$message({
                    type: 'info',
                    message: '已发送邮件，5秒后将切换到邮箱登录页面',
                    duration: 4 * 1000
                  })
                  // TODO: 路由 replace
                  wait5sOpenUrl(url, 'replace')
                } else {
                  this.$message({
                    type: 'info',
                    message: '已发送邮件，请登用户录邮箱点击重置密码链接',
                    duration: 4 * 1000
                  })
                  // TODO: 路由 replace
                  this.$router.replace({ name: 'login' })
                }
              }
            }.bind(this))
            .catch((error) => {
              this.loading = false
              console.log(error)
            })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

/* reset element-ui css */
.forgot-pwd-container {
  .el-form-item {
    background: transparent;
    border: 1px solid $border_gray;
    border-radius: 5px;
  }
  .el-input {
    display: inline-block;
    width  : 85%;
    input {
      background        : transparent;
      border            : 0px;
      border-radius     : 0px;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>

.forgot-pwd-wrapper {
  width: 100%;
  height: 100%;
  background-color:  $bg-gray-light;
}
.forgot-pwd-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 10%;
}
.title {
  font-weight: 400;
  color: $title-color;
  letter-spacing: 6px;
}
.svg-container {
  padding: 0px 8px 0px 16px;
  vertical-align: middle;
  display: inline-block;
}
.show-pwd {
  width: 30px;
  padding-left: 8px;
  padding-right: 8px;
  color: $gray;
  cursor: pointer;
  user-select: none;
  float: right;
}
</style>
