<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-header py-responsive is-center">
        <h1 class="title">欢 迎</h1>
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form container-sm px-responsive" label-position="left">
        <el-form-item prop="userphone">
          <span class="svg-container">
            <svg-icon icon-class="icon_mobilephone" />
          </span>
          <el-input v-model="loginForm.userphone" name="userphone" type="text" placeholder="请用手机号登录" clearable />
        </el-form-item>
        <el-form-item ref="password_item" prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input :type="pwdType" v-model="loginForm.password" name="password" placeholder="请输入密码" clearable />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <div style="margin: 0px 0px 15px 0px; color: #409EFF;"><router-link to="/forgot_password">忘记密码？</router-link></div>
          </el-col>
          <el-col :span="10">
            <div style="margin: 0px 0px 15px 0px; color: #409EFF;text-align:right"><router-link to="/active_mail">激活账号</router-link></div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import { Config } from '@/Freeair_App_Config'

export default {
  name: 'Login',
  data() {
    const regexPhone = Config.REGEX_POHONE
    const validateUserphone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号！'))
      } else if (!regexPhone.test(value)) {
        callback(new Error('请输入11位有效的手机号！'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userphone: '',
        password: ''
      },
      loginRules: {
        userphone: [{ required: true, trigger: 'change', validator: validateUserphone }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }]
      },
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            })
            .catch((error) => {
              this.loading = false
              this.$refs.password_item.resetField()
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/_free_variables.scss";
@import "src/styles/_layout.scss";

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    // height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      border-radius: 0px;
      // padding: 12px 5px 12px 15px;
      // color: $dark_gray;
      // height: 47px;
      // &:-webkit-autofill {
      //   -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
      //   -webkit-text-fill-color: #fff !important;
      // }
    }
  }
  .el-form-item {
    border: 1px solid $border_gray;
    background: transparent;
    border-radius: 5px;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/_free_variables.scss";
@import "src/styles/_layout.scss";

.login-wrapper {
  width: 100%;
  height: 100%;
  background-color:  $bg-gray-light;
}
.login-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 15%;
}

.title {
  font-weight: 400;
  color: $title-color;
}

.svg-container {
  padding: 0px 8px 0px 16px;
  vertical-align: middle;
  display: inline-block;
}

.show-pwd {
  color: $gray;
  cursor: pointer;
  user-select: none;
}

</style>
