<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="查询条件" name="1">
      <el-form ref="gen_start_history" :model="history" :rules="formRules" label-position="top" >
        <el-form-item ref="station_idx" prop="stationIdx">
          <el-select v-model="history.stationIdx" placeholder="选择电厂" >
            <el-option label="松山河口电厂" value="1"/>
            <el-option label="苏家河口电厂" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item ref="gen_idx" prop="genIdx">
          <el-select v-model="history.genIdx" placeholder="选择机组编号" >
            <el-option label="#1 发电机" value="1"/>
            <el-option label="#2 发电机" value="2"/>
            <el-option label="#3 发电机" value="3"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="monthRange">
          <el-date-picker v-model="history.monthRange" :editable="false" :picker-options="pickerMonthOptions" type="monthrange" align="left" unlink-panels start-placeholder="开始月份" end-placeholder="结束月份" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleQuery">查 询</el-button>
        </el-form-item>
      </el-form>
    </el-collapse-item>
    <el-collapse-item title="查询结果" name="2">
      <h4 class="title is-center">{{ stationName }}  {{ genName }}</h4>
      <el-table :data="tableData" max-height="250" stripe border style="width: 100%">
        <el-table-column fixed type="index" />
        <el-table-column prop="startDate" label="开机时间" sortable width="140" />
        <el-table-column prop="recorder1" label="开机记录" width="80" />
        <el-table-column prop="stopDate" label="停机时间" width="140" />
        <el-table-column prop="recorder2" label="停机记录" width="80" />
      </el-table>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { getStationName, getGeneratorName } from '@/utils/station'

export default {
  name: 'History',
  data() {
    return {
      activeName: '1',
      history: {
        stationIdx: '',
        genIdx: '',
        monthRange: ''
      },
      formRules: {
        // genIdx: [{ required: true, message: '请选择机组', trigger: 'change' }],
        // startDate: [{ type: 'date', required: true, message: '请选择开机日期', trigger: 'change' }],
        // startTime: [{ type: 'date', required: true, message: '请选择开机时间', trigger: 'change' }],
        // stopDate: [{ type: 'date', required: true, message: '请选择停机日期', trigger: 'change' }],
        // stopTime: [{ type: 'date', required: true, message: '请选择停机时间', trigger: 'change' }],
        // stopCause: [{ required: true, message: '请选择停机原因', trigger: 'change' }]
      },
      pickerMonthOptions: {
        shortcuts: [{
          text: '本月',
          onClick(picker) {
            picker.$emit('pick', [new Date(), new Date()])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 3)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '今年至今',
          onClick(picker) {
            const end = new Date()
            const start = new Date(new Date().getFullYear(), 0)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableData: [{
        startDate: '2016-05-02 01:02',
        recorder1: '王小虎',
        stopDate: '2016-05-02 03:00',
        recorder2: '王小虎'
      }, {
        startDate: '2016-05-02 01:02',
        recorder1: '王小虎',
        stopDate: '2016-05-02 03:00',
        recorder2: '王小虎'
      }, {
        startDate: '2016-05-02 01:02',
        recorder1: '王小虎',
        stopDate: '2016-05-02 03:00',
        recorder2: '王小虎'
      }]
    }
  },
  computed: {
    stationName: function() {
      return getStationName(this.history.stationIdx)
    },
    genName: function() {
      return getGeneratorName(this.history.genIdx)
    }
  },
  methods: {
    formatter(row, column) {
      return row.address
    },
    handleQuery() {
      console.log(this.history.monthRange)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.title {
  font-weight: 400;
  color: $title-color;
}
.el-select{
  width: 100%;
}
.el-date-editor--monthrange{
  width: 100%;
}
</style>
