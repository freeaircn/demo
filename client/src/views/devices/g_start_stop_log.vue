<template>
  <div class="content-wrapper">
    <div class="content-container py-3">
      <el-tabs type="card" class="container-sm px-responsive">
        <el-tab-pane label="启停记录">
          <el-form ref="new_record_form" :model="newRecord" :rules="newRecordRules" label-position="top" >
            <el-form-item prop="genIdx" label="机组编号">
              <el-select v-model="newRecord.genIdx" placeholder="选择机组编号" @change="RequestGenStartLog(newRecord.genIdx)" >
                <el-option label="#1 发电机" value="1"/>
                <el-option label="#2 发电机" value="2"/>
                <el-option label="#3 发电机" value="3"/>
              </el-select>
            </el-form-item>

            <el-form-item v-show="isShowStartItem" label="开机时间">
              <el-col :span="11">
                <el-date-picker v-model="newRecord.startDate" :readonly="isReadOnly" type="date" style="width: 100%;" placeholder="选择日期" />
              </el-col>
              <el-col :span="2" class="is-center">-</el-col>
              <el-col :span="11">
                <el-time-picker v-model="newRecord.startTime" :readonly="isReadOnly" style="width: 100%;" placeholder="选择时间" />
              </el-col>
            </el-form-item>

            <el-form-item v-show="isShowStopItem" label="停机时间">
              <el-col :span="11">
                <el-date-picker v-model="newRecord.stopDate" type="date" style="width: 100%;" placeholder="选择日期" />
              </el-col>
              <el-col :span="2" class="is-center">-</el-col>
              <el-col :span="11">
                <el-time-picker v-model="newRecord.stopTime" style="width: 100%;" placeholder="选择时间" />
              </el-col>
            </el-form-item>

            <el-form-item v-show="isShowStartItem">
              <el-button type="primary" style="width:100%;" @click.native.prevent="handlePostRecord">提 交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="查看">
          <p>功能编写中</p>
        </el-tab-pane>

        <el-tab-pane label="图表">
          <p>功能编写中</p>
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
import store from '@/store'
// import { mapGetters } from 'vuex'
// import { Constants } from '@/Constants'

export default {
  name: 'GenStartStopLog',
  data() {
    return {
      stationIdx: '',
      isRunning: '',
      startRecoder: '',
      stopRecorder: '',
      newRecord: {
        genIdx: '',
        startDate: '',
        startTime: '',
        stopDate: '',
        stopTime: ''
      },
      newRecordRules: {
        genIdx: [{ required: true, message: '请选择机组', trigger: 'change' }],
        startDate: [{ required: true, message: '请选择开机日期', trigger: 'change' }],
        startTime: [{ required: true, message: '请选择开机时间', trigger: 'change' }],
        stopDate: [{ required: true, message: '请选择停机日期', trigger: 'change' }],
        stopTime: [{ required: true, message: '请选择停机时间', trigger: 'change' }]
      },
      //
      isReadOnly: false,
      isShowStartItem: false,
      isShowStopItem: false,
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
    this.getStationIdxByUser()
  },
  methods: {
    getStationIdxByUser() {
      // this.stationIdx = store.getters.profile
      console.log('Gen: ' + store.getters.profile)
    },
    RequestGenStartLog(genIdx) {
      this.isRunning = '1'
      // 未运行
      if (this.isRunning === '0') {
        this.isShowStartItem = true
        this.isReadOnly = false
        this.isShowStopItem = false
      } else {
        this.isShowStartItem = true
        this.isReadOnly = true
        this.isShowStopItem = true
      }
    },

    handlePostRecord() {
      this.$refs.new_record_form.validate((valid) => {
        if (valid) {
          // updateUserProfile(this.profile)
          //   .then(function(data) {
          //     if (data.code === Constants.SUCCESS) {
          //       this.isUpdateUserBtnDisable = true
          //     }
          //     this.$message({
          //       type: 'info',
          //       message: data.msg,
          //       duration: 3 * 1000
          //     })
          //   }.bind(this))
          //   .catch(function(err) {
          //     console.log(err)
          //     this.$message({
          //       type: 'info',
          //       message: '服务器响应超时，请重试！',
          //       duration: 3 * 1000
          //     })
          //   })
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
  // float: right;
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
