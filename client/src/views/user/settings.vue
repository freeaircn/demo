<template>
  <div class="content-wrapper">
    <div class="content-container py-3">
      <el-tabs v-loading="content_loading" type="card" class="container-sm px-responsive">
        <el-tab-pane label="个人信息">
          <el-form ref="profile_form" :model="profile" :rules="profileRules" label-position="right" >
            <el-form-item prop="username" >
              <el-input v-model="profile.username" name="username" type="text" placeholder="中文姓名" clearable @change="profileItemChange()" />
            </el-form-item>

            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="profile.gender" @change="profileItemChange()">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="党派" prop="political_party">
              <el-radio-group v-model="profile.political_party" @change="profileItemChange()">
                <el-radio label="1">无党派</el-radio>
                <el-radio label="2">中共党员</el-radio>
                <el-radio label="3">其他党派</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item prop="company">
              <el-select v-model="profile.company" placeholder="请选择所属公司" @change="profileItemChange()">
                <el-option label="保山能源发展股份有限公司" value="1" />
              </el-select>
            </el-form-item>

            <el-form-item prop="subcompany">
              <el-select v-model="profile.subcompany" placeholder="请选择子公司" @change="profileItemChange()">
                <el-option label="保山槟榔江水电开发有限公司" value="1"/>
                <el-option label="直属电厂" value="2"/>
              </el-select>
            </el-form-item>

            <el-form-item prop="station">
              <el-select v-model="profile.station" placeholder="请选择所属电厂" @change="profileItemChange()">
                <el-option label="松山河口电厂" value="1"/>
                <el-option label="苏家河口电厂" value="2"/>
              </el-select>
            </el-form-item>

            <el-form-item prop="department">
              <el-select v-model="profile.department" placeholder="请选择所属班组" @change="profileItemChange()">
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
              <el-select v-model="profile.job" placeholder="请选择职务" @change="profileItemChange()">
                <el-option label="检修员" value="1"/>
                <el-option label="运行员" value="2"/>
                <el-option label="班长" value="3"/>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button :disabled="isUpdateUserBtnDisable" type="primary" style="width:100%;" @click.native.prevent="handleUpdateUserProfile">更 新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="密码">
          <div class="pwd-container">
            <div class="is-left">
              <p class="p-text">更改密码</p>
            </div>
            <el-form ref="pwd_form" :model="pwdForm" :rules="pwdRules" label-position="right" >
              <el-form-item prop="oldPwd">
                <el-input v-model="pwdForm.oldPwd" placeholder="输入旧密码" show-password clearable />
              </el-form-item>

              <el-form-item prop="newPwd">
                <el-input v-model="pwdForm.newPwd" placeholder="输入新密码" show-password clearable />
              </el-form-item>

              <el-form-item prop="newConfirm">
                <el-input v-model="pwdForm.newConfirm" placeholder="再次输入新密码" show-password clearable />
              </el-form-item>

              <el-form-item>
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleUpdatePassword">更改密码</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="邮箱">
          <div class="email-container">
            <div class="is-left">
              <p class="p-text">注册邮箱 {{ email }}</p>
            </div>
            <el-form ref="email_form" :model="emailForm" :rules="emailRules" label-position="right" >
              <el-form-item ref="newEmail" prop="newEmail">
                <el-input v-model="emailForm.newEmail" type="text" placeholder="输入新邮箱" clearable />
              </el-form-item>

              <el-form-item prop="verificationCode">
                <el-input v-model="emailForm.verificationCode" type="text" placeholder="输入验证码" clearable />
              </el-form-item>
              <input v-model="requestCodeBtnContent" :disabled="isReuqestCodeBtnDisable" type="button" class="btn-code" @click="handleRequestCode">

              <el-form-item>
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleUpdateEmail">更改邮箱</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="手机号">
          <div class="phone-container">
            <div class="is-left">
              <p class="p-text">注册手机号 {{ phone }}</p>
            </div>
            <el-form ref="phone_form" :model="phoneForm" :rules="phoneRules" label-position="right" >
              <el-form-item prop="newPhone">
                <el-input v-model="phoneForm.newPhone" type="text" placeholder="输入新手机号" clearable />
              </el-form-item>

              <el-form-item>
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleUpdatePhone">更改手机号</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { requestCode } from '@/api/signup'
import { requestUserInfo, updateUserProfile, updatePassword, updateEmail, updatePhone } from '@/api/user'
import { getMailServerUrl, wait5sOpenUrl } from '@/utils/common'
import { isValidChineseName, isValidPassword, isValidEmail, isValidCodeInput, isValidPhone } from '@/utils/validate'
import { Constants } from '@/Constants'

