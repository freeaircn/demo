<template>
  <div class="signup-container">
    <el-steps :active="activeStep" finish-status="success" align-center>
      <el-step title="步骤1" description="新建用户" />
      <el-step title="步骤2" description="用户信息" />
      <el-step title="步骤3" description="完成" />
    </el-steps>

    <el-form ref="form1" :model="form1" :rules="form1Rules" class="signup-form" label-position="left" @validate="form1ValidateEvent" >
      <div class="logo-container">
        <svg-icon icon-class="logo" />
      </div>
      <h3 class="title">
        欢迎加入我们
      </h3>

      <el-form-item prop="userphone">
        <span class="svg-container">
          <svg-icon icon-class="icon_mobilephone" />
        </span>
        <el-input v-model="form1.userphone" name="userphone" type="text" placeholder="手机号" clearable />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="form1.password"
          name="password"
          placeholder="密码"
          clearable />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="confirmPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="form1.confirmPassword"
          name="confirmPassword"
          placeholder="确认密码"
          clearable />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleCreateAccount">
          下一步
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">:)</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'signup',
  data() {
    const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    const validateUserphone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号！'))
      } else if (!phoneReg.test(value)) {
        callback(new Error('请输入11位合法的手机号！'))
      } else {
        callback()
      }
    }
    const pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
    const validatePssword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!pwdReg.test(value)) {
        callback(new Error('密码最小长度为8位，必须包含大写、小写字母、数字！'))
      } else {
        if (this.form1.confirmPassword !== '') {
          this.$refs.form1.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validateconfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form1.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      activeStep: 0,
      form1: {
        userphone: '',
        password: '',
        confirmPassword: ''
      },
      form1Rules: {
        userphone: [{ required: true, trigger: 'blur', validator: validateUserphone }],
        password: [
          { required: true, trigger: 'blur', validator: validatePssword }
        ],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validateconfirmPassword }]
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

    form1ValidateEvent(formItem, isValidate) {
      if (formItem === 'userphone' && isValidate) {
        this.$message('Goto check phone')
      }
    },

    handleCreateAccount() {
      this.activeStep += 1
    },

    handleCreateAccount2() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
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
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.signup-container {
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
      // color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 1);
    border: 1px solid #ddd;
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    // color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.signup-container {
  position: fixed;
  height: 100%;
  width: 100%;
  // background-color: $bg;
  .signup-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    // color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .logo-container {
    padding: 6px;
    // color: $dark_gray;
    text-align: center;
    width: 100%;
    height: 100%;
    display: block;
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
    // color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
