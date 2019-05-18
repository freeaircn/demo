<template>
  <div class="reset-pwd-wrapper">
    <div class="reset-pwd-container mb-4">
      <div class="reset-pwd-header py-responsive is-center">
        <router-link to="/home"><span><svg-logo logo-class="be_green" /></span></router-link>
        <h2 class="title">设置新密码</h2>
        <p>用户：{{ user }}</p>
      </div>

      <el-form ref="resetPwdForm" :model="resetPwdForm" :rules="resetPwdRules" class="container-sm px-responsive" label-position="left">
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model="resetPwdForm.password" name="password" placeholder="输入新密码" show-password clearable />
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model="resetPwdForm.confirmPassword" name="confirmPassword" placeholder="再次输入新密码" show-password clearable />
        </el-form-item>
        <div style="margin: 0px 0px 15px 0px; color: #409EFF;"><router-link to="/login">去登录</router-link></div>

        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleResetPassword">提 交</el-button>
        </el-form-item>
        <div class="tips">
          <p>密码请勿包含银行账号或支付软件密码</p>
        </div>
      </el-form>
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
      loading: false,
      redirect: undefined,
      user: ''
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
  created: function() {
    this.user = this.$route.params.uid
  },
  methods: {
    handleResetPassword() {
      this.$refs.resetPwdForm.validate(valid => {
        if (valid) {
          this.loading = true
          const hash_code = this.$route.params.hash_code
          const password = this.resetPwdForm.password

          resetPassword(hash_code, password)
            .then((data) => {
              this.loading = false
              if (data.code === Constants.SUCCESS) {
                this.$message({
                  type: 'info',
                  message: '密码修改成功，请重新登录',
                  duration: 3 * 1000
                })
                // 路由history 要replace
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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

/* reset element-ui css */
.reset-pwd-container {
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

.reset-pwd-wrapper {
  width: 100%;
  height: 100%;
  background-color:  $bg-gray-light;
}
.reset-pwd-container {
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
.tips {
  font-size: 14px;
  color: $text-light-color;
  text-align: left;
}
</style>
