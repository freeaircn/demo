<template>
  <div class="content-wrapper">
    <div class="content-container py-3">
      <el-tabs v-loading="content_loading" type="card" class="container-sm px-responsive">
        <el-tab-pane label="个人信息">
          <el-form ref="profile_form" :model="profile" :rules="profileRules" class="" label-position="right" >
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

            <el-form-item prop="dept_lv10">
              <el-select v-model="profile.dept_lv10" placeholder="请选择子公司" @change="profileItemChange()">
                <el-option label="保山槟榔江水电开发有限公司" value="1"/>
                <el-option label="直属电厂" value="2"/>
              </el-select>
            </el-form-item>

            <el-form-item prop="dept_lv20">
              <el-select v-model="profile.dept_lv20" placeholder="请选择所属电厂" @change="profileItemChange()">
                <el-option label="松山河口电厂" value="1"/>
                <el-option label="苏家河口电厂" value="2"/>
              </el-select>
            </el-form-item>

            <el-form-item prop="dept_lv30">
              <el-select v-model="profile.dept_lv30" placeholder="请选择所属班组" @change="profileItemChange()">
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
          <div class="password-container">
            <div class="is-left">
              <p class="p-text">更改密码</p>
            </div>
            <el-form ref="password_form" :model="password" :rules="passwordRules" label-position="right" >
              <el-form-item prop="old_password">
                <el-input v-model="password.oldPwd" type="password" name="old_password" placeholder="输入旧密码" clearable />
              </el-form-item>

              <el-form-item prop="new_password">
                <el-input v-model="password.newPwd" type="password" name="new_password" placeholder="输入新密码" clearable />
              </el-form-item>

              <el-form-item prop="confirm_password">
                <el-input v-model="password.newConfirm" type="password" name="confirm_password" placeholder="再次输入新密码" clearable />
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
              <p class="p-text">注册邮箱 {{ this.email }}</p>
            </div>
            <el-form ref="email_form" :model="emailForm" :rules="emailRules" label-position="right" >
              <el-form-item prop="new_email">
                <el-input v-model="emailForm.newEmail" type="text" name="new_email" placeholder="输入新邮箱" clearable />
              </el-form-item>

              <el-form-item prop="verification_code">
                <el-input v-model="emailForm.code" type="text" name="verification_code" placeholder="输入验证码" clearable />
              </el-form-item>

              <!-- <div class="pb-2 is-right" style="color: #409EFF;">获取验证码</div> -->
              <input v-model="btnCodeConent" type="button" class="btn-code" @click="handleRequestCode">

              <el-form-item>
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleUpdateEmail">更改邮箱</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="手机号">
          <div class="phone-container">
            <div class="is-left">
              <p class="p-text">注册手机号 {{ this.phone }}</p>
            </div>
            <el-form ref="phone_form" :model="newPhone" :rules="phoneRules" label-position="right" >
              <el-form-item prop="new_phone">
                <el-input v-model="newPhone" type="text" name="new_phone" placeholder="输入新手机号" clearable />
              </el-form-item>

              <el-form-item>
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleUpdatePhone">更改手机号</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>

    <div class="footer-wrapper py-responsive">
      <div class="footer-container container-xl px-responsive">
        <div class="pure-g">
          <div class="pure-u-1 pure-u-lg-1-3 gutter-space-responsive">
            <h4>BE</h4>
          </div>
          <div class="pure-u-1 pure-u-lg-1-3 gutter-space-responsive">
            <h4>链接</h4>
            <a href="#" class="footer-link">帮助</a>
          </div>
          <div class="pure-u-1 pure-u-lg-1-3 gutter-space-responsive">
            <h4>社区</h4>
            <a href="#" class="footer-link">反馈建议</a>
          </div>
        </div>
        <div class="is-right mt-4">
          <p>© 2019 Freeair Studio.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { requestUserInfo, updateUserProfile } from '@/api/user'
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
    const validatePssword = (rule, value, callback) => {
      if (!isValidPassword(value)) {
        callback(new Error('密码最小长度为8位，必须包含大写、小写字母、数字！'))
      } else {
        if (this.password.newConfirm !== '') {
          this.$refs.password_form.validateField('confirm_password')
        }
        callback()
      }
    }
    const validateconfirmPassword = (rule, value, callback) => {
      if (value !== this.password.newPwd) {
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
        dept_lv10: '',
        dept_lv20: '',
        dept_lv30: '',
        job: ''
      },
      profileRules: {
        username: [{ required: true, trigger: 'change', validator: validateUsername }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        political_party: [{ required: true, message: '请选择党派', trigger: 'change' }],
        company: [{ required: true, message: '请选择公司', trigger: 'change' }],
        dept_lv10: [{ required: true, message: '请选择子公司', trigger: 'change' }],
        dept_lv20: [{ required: true, message: '请选择电厂', trigger: 'change' }],
        dept_lv30: [{ required: true, message: '请选择班组', trigger: 'change' }],
        job: [{ required: true, message: '请选择职务', trigger: 'change' }]
      },
      password: {
        oldPwd: '',
        newPwd: '',
        newConfirm: ''
      },
      passwordRules: {
        old_password: [{ required: true, trigger: 'change' }],
        new_password: [{ required: true, trigger: 'change', validator: validatePssword }],
        confirm_password: [{ required: true, trigger: 'change', validator: validateconfirmPassword }]
      },
      emailForm: {
        newEmail: '',
        code: ''
      },
      emailRules: {
        new_email: [{ required: true, trigger: 'change', validator: validateEmail }],
        verification_code: [{ required: true, trigger: 'change', validator: validateCode }]
      },
      btnCodeConent: '获取验证码',
      newPhone: '',
      phoneRules: {
        new_phone: [{ required: true, trigger: 'change', validator: validateUserphone }],
      },
      content_loading: false,
      isUpdateUserBtnDisable: true,
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
          this.profile.username = data.username
          this.profile.gender = data.gender
          this.profile.political_party = data.political_party
          this.profile.company = data.company
          this.profile.dept_lv10 = data.dept_lv10
          this.profile.dept_lv20 = data.dept_lv20
          this.profile.dept_lv30 = data.dept_lv30
          this.profile.job = data.job
          //
          this.content_loading = false
        } else {
          this.$message({
            type: 'info',
            message: '服务器响应异常，请尝试刷新！',
            showClose: true
          })
        }
      }.bind(this))
      .catch(function(err) {
        console.log(err)
        this.$message({
          type: 'info',
          message: '服务器响应异常，请尝试刷新！！',
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
              if (data.code === Constants.SUCCESS) {
                this.isUpdateUserBtnDisable = true
                this.$message({
                  type: 'info',
                  message: '用户信息已更新！',
                  duration: 3 * 1000
                })
              } else {
                this.$message({
                  type: 'info',
                  message: '服务器更新失败，请重试！',
                  duration: 3 * 1000
                })
              }
            }.bind(this))
            .catch(function(err) {
              console.log(err)
              this.$message({
                type: 'info',
                message: '服务器更新失败，请重试！！',
                duration: 3 * 1000
              })
            })
        } else {
          return false
        }
      })
    },

    handleUpdatePassword() {
      this.$refs.password_form.validate((valid) => {
        if (valid) {
          updatePassword(this.password.oldPwd, this.password.newPwd)
            .then(function(data) {
              if (data.code === Constants.SUCCESS) {
                this.isUpdateUserBtnDisable = true
                this.$message({
                  type: 'info',
                  message: '用户信息已更新！',
                  duration: 3 * 1000
                })
              } else {
                this.$message({
                  type: 'info',
                  message: '服务器更新失败，请重试！',
                  duration: 3 * 1000
                })
              }
            }.bind(this))
            .catch(function(err) {
              console.log(err)
              this.$message({
                type: 'info',
                message: '服务器更新失败，请重试！！',
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
@import "src/styles/_free_variables.scss";
@import "src/styles/_layout.scss";

.content-wrapper {
  position: relative !important;
  top: $navbar-height; left: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  // background-color:  $bg-gray-light;
}
.content-container {
  flex: 1 0 auto;
}
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
  float: right;
  color: $blue-light;
  background-color:  white;
  font-size: $font-size-base;
}

.footer-wrapper {
  background: $footer-default-bg;
  width: 100%;
  flex: 0 0 auto;
  h4 {
    color: $title-color;
  }
  .footer-link {
    font-size: 14px;
    color: $text-color;
  }
  p {
    font-size: 14px;
    color: $text-color;
  }
}
</style>
