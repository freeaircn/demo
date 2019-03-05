<template>
  <div class="signup-container">
    <!-- <div class="logo-container">
      <svg-logo logo-class="main_logo" />
    </div> -->
    <h3 class="title">欢迎加入我们</h3>

    <el-steps :active="activeStep" class="signup-steps" finish-status="success">
      <el-step title="步骤1" description="新建用户" />
      <el-step title="步骤2" description="用户信息" />
      <el-step title="步骤3" description="完成" />
    </el-steps>

    <div v-if="activeStep === 0">
      <el-form ref="form1" :model="form1" :rules="form1Rules" class="signup-form" label-position="left" >
        <el-form-item prop="userphone">
          <span class="svg-container">
            <svg-icon icon-class="icon_mobilephone" />
          </span>
          <el-input v-model="form1.userphone" name="userphone" type="text" placeholder="手机号" clearable @blur="sendPhone" />
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
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleCreateAccount">创建</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="activeStep === 1">
      <el-form ref="form2" :model="form2" :rules="form2Rules" class="signup-form" label-position="left" >
        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleTodo">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="activeStep === 2">
      <el-form ref="form3" :model="form3" class="signup-form" label-position="left" >
        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleTodo">完成</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tips">
      <p style="margin-right:20px;">:)</p>
    </div>

  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import { isPhoneExisting } from '@/api/signup'

export default {
  name: 'Signup',
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
        userphone: [{ required: true, trigger: 'change', validator: validateUserphone }],
        password: [{ required: true, trigger: 'change', validator: validatePssword }],
        confirmPassword: [{ required: true, trigger: 'change', validator: validateconfirmPassword }]
      },
      //
      form2: {

      },
      form2Rules: {

      },
      form3: {

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
    sendPhone() {
      const userPhone = this.form1.userphone
      const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (phoneReg.test(userPhone)) {
        isPhoneExisting(userPhone)
          .then(function(data) {
            // const data = res.data
            console.log(data)
            // if (data.state === Constants.AUTH_SUCCESS) {
            //   this.curStep += 1
            // } else if (data.state === Constants.AUTH_REGISTER_DUPLICATED_IDENTITY) {
            //   this.$Message.error('输入的手机号已是注册用户，请输入新的手机号!')
            // }
          }.bind(this))
          .catch(function(err) {
            console.log(err)
          })
      }
    },

    handleCreateAccount() {
      this.$refs.form1.validate((valid) => {
        if (valid) {
          if (this.activeStep > 2) {
            this.activeStep = 0
          } else {
            this.activeStep += 1
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    handleTodo() {
      if (this.activeStep > 2) {
        this.activeStep = 0
      } else {
        this.activeStep += 1
      }
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
$bg         : #fefefe;
$light_gray : #eee;
$dark_gray  : #606266;
$border_gray: #DCDFE6;

/* reset element-ui css */
.signup-container {
  .el-input {
    display: inline-block;
    height : 47px;
    width  : 85%;
    input {
      background        : transparent;
      border            : 0px;
      -webkit-appearance: none;
      border-radius     : 0px;
      padding           : 5px;
      color             : $dark_gray;
      height            : 47px;
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
    // margin: 30px;
    // color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#fefefe;
$light_gray:#eee;
$dark_gray:#606266;
$border_gray: #DCDFE6;

.signup-container {
  // position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  // .logo-container {
  //   margin: 5% auto 10px auto;
  //   color: $dark_gray;
  //   text-align: center;
  //   width: 100%;
  //   height: 60px;
  //   display: block;
  // }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $dark_gray;
    // margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .signup-steps {
    left: 0;
    right: 0;
    width: 450px;
    max-width: 80%;
    margin: 20px auto;
  }
  .signup-form {
    // position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 15px 35px 15px 35px;
    margin: 20px auto;
  }
  .tips {
    font-size: 14px;
    color: $dark_gray;
    text-align: center;
    margin: 10px auto 10px auto;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
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
