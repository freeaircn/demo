<template>
  <div class="active-container">
    <el-form ref="activeForm" :model="activeForm" :rules="activenRules" class="active-form" label-position="left">
      <h3 class="title">激 活</h3>
      <el-form-item prop="userphone">
        <span class="svg-container">
          <svg-icon icon-class="icon_mobilephone" />
        </span>
        <el-input v-model="activeForm.userphone" name="userphone" type="text" placeholder="输入注册的手机号" clearable />
      </el-form-item>

      <el-form-item ref="email" prop="email" >
        <span class="svg-container">
          <svg-icon icon-class="icon_dmail_fill" />
        </span>
        <el-input v-model="activeForm.email" name="email" type="text" placeholder="输入注册的电子邮箱" clearable />
      </el-form-item>

      <div style="margin: 0px 0px 15px 0px; color: #409EFF;"><router-link to="/login">去登录</router-link></div>

      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleActive">发送激活邮件</el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">:)</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { active } from '@/api/login'
// import { Constants } from '@/Constants'

export default {
  name: 'ActiveUser',
  data() {
    const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    const validateUserphone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号！'))
      } else if (!phoneReg.test(value)) {
        callback(new Error('请输入11位有效的手机号！'))
      } else {
        callback()
      }
    }
    const emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
    // const emailReg = /^[a-z0-9]*$/
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电子邮箱！'))
      } else if (!emailReg.test(value)) {
        callback(new Error('邮箱地址有误！'))
      } else {
        callback()
      }
    }
    return {
      activeForm: {
        userphone: '',
        email: ''
      },
      activenRules: {
        userphone: [{ required: true, trigger: 'change', validator: validateUserphone }],
        email: [{ required: true, trigger: 'change', validator: validateEmail }]
      },
      loading: false,
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
    handleActive() {
      this.$refs.activeForm.validate(valid => {
        if (valid) {
          this.loading = true
          const userphone = this.activeForm.userphone
          const email = this.activeForm.email

          active(userphone, email)
            .then((data) => {
              this.loading = false
              console.log(data)
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
.active-container {
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

.active-container {
  // position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .active-form {
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
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
</style>
