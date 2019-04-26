<template>
  <div class="content-wrapper">
    <div class="content-container py-3">
      <h2 class="title is-center">{{ stationName }}</h2>
      <el-tabs type="card" class="container-sm px-responsive">
        <el-tab-pane label="启停记录">
          <el-form ref="new_record_form" :model="newRecord" :rules="newRecordRules" label-position="top" >
            <el-form-item ref="gen_idx" prop="genIdx" label="机组编号">
              <el-select v-model="newRecord.genIdx" placeholder="选择机组编号" @visible-change="requestGenStartLastLog($event)" >
                <el-option label="#1 发电机" value="1"/>
                <el-option label="#2 发电机" value="2"/>
                <el-option label="#3 发电机" value="3"/>
              </el-select>
            </el-form-item>
            <p v-show="isShowStartItem" style="color:#606266; font-size:14px;">当前机组状态：<span style="color:red; font-size:14px;">{{ genState }}</span></p>
            <el-form-item v-show="isShowStartItem" label="开机时间">
              <el-col :span="11">
                <el-form-item prop="startDate">
                  <el-date-picker v-model="newRecord.startDate" :readonly="isReadOnly" :editable="false" type="date" style="width: 100%;" placeholder="选择日期" />
                </el-form-item>
              </el-col>
              <el-col :span="2" class="is-center">-</el-col>
              <el-col :span="11">
                <el-form-item prop="startTime">
                  <el-time-picker v-model="newRecord.startTime" :readonly="isReadOnly" :editable="false" style="width: 100%;" placeholder="选择时间" />
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item v-show="isShowStopItem" label="停机时间">
              <el-col :span="11">
                <el-form-item prop="stopDate">
                  <el-date-picker v-model="newRecord.stopDate" :editable="false" type="date" style="width: 100%;" placeholder="选择日期" />
                </el-form-item>
              </el-col>
              <el-col :span="2" class="is-center">-</el-col>
              <el-col :span="11">
                <el-form-item prop="stopTime">
                  <el-time-picker v-model="newRecord.stopTime" :editable="false" style="width: 100%;" placeholder="选择时间" />
                </el-form-item>
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
import { getStationName } from '@/utils/device'
import { getGenStartLastLog, logGenStartStop } from '@/api/device'
import { Constants } from '@/Constants'

export default {
  name: 'GenStartStopLog',
  data() {
    return {
      // stationIdx: '',
      // startRecoder: '',
      // stopRecorder: '',
      newRecord: {
        genIdx: '',
        startDate: '',
        startTime: '',
        stopDate: '',
        stopTime: ''
      },
      newRecordRules: {
        genIdx: [{ required: true, message: '请选择机组', trigger: 'change' }],
        startDate: [{ type: 'date', required: true, message: '请选择开机日期', trigger: 'change' }],
        startTime: [{ type: 'date', required: true, message: '请选择开机时间', trigger: 'change' }],
        stopDate: [{ type: 'date', required: true, message: '请选择停机日期', trigger: 'change' }],
        stopTime: [{ type: 'date', required: true, message: '请选择停机时间', trigger: 'change' }]
      },
      //
      genState: '',
      isRunning: '',
      isReadOnly: false,
      isShowStartItem: false,
      isShowStopItem: false
    }
  },
  computed: {
    username: function() {
      return store.getters.profile.username
    },
    stationIdx: function() {
      return store.getters.profile.station
    },
    stationName: function() {
      return getStationName(this.stationIdx)
    }
  },
  methods: {
    clearLogTab() {
      this.$refs.new_record_form.resetFields()
      this.genState = ''
      this.isRunning = ''
      this.isReadOnly = false
      this.isShowStartItem = false
      this.isShowStopItem = false
    },
    makeupDateTime(inDate, inTime) {
      const dateTime = new Date()
      dateTime.setFullYear(inDate.getFullYear())
      dateTime.setMonth(inDate.getMonth())
      dateTime.setDate(inDate.getDate())
      dateTime.setHours(inTime.getHours())
      dateTime.setMinutes(inTime.getMinutes())
      dateTime.setSeconds(inTime.getSeconds())
      dateTime.setMilliseconds(0)

      return dateTime
    },

    requestGenStartLastLog(isVisible) {
      if (!isVisible) {
        getGenStartLastLog(this.stationIdx, this.newRecord.genIdx)
          .then(function(data) {
            if (data.code === Constants.SUCCESS) {
              this.isRunning = data.is_running
              if (data.is_running === '0') {
                this.genState = '已停机'
                this.isShowStartItem = true
                this.isReadOnly = false
                this.isShowStopItem = false
              } else if (data.is_running === '1') {
                const startDateTime = new Date(data.start_time)
                this.newRecord.startDate = startDateTime
                this.newRecord.startTime = startDateTime
                // 页面显示切换
                this.genState = '已开机'
                this.isShowStartItem = true
                this.isReadOnly = true
                this.isShowStopItem = true
              }
            } else {
              this.clearLogTab()
              this.$message({
                type: 'info',
                message: '服务器响应失败，请再次选择机组编号！',
                duration: 3 * 1000
              })
            }
          }.bind(this))
          .catch(function(err) {
            console.log(err)
            this.clearLogTab()
            this.$message({
              type: 'info',
              message: '服务器响应超时，请再次选择机组编号！',
              duration: 3 * 1000
            })
          }.bind(this))
      }
    },

    handlePostRecord() {
      if (this.isRunning === '0') {
        // 当前停机，校验开机时间，提交开机时间
        const fieldsToValidate = ['genIdx', 'startDate', 'startTime']
        const _self = this
        Promise.all(fieldsToValidate.map(item => {
          const p = new Promise(function(resolve, reject) {
            _self.$refs['new_record_form'].validateField(item, (error) => {
              if (!error) {
                resolve(true)
              } else {
                resolve(false)
              }
            })
          })
          return p
        })).then(function(data) {
          // data 里是各个字段的验证错误信息, 如果为空串则认为验证通过, 如果数组里全为空串则所有验证通过
          if (data.indexOf(false) === -1) {
            const startDateTime = this.makeupDateTime(this.newRecord.startDate, this.newRecord.startTime)
            logGenStartStop(this.isRunning, startDateTime.valueOf(), this.username)
              .then(function(data) {
                console.log(data)
                this.clearLogTab()
                this.$message({
                  type: 'info',
                  message: data.msg,
                  duration: 3 * 1000
                })
              }.bind(this))
              .catch(function(err) {
                console.log(err)
                this.clearLogTab()
                this.$message({
                  type: 'info',
                  message: '服务器响应超时，请重试！',
                  duration: 3 * 1000
                })
              }.bind(this))
          }
        }.bind(this))
        // 当前开机，校验表单，提交停机时间
      } else if (this.isRunning === '1') {
        this.$refs.new_record_form.validate((valid) => {
          if (valid) {
            const stopDateTime = this.makeupDateTime(this.newRecord.stopDate, this.newRecord.stopTime)
            logGenStartStop(this.isRunning, stopDateTime.valueOf(), this.username)
              .then(function(data) {
                console.log(data)
                this.clearLogTab()
                this.$message({
                  type: 'info',
                  message: data.msg,
                  duration: 3 * 1000
                })
              }.bind(this))
              .catch(function(err) {
                console.log(err)
                this.clearLogTab()
                this.$message({
                  type: 'info',
                  message: '服务器响应超时，请重试！',
                  duration: 3 * 1000
                })
              }.bind(this))
          } else {
            return false
          }
        })
      }
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
.title {
  font-weight: 400;
  color: $title-color;
  letter-spacing: 6px;
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