export default {
  name: 'UserSettings',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isValidChineseName(value)) {
        callback(new Error('请输入中文姓名(2~5个汉字)'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!isValidPassword(value)) {
        callback(new Error('密码最小长度为8位，必须包含大写、小写字母、数字！'))
      } else {
        if (this.pwdForm.newConfirm !== '') {
          this.$refs.pwd_form.validateField('newConfirm')
        }
        callback()
      }
    }
    const validateconfirmPassword = (rule, value, callback) => {
      if (value !== this.pwdForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
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
    const validateCode = (rule, value, callback) => {
      if (!isValidCodeInput(value)) {
        callback(new Error('请输入5位验证码！'))
      } else {
        callback()
      }
    }
    const validateUserphone = (rule, value, callback) => {
      if (!isValidPhone(value)) {
        callback(new Error('请输入11位有效的手机号！'))
      } else {
        callback()
      }
    }
    return {
      phone: '',
      email: '',
      account_active: '',
      account_detailed_done: '',
      //
      profile: {
        username: '',
        gender: '',
        political_party: '',
        company: '',
        subcompany: '',
        station: '',
        department: '',
        job: ''
      },
      profileRules: {
        username: [{ required: true, trigger: 'change', validator: validateUsername }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        political_party: [{ required: true, message: '请选择党派', trigger: 'change' }],
        company: [{ required: true, message: '请选择公司', trigger: 'change' }],
        subcompany: [{ required: true, message: '请选择子公司', trigger: 'change' }],
        station: [{ required: true, message: '请选择电厂', trigger: 'change' }],
        department: [{ required: true, message: '请选择班组', trigger: 'change' }],
        job: [{ required: true, message: '请选择职务', trigger: 'change' }]
      },
      pwdForm: {
        oldPwd: '',
        newPwd: '',
        newConfirm: ''
      },
      pwdRules: {
        oldPwd: [{ required: true, trigger: 'change', message: '请输入旧密码' }],
        newPwd: [{ required: true, trigger: 'change', validator: validatePassword }],
        newConfirm: [{ required: true, trigger: 'change', validator: validateconfirmPassword }]
      },
      emailForm: {
        newEmail: '',
        verificationCode: ''
      },
      emailRules: {
        newEmail: [{ required: true, trigger: 'change', validator: validateEmail }],
        verificationCode: [{ required: true, trigger: 'change', validator: validateCode }]
      },
      phoneForm: {
        newPhone: ''
      },
      phoneRules: {
        newPhone: [{ required: true, trigger: 'change', validator: validateUserphone }]
      },
      content_loading: true,
      isUpdateUserBtnDisable: true,
      isReuqestCodeBtnDisable: false,
      requestCodeBtnContent: '获取验证码',
      timer1s: null,
      countdown: 60,
      //
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
  mounted: function() {
    requestUserInfo()
      .then(function(data) {
        if (data.code === Constants.SUCCESS) {
          this.phone = data.phone
          this.email = data.email
          this.account_active = data.active
          this.account_detailed_done = data.detailed_info_done
          //
          this.profile.username = data.profile.username
          this.profile.gender = data.profile.gender
          this.profile.political_party = data.profile.political_party
          this.profile.company = data.profile.company
          this.profile.subcompany = data.profile.subcompany
          this.profile.station = data.profile.station
          this.profile.department = data.profile.department
          this.profile.job = data.profile.job
          //
          this.content_loading = false
        } else {
          this.$message({
            type: 'info',
            message: data.msg,
            showClose: true
          })
        }
      }.bind(this))
      .catch(function(err) {
        console.log(err)
        this.$message({
          type: 'info',
          message: '服务器响应超时，请重试！',
          showClose: true
        })
      })
  },
  methods: {
    profileItemChange() {
      this.isUpdateUserBtnDisable = false
    },

    handleUpdateUserProfile() {
      this.$refs.profile_form.validate((valid) => {
        if (valid) {
          updateUserProfile(this.profile)
            .then(function(data) {
              this.$message({
                type: 'info',
                message: data.msg,
                duration: 3 * 1000
              })
              if (data.code === Constants.SUCCESS) {
                this.isUpdateUserBtnDisable = true
                store.dispatch('GetUserProfile')
                  .then(() => {
                    console.log('update user profile')
                  }).catch(() => {
                    store.dispatch('FedLogOut').then(() => {
                      this.$message.error('请重新登录！')
                      this.$router.replace({ path: '/login' })
                    })
                  })
              }
            }.bind(this))
            .catch(function(err) {
              console.log(err)
              this.$message({
                type: 'info',
                message: '服务器响应超时，请重试！',
                duration: 3 * 1000
              })
            })
        } else {
          return false
        }
      })
    },

    handleUpdatePassword() {
      this.$refs.pwd_form.validate((valid) => {
        if (valid) {
          updatePassword(this.pwdForm.oldPwd, this.pwdForm.newPwd)
            .then(function(data) {
              if (data.code === Constants.SUCCESS) {
                this.$refs.pwd_form.resetFields()
              }
              this.$message({
                type: 'info',
                message: data.msg,
                duration: 3 * 1000
              })
            }.bind(this))
            .catch(function(err) {
              console.log(err)
              this.$message({
                type: 'info',
                message: '服务器响应超时，请重试！',
                duration: 3 * 1000
              })
            })
        } else {
          return false
        }
      })
    },

    // disable 获取验证码button
    diableRequestCodeBtn() {
      this.isReuqestCodeBtnDisable = true
      this.requestCodeBtnContent = '重新发送(' + this.countdown + ')'
      if (!this.timer1s) {
        this.timer1s = setInterval(() => {
          if (this.countdown > 0 && this.countdown <= 60) {
            this.countdown--
            if (this.countdown !== 0) {
              this.requestCodeBtnContent = '重新发送(' + this.countdown + ')'
            } else {
              clearInterval(this.timer1s)
              this.isReuqestCodeBtnDisable = false
              this.requestCodeBtnContent = '获取验证码'
              this.countdown = 60
              this.timer1s = null
            }
          }
        }, 1000)
      }
    },

    handleRequestCode() {
      this.$refs.email_form.validateField('newEmail')
      const isFieldValid = this.$refs.newEmail.validateMessage
      if (isFieldValid === '') {
        // 没变化，不提交
        if (this.emailForm.newEmail === this.email) {
          this.$message({
            type: 'info',
            message: '与正在使用的邮箱相同！',
            duration: 3 * 1000
          })
          return false
        }
        // disable 获取验证码button
        this.diableRequestCodeBtn()

        // 请求Server 发送验证码邮件
        requestCode(this.emailForm.newEmail)
          .then(function(data) {
            if (data.code === Constants.SUCCESS) {
              const url = getMailServerUrl(this.emailForm.newEmail)
              if (url) {
                this.$message({
                  type: 'info',
                  message: '验证码已发送，5秒后将在新窗口打开邮箱登录页面',
                  duration: 4 * 1000
                })
                //
                wait5sOpenUrl(url, 'blank')
              } else {
                this.$message({
                  type: 'info',
                  message: '验证码已发送，请用户登录邮箱查看验证码',
                  duration: 3 * 1000
                })
              }
            } else {
              this.$message({
                type: 'info',
                message: data.msg,
                duration: 3 * 1000
              })
            }
          }.bind(this))
          .catch(function(err) {
            console.log(err)
            this.$message({
              type: 'info',
              message: '服务器响应超时，请重新获取!',
              duration: 3 * 1000
            })
          })
      }
    },

    handleUpdateEmail() {
      this.$refs.email_form.validate((valid) => {
        if (valid) {
          updateEmail(this.email, this.emailForm.newEmail, this.emailForm.verificationCode)
            .then(function(data) {
              this.$message({
                type: 'info',
                message: data.msg,
                duration: 3 * 1000
              })
              if (data.code === Constants.SUCCESS) {
                this.email = this.emailForm.newEmail
                this.$refs.email_form.resetFields()
                store.dispatch('GetUserProfile')
                  .then(() => {
                    console.log('update user profile')
                  }).catch(() => {
                    store.dispatch('FedLogOut').then(() => {
                      this.$message.error('请重新登录！')
                      this.$router.replace({ path: '/login' })
                    })
                  })
              }
            }.bind(this))
            .catch(function(err) {
              console.log(err)
              this.$message({
                type: 'info',
                message: '服务器响应超时，请重试！',
                duration: 3 * 1000
              })
            })
        } else {
          return false
        }
      })
    },

    handleUpdatePhone() {
      this.$refs.phone_form.validate((valid) => {
        if (valid) {
          // 没变化，不提交
          if (this.phoneForm.newPhone === this.phone) {
            this.$message({
              type: 'info',
              message: '与正在使用的手机号相同！',
              duration: 3 * 1000
            })
            return false
          }
          updatePhone(this.phoneForm.newPhone)
            .then(function(data) {
              this.$message({
                type: 'info',
                message: data.msg,
                duration: 3 * 1000
              })
              if (data.code === Constants.SUCCESS) {
                this.$refs.phone_form.resetFields()
                // logout
                store.dispatch('FedLogOut')
                  .then(() => {
                    // TODO：路由 replace Login 页面
                    this.$router.replace({ path: '/login' })
                  })
                  .catch(err => {
                    console.log(err)
                    // TODO：路由 replace Login 页面
                    this.$router.replace({ path: '/login' })
                  })
              }
            }.bind(this))
            .catch(function(err) {
              console.log(err)
              this.$message({
                type: 'info',
                message: '服务器响应超时，请重试！',
                duration: 3 * 1000
              })
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.content-wrapper {
  // position: relative !important;
  // top: 100px; left: 0;
  // top: calc(#{$navbar-height} + #{$breadcrumb-height}); left: 0;
  // display: flex;
  // flex-direction: column;
  // height: 100%;
  width: 100%;
  // background-color:  $bg-gray-light;
}
// .content-container {
//   flex: 1 0 auto;
// }
.el-select{
  width: 100%;
}
.p-text {
  font-weight: 600;
  color: $blue-light;
  font-size: $font-size-base;
}
.btn-code {
  border: 0px;
  width: 90px;
  padding-bottom: 16px;
  // float: right;
  color: $blue-light;
  background-color:  white;
  font-size: $font-size-base;
}
</style>
