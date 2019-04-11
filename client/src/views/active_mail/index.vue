<template>
  <div class="active-mail-container">
    <div v-show="show_contents === 0">
      <el-form ref="activeMailForm" :model="activeMailForm" :rules="activeMailRules" class="active-mail-form" label-position="left">
        <h3 class="title">激 活</h3>
        <el-form-item prop="userphone">
          <span class="svg-container">
            <svg-icon icon-class="icon_mobilephone" />
          </span>
          <el-input v-model="activeMailForm.userphone" name="userphone" type="text" placeholder="输入注册的手机号" clearable />
        </el-form-item>

        <el-form-item ref="email" prop="email" >
          <span class="svg-container">
            <svg-icon icon-class="icon_dmail_fill" />
          </span>
          <el-input v-model="activeMailForm.email" name="email" type="text" placeholder="输入注册的电子邮箱" clearable />
        </el-form-item>

        <div style="margin: 0px 0px 15px 0px; color: #409EFF;"><router-link to="/login">去登录</router-link></div>

        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRequestActiveMail">发送激活邮件</el-button>
        </el-form-item>
        <div class="tips">
          <span style="margin-right:20px;">:)</span>
        </div>
      </el-form>
    </div>

    <div v-show="show_contents === 1">
      <div class="active-mail-form">
        <h3 class="title">激 活</h3>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleGotoLogin">去登录</el-button>
        <hr align="center" width="100%" color="#DCDFE6" size="1" >
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleGoback">返回激活其他账号</el-button>
      </div>
    </div>

    <div v-show="show_contents === 2">
      <div class="active-mail-form">
        <h3 class="title">激 活</h3>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleGotoMailBox">{{ btn_name }}</el-button>
        <hr align="center" width="100%" color="#DCDFE6" size="1" >
        <div class="tips">
          <span style="margin:20px 0px 20px 0px; text-align:left">请用户登录自己的邮箱，点击激活邮件中的链接激活账号</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isValidPhone, isValidEmail } from '@/utils/validate'
import { getMailServerUrl } from '@/utils/auth'
import { requestActiveMail } from '@/api/login'
import { Constants } from '@/Constants'

export default {
  name: 'ActiveMail',
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
        callback(new Error('请输入有效的邮箱！'))
      } else {
        callback()
      }
    }
    return {
      activeMailForm: {
        userphone: '',
        email: ''
      },
      activeMailRules: {
        userphone: [{ required: true, trigger: 'change', validator: validateUserphone }],
        email: [{ required: true, trigger: 'change', validator: validateEmail }]
      },
      loading: false,
      // ! show_contents 0: 用户信息表单页面；1：用户已激活，提供登录页面链接/返回激活页面链接；2：后台已发送激活邮件，提供登录邮箱链接。
      show_contents: 0,
      mailServerUrl: '',
      btn_name: '返回登录页面',
      redirect: undefined
    }
  },
  computed: {
    emailLowcase: function() {
      return this.activeMailForm.email.toLowerCase()
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
    handleRequestActiveMail() {
      this.$refs.activeMailForm.validate(valid => {
        if (valid) {
          this.loading = true
          const userphone = this.activeMailForm.userphone
          const email = this.emailLowcase

          requestActiveMail(userphone, email)
            .then((data) => {
              console.log(data)
              this.loading = false
              this.$message({
                type: 'info',
                message: data.msg,
                duration: 3 * 1000
              })

              if (data.code === Constants.USERS_ACTIVATE_USER_BEEN_ACTIVATED) {
                this.show_contents = 1
              }
              if (data.code === Constants.SUCCESS) {
                this.btn_name = '返回登录页面'
                const url = getMailServerUrl(this.emailLowcase)
                if (url) {
                  this.mailServerUrl = url
                  this.btn_name = '登录邮箱'
                }
                this.show_contents = 2
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
      this.$router.push({
        name: 'login'
      })
    },
    handleGoback() {
      // ! 重置了表单域
      this.$refs.activeMailForm.resetFields()
      this.show_contents = 0
    },
    handleGotoMailBox() {
      if (this.mailServerUrl === '') {
        this.$router.push({
          name: 'login'
        })
      } else {
        // ! 重置data
        this.$refs.activeMailForm.resetFields()
        window.location.replace(this.mailServerUrl)
        this.mailServerUrl = ''
      }
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
.active-mail-container {
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

.active-mail-container {
  // position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .active-mail-form {
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
