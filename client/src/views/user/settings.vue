<template>
  <div class="content-wrapper">
    <div class="content-container py-3">
      <el-tabs v-loading="content_loading" type="card" class="container-sm px-responsive">
        <el-tab-pane label="个人信息">
          <el-form ref="form" :model="userinfo" :rules="formRules" class="" label-position="right" >
            <el-form-item prop="username" >
              <el-input v-model="userinfo.username" name="username" type="text" placeholder="中文姓名" clearable @change="userInfoChange()" />
            </el-form-item>

            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="userinfo.gender" @change="userInfoChange()">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="党派" prop="political_party">
              <el-radio-group v-model="userinfo.political_party" @change="userInfoChange()">
                <el-radio label="1">无党派</el-radio>
                <el-radio label="2">中共党员</el-radio>
                <el-radio label="3">其他党派</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item prop="company">
              <el-select v-model="userinfo.company" placeholder="请选择所属公司" @change="userInfoChange()">
                <el-option label="保山能源发展股份有限公司" value="1" />
              </el-select>
            </el-form-item>

            <el-form-item prop="dept_lv10">
              <el-select v-model="userinfo.dept_lv10" placeholder="请选择子公司" @change="userInfoChange()">
                <el-option label="保山槟榔江水电开发有限公司" value="1"/>
                <el-option label="直属电厂" value="2"/>
              </el-select>
            </el-form-item>

            <el-form-item prop="dept_lv20">
              <el-select v-model="userinfo.dept_lv20" placeholder="请选择所属电厂" @change="userInfoChange()">
                <el-option label="松山河口电厂" value="1"/>
                <el-option label="苏家河口电厂" value="2"/>
              </el-select>
            </el-form-item>

            <el-form-item prop="dept_lv30">
              <el-select v-model="userinfo.dept_lv30" placeholder="请选择所属班组" @change="userInfoChange()">
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
              <el-select v-model="userinfo.job" placeholder="请选择职务" @change="userInfoChange()">
                <el-option label="检修员" value="1"/>
                <el-option label="运行员" value="2"/>
                <el-option label="班长" value="3"/>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button :disabled="isUpdateUserBtnDisable" type="primary" style="width:100%;" @click.native.prevent="handleUpdateUserinfo">更 新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="账号管理">账号管理</el-tab-pane>
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
import { requestUserInfo, updateUserInfo } from '@/api/user'
import { isValidChineseName } from '@/utils/validate'
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
    return {
      phone: '',
      email: '',
      account_active: '',
      account_detailed_done: '',
      userinfo: {
        username: '',
        gender: '',
        political_party: '',
        company: '',
        dept_lv10: '',
        dept_lv20: '',
        dept_lv30: '',
        job: ''
      },
      formRules: {
        username: [{ required: true, trigger: 'change', validator: validateUsername }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        political_party: [{ required: true, message: '请选择党派', trigger: 'change' }],
        company: [{ required: true, message: '请选择公司', trigger: 'change' }],
        dept_lv10: [{ required: true, message: '请选择子公司', trigger: 'change' }],
        dept_lv20: [{ required: true, message: '请选择电厂', trigger: 'change' }],
        dept_lv30: [{ required: true, message: '请选择班组', trigger: 'change' }],
        job: [{ required: true, message: '请选择职务', trigger: 'change' }]
      },
      content_loading: true,
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
          this.userinfo.username = data.username
          this.userinfo.gender = data.gender
          this.userinfo.political_party = data.political_party
          this.userinfo.company = data.company
          this.userinfo.dept_lv10 = data.dept_lv10
          this.userinfo.dept_lv20 = data.dept_lv20
          this.userinfo.dept_lv30 = data.dept_lv30
          this.userinfo.job = data.job
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
    userInfoChange() {
      this.isUpdateUserBtnDisable = false
    },

    handleUpdateUserinfo() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          updateUserInfo(this.userinfo)
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
