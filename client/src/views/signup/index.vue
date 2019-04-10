<template>
  <div class="signup-wrapper">
    <div class="signup-container">
      <div class="signup-header py-responsive is-center">
        <h1 class="title">欢迎加入我们</h1>
      </div>

      <div class="form-baseinfo-container">
        <el-form ref="formBaseInfo" :model="formBaseInfo" :rules="formBaseInfoRules" class="signup-form container-sm px-responsive" label-position="left" >

          <el-form-item ref="email" prop="email" >
            <span class="svg-container">
              <svg-icon icon-class="icon_dmail_fill" />
            </span>
            <el-input v-model="formBaseInfo.email" :disabled="isValidated === true" name="email" type="text" placeholder="电子邮箱" clearable @blur="checkInfo('email')" />
          </el-form-item>

          <el-form-item v-show="isValidated === false" prop="verificationCode">
            <span class="svg-container">
              <svg-icon icon-class="verification_code" />
            </span>
            <el-input v-model="formBaseInfo.verificationCode" type="text" name="verificationCode" placeholder="输入验证码" clearable />
            <el-button type="primary" style="border: 0px; padding: 12px 4px; float: right;" @click.native.prevent="handleRequestCode">获取验证码</el-button>
          </el-form-item>

          <el-form-item v-show="isValidated === true" ref="userphone" prop="userphone" >
            <span class="svg-container">
              <svg-icon icon-class="icon_mobilephone" />
            </span>
            <el-input v-model="formBaseInfo.userphone" name="userphone" type="text" placeholder="手机号" clearable @blur="checkInfo('phone')" />
          </el-form-item>

          <el-form-item v-show="isValidated === true" prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input :type="pwdType" v-model="formBaseInfo.password" name="password" placeholder="密码" clearable />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <el-form-item v-show="isValidated === true" prop="confirmPassword">
            <span class="svg-container">
              <svg-icon icon-class="password2" />
            </span>
            <el-input :type="pwdType" v-model="formBaseInfo.confirmPassword" name="confirmPassword" placeholder="确认密码" clearable />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <div style="margin: 0px 0px 15px 0px; color: #409EFF;"><router-link to="/login">已有账号？去登录</router-link></div>

          <el-button v-show="isValidated === false" :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleVerification">验 证</el-button>
          <el-button v-show="isValidated === true" :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleCreateUser">注 册</el-button>

          <div class="tips">
            <p>1. 请用户输入手机号和电子邮箱</p>
            <p>2. 注册后，系统将发送账户激活邮件至用户登记的电子邮箱</p>
            <p>3. 激活后，用户将使用手机号登录</p>
            <p>4. 请勿用银行密码和支付软件密码作为该账号密码</p>
          </div>
        </el-form>
      </div>

      <!-- <div v-show="activeStep === 1" class="form-moreinfo-container">
        <el-form ref="formMoreInfo" :model="formMoreInfo" :rules="formMoreInfoRules" class="signup-form container-sm px-responsive" label-position="right" >
          <el-form-item prop="username" >
            <el-input v-model="formMoreInfo.username" name="username" type="text" placeholder="中文姓名" clearable />
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="formMoreInfo.gender">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="党派" prop="parties">
            <el-radio-group v-model="formMoreInfo.parties">
              <el-radio label="1">无党派</el-radio>
              <el-radio label="2">中共党员</el-radio>
              <el-radio label="3">其他党派</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item prop="company">
            <el-select v-model="formMoreInfo.company" placeholder="请选择所属公司">
              <el-option label="保山能源发展股份有限公司" value="1" />
            </el-select>
          </el-form-item>

          <el-form-item prop="deptLevel1">
            <el-select v-model="formMoreInfo.deptLevel1" placeholder="请选择所属电厂">
              <el-option label="松山河口电厂" value="1"/>
              <el-option label="苏家河口电厂" value="2"/>
            </el-select>
          </el-form-item>

          <el-form-item prop="deptLevel2">
            <el-select v-model="formMoreInfo.deptLevel2" placeholder="请选择所属班组">
              <el-option label="检修班" value="1"/>
              <el-option label="运行一班" value="2"/>
              <el-option label="运行二班" value="3"/>
              <el-option label="运行三班" value="4"/>
              <el-option label="运行四班" value="5"/>
              <el-option label="运行五班" value="6"/>
              <el-option label="办公室" value="7"/>
            </el-select>
          </el-form-item>

          <el-form-item prop="job">
            <el-select v-model="formMoreInfo.job" placeholder="请选择职务">
              <el-option label="检修员" value="1"/>
              <el-option label="运行员" value="2"/>
              <el-option label="班长" value="3"/>
            </el-select>
          </el-form-item>

          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <div class="grid-content">
                <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleMoreInfo">提 交</el-button>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content">
                <el-button :loading="loading" style="width:100%;" @click.native.prevent="handleResetMoreInfo">清 空</el-button>
              </div>
            </el-col>
          </el-row>

        </el-form>
      </div>

      <div v-show="activeStep === 2">
        <h3 style="color:#2d8cf0; text-align:center; margin: 20px;">完成注册</h3>
        <div class="signup-form">
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleToLogin">去登录</el-button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import { Message } from 'element-ui'
import { isPhoneExisting, isEmailExisting, createUser, logUserInfo } from '@/api/signup'
import { Constants } from '@/Constants'
import { Config } from '@/Freeair_App_Config'

