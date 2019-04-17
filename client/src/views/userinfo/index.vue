<template>
  <div class="content-wrapper">
    <div class="content-container">
      <div class="content-header py-responsive is-center">
        <h1 class="title">个人信息</h1>
      </div>

      <el-form ref="form" :model="userinfo" :rules="formRules" class="container-sm px-responsive" label-position="right" >
        <el-form-item prop="username" >
          <el-input v-model="userinfo.username" name="username" type="text" placeholder="中文姓名" clearable />
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="userinfo.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="党派" prop="political_party">
          <el-radio-group v-model="userinfo.political_party">
            <el-radio label="1">无党派</el-radio>
            <el-radio label="2">中共党员</el-radio>
            <el-radio label="3">其他党派</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="company">
          <el-select v-model="userinfo.company" placeholder="请选择所属公司">
            <el-option label="保山能源发展股份有限公司" value="1" />
          </el-select>
        </el-form-item>

        <el-form-item prop="dept_lv10">
          <el-select v-model="userinfo.dept_lv10" placeholder="请选择子公司">
            <el-option label="直属电厂" value="1"/>
            <el-option label="保山槟榔江水电开发有限公司" value="2"/>
          </el-select>
        </el-form-item>

        <el-form-item prop="dept_lv20">
          <el-select v-model="userinfo.dept_lv20" placeholder="请选择所属电厂">
            <el-option label="松山河口电厂" value="1"/>
            <el-option label="苏家河口电厂" value="2"/>
          </el-select>
        </el-form-item>

        <el-form-item prop="dept_lv30">
          <el-select v-model="userinfo.dept_lv30" placeholder="请选择所属班组">
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
          <el-select v-model="userinfo.job" placeholder="请选择职务">
            <el-option label="检修员" value="1"/>
            <el-option label="运行员" value="2"/>
            <el-option label="班长" value="3"/>
          </el-select>
        </el-form-item>

        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <div class="grid-content">
              <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleUpdateUserinfo">提 交</el-button>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content">
              <el-button :loading="loading" style="width:100%;" @click.native.prevent="handleResetForm">清 空</el-button>
            </div>
          </el-col>
        </el-row>

      </el-form>
    </div>
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/login'
import { isValidChineseName } from '@/utils/validate'
import { Constants } from '@/Constants'

export default {
  name: 'UserInfoForm',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isValidChineseName(value)) {
        callback(new Error('请输入中文姓名(2~5个汉字)'))
      } else {
        callback()
      }
    }
    return {
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
    handleUpdateUserinfo() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          updateUserInfo(this.userinfo)
            .then(function(data) {
              if (data.code === Constants.SUCCESS) {
                this.$message({
                  type: 'info',
                  message: '提交用户信息成功！',
                  duration: 3 * 1000
                })
                // 路由切换，replace
                this.$router.replace({ path: '/' })
              } else {
                this.$message({
                  type: 'info',
                  message: '提交用户信息失败，请重新提交！',
                  duration: 3 * 1000
                })
              }
            }.bind(this))
            .catch(function(err) {
              console.log(err)
              this.$message({
                type: 'info',
                message: '提交用户信息失败，请重新提交！',
                duration: 3 * 1000
              })
            })
        } else {
          return false
        }
      })
    },

    handleResetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/_free_variables.scss";
@import "src/styles/_layout.scss";

.content-wrapper {
  width: 100%;
  height: 100%;
  background-color:  $bg-gray-light;
}
.content-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 10%;
}
.el-select{
  width: 100%;
}
.title {
  font-weight: 400;
  color: $title-color;
  letter-spacing: 6px;
}
</style>