export default {
  name: 'Signup',
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
    const regexMail = Config.REGEX_MAIL
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电子邮箱！'))
      } else if (!regexMail.test(value)) {
        callback(new Error('邮箱地址有误！'))
      } else {
        callback()
      }
    }
    const regexPassword = Config.REGEX_PASSWORD
    const validatePssword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!regexPassword.test(value)) {
        callback(new Error('密码最小长度为8位，必须包含大写、小写字母、数字！'))
      } else {
        if (this.formBaseInfo.confirmPassword !== '') {
          this.$refs.formBaseInfo.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validateconfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formBaseInfo.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const regexZhChar = Config.REGEX_ZH_CHAR
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入中文姓名！'))
      } else if (!regexZhChar.test(value)) {
        callback(new Error('有效姓名：2~5个中文！'))
      } else {
        callback()
      }
    }
    return {
      isValidated: true,

      activeStep: 0,
      formBaseInfo: {
        userphone: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      formBaseInfoRules: {
        userphone: [{ required: true, trigger: 'change', validator: validateUserphone }],
        email: [{ required: true, trigger: 'change', validator: validateEmail }],
        password: [{ required: true, trigger: 'change', validator: validatePssword }],
        confirmPassword: [{ required: true, trigger: 'change', validator: validateconfirmPassword }]
      },
      userid: '',
      //
      formMoreInfo: {
        username: '',
        gender: '',
        parties: '',
        company: '',
        deptLevel1: '',
        deptLevel2: '',
        job: ''
      },
      formMoreInfoRules: {
        username: [{ required: true, trigger: 'change', validator: validateUsername }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        parties: [{ required: true, message: '请选择党派', trigger: 'change' }],
        company: [{ required: true, message: '请选择公司', trigger: 'change' }],
        deptLevel1: [{ required: true, message: '请选择电厂', trigger: 'change' }],
        deptLevel2: [{ required: true, message: '请选择班组', trigger: 'change' }],
        job: [{ required: true, message: '请选择职务', trigger: 'change' }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  computed: {
    emailLowcase: function() {
      return this.formBaseInfo.email.toLowerCase()
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
    checkInfo(infoItem) {
      const userPhone = this.formBaseInfo.userphone
      const regexPhone = Config.REGEX_POHONE
      const email = this.emailLowcase
      const regexMail = Config.REGEX_MAIL

      switch (infoItem) {
        case 'phone':
          if (regexPhone.test(userPhone)) {
            isPhoneExisting(userPhone)
              .then(function(data) {
                // console.log(data)
                if (data.code === Constants.USERS_SIGNUP_IDENTITY_EXISTING) {
                  this.$refs.userphone.resetField()
                  Message({
                    message: userPhone + data.msg,
                    showClose: true,
                    type: 'error',
                    duration: 3 * 1000
                  })
                }
              }.bind(this))
              .catch(function(err) {
                console.log(err)
              })
          }
          break
        case 'email':
          if (regexMail.test(email)) {
            isEmailExisting(email)
              .then(function(data) {
                if (data.code === Constants.USERS_SIGNUP_EMAIL_EXISTING) {
                  this.$refs.email.resetField()
                  Message({
                    message: email + data.msg,
                    showClose: true,
                    type: 'error',
                    duration: 3 * 1000
                  })
                }
              }.bind(this))
              .catch(function(err) {
                console.log(err)
              })
          }
          break
        default:
          break
      }
    },

    handleCreateUser() {
      this.$refs.formBaseInfo.validate((valid) => {
        if (valid) {
          const phone = this.formBaseInfo.userphone
          const email = this.emailLowcase
          const password = this.formBaseInfo.password
          this.$confirm('请核对信息' + phone + '，' + email + ' 是否正确?', '提示', {
            confirmButtonText: '正确',
            cancelButtonText: '返回',
            type: 'warning'
          }).then(() => {
            createUser(phone, email, password)
              .then(function(data) {
                if (data.code === Constants.SUCCESS) {
                  this.userid = data.userid
                  this.activeStep += 1
                } else if (data.code === Constants.USERS_SIGNUP_USER_CREATE_FAILED) {
                  Message({
                    message: data.msg,
                    showClose: true,
                    type: 'error',
                    duration: 3 * 1000
                  })
                }
              }.bind(this))
              .catch(function(err) {
                console.log(err)
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消注册'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    handleResetBaseInfo() {
      this.$refs.formBaseInfo.resetFields()
    },

    handleMoreInfo() {
      this.$refs.formMoreInfo.validate((valid) => {
        if (valid) {
          const userid = this.userid
          const username = this.formMoreInfo.username
          const gender = this.formMoreInfo.gender
          const parties = this.formMoreInfo.parties
          const company = this.formMoreInfo.company
          const deptLevel1 = this.formMoreInfo.deptLevel1
          const deptLevel2 = this.formMoreInfo.deptLevel2
          const job = this.formMoreInfo.job

          logUserInfo(userid, username, gender, parties, company, deptLevel1, deptLevel2, job)
            .then(function(data) {
              if (data.code === Constants.SUCCESS) {
                this.activeStep += 1
              } else if (data.code === Constants.USERS_SIGNUP_LOG_USER_INFO_FAILED) {
                Message({
                  message: data.msg,
                  showClose: true,
                  type: 'error',
                  duration: 3 * 1000
                })
              }
            }.bind(this))
            .catch(function(err) {
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    handleResetMoreInfo() {
      this.$refs.formMoreInfo.resetFields()
    },

    handleToLogin() {
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/_free_variables.scss";
@import "src/styles/_layout.scss";

/* reset element-ui css */
.form-baseinfo-container {
  .el-form-item {
    // width  : 100%;
    background: transparent;
    border: 1px solid $border_gray;
    border-radius: 5px;
  }
  .el-input {
    display: inline-block;
    width  : 60%;
    input {
      background        : transparent;
      border            : 0px;
      border-radius     : 0px;
      // padding           : 5px;
      // color             : $dark_gray;
      // height            : 47px;
      // -webkit-appearance: none;
      // &:-webkit-autofill {
      //   -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
      //   -webkit-text-fill-color: #fff !important;
      // }
    }
  }
}

.form-moreinfo-container {
  .el-select {
    display: inline-block;
    width  : 100%;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/_free_variables.scss";
@import "src/styles/_layout.scss";

.signup-wrapper {
  width: 100%;
  height: 100%;
  background-color:  $bg-gray-light;
}
.signup-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 10%;
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
  margin-left: 8px;
  margin-right: 8px;
  float: right;
}

.tips {
  font-size: 14px;
  color: $text-light-color;
  text-align: left;
}
</style>
