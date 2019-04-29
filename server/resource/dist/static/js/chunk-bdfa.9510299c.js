(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-bdfa"],{SicC:function(e,t,s){"use strict";s.r(t);var a=s("4d7F"),n=s.n(a),i=s("Q2AE"),o=s("tHYo"),r=s("t3Un");function l(e,t,s,a,n,i){return Object(r.a)({url:"/generators/post_start_stop_log",method:"post",data:{station_idx:e,gen_idx:t,is_running:s,date_time:a,username:n,stop_cause:i}})}var c=s("42cJ"),d={name:"Log",data:function(){return{newRecord:{genIdx:"",startDate:"",startTime:"",stopDate:"",stopTime:"",stopCause:""},newRecordRules:{genIdx:[{required:!0,message:"请选择机组",trigger:"change"}],startDate:[{type:"date",required:!0,message:"请选择开机日期",trigger:"change"}],startTime:[{type:"date",required:!0,message:"请选择开机时间",trigger:"change"}],stopDate:[{type:"date",required:!0,message:"请选择停机日期",trigger:"change"}],stopTime:[{type:"date",required:!0,message:"请选择停机时间",trigger:"change"}],stopCause:[{required:!0,message:"请选择停机原因",trigger:"change"}]},genState:"",isRunning:"",isReadOnly:!1,isShowStartItem:!1,isShowStopItem:!1}},computed:{username:function(){return i.a.getters.profile.username},stationIdx:function(){return i.a.getters.profile.station},stationName:function(){return Object(o.a)(this.stationIdx)}},methods:{clearLogTab:function(){this.$refs.new_record_form.resetFields(),this.genState="",this.isRunning="",this.isReadOnly=!1,this.isShowStartItem=!1,this.isShowStopItem=!1},makeupDateTime:function(e,t){var s=new Date;return s.setFullYear(e.getFullYear()),s.setMonth(e.getMonth()),s.setDate(e.getDate()),s.setHours(t.getHours()),s.setMinutes(t.getMinutes()),s.setSeconds(t.getSeconds()),s.setMilliseconds(0),s},requestGenStartLastLog:function(e){e||function(e,t){return Object(r.a)({url:"/generators/query_start_last_log",method:"post",data:{station_idx:e,gen_idx:t}})}(this.stationIdx,this.newRecord.genIdx).then(function(e){if(console.log(e),e.code===c.a.SUCCESS){if(this.isRunning=e.is_running,"0"===e.is_running)this.genState="已停机",this.isShowStartItem=!0,this.isReadOnly=!1,this.isShowStopItem=!1;else if("1"===e.is_running){var t=new Date(e.start_time);this.newRecord.startDate=t,this.newRecord.startTime=t,this.genState="已开机",this.isShowStartItem=!0,this.isReadOnly=!0,this.isShowStopItem=!0}}else this.clearLogTab(),this.$message({type:"info",message:e.msg,duration:3e3})}.bind(this)).catch(function(e){console.log(e),this.clearLogTab(),this.$message({type:"info",message:"服务器未响应，请选择机组编号！",duration:3e3})}.bind(this))},handlePostRecord:function(){var e=this;if("0"===this.isRunning){var t=this;n.a.all(["genIdx","startDate","startTime"].map(function(e){return new n.a(function(s,a){t.$refs.new_record_form.validateField(e,function(e){s(!e)})})})).then(function(e){if(-1===e.indexOf(!1)){var t=this.makeupDateTime(this.newRecord.startDate,this.newRecord.startTime);l(this.stationIdx,this.newRecord.genIdx,this.isRunning,t.valueOf(),this.username,"0").then(function(e){console.log(e),this.clearLogTab(),this.$message({type:"info",message:e.msg,duration:3e3})}.bind(this)).catch(function(e){console.log(e),this.clearLogTab(),this.$message({type:"info",message:"服务器未响应，请重试！",duration:3e3})}.bind(this))}}.bind(this))}else"1"===this.isRunning&&this.$refs.new_record_form.validate(function(t){if(!t)return!1;var s=e.makeupDateTime(e.newRecord.stopDate,e.newRecord.stopTime);l(e.stationIdx,e.newRecord.genIdx,e.isRunning,s.valueOf(),e.username,e.newRecord.stopCause).then(function(e){console.log(e),this.clearLogTab(),this.$message({type:"info",message:e.msg,duration:3e3})}.bind(e)).catch(function(e){console.log(e),this.clearLogTab(),this.$message({type:"info",message:"服务器未响应，请重试！",duration:3e3})}.bind(e))})}}},u=(s("u4ik"),s("KHd+")),m=Object(u.a)(d,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-form",{ref:"new_record_form",attrs:{model:e.newRecord,rules:e.newRecordRules,"label-position":"top"}},[s("el-form-item",{ref:"gen_idx",attrs:{prop:"genIdx",label:"机组编号"}},[s("el-select",{attrs:{placeholder:"选择机组编号"},on:{"visible-change":function(t){e.requestGenStartLastLog(t)}},model:{value:e.newRecord.genIdx,callback:function(t){e.$set(e.newRecord,"genIdx",t)},expression:"newRecord.genIdx"}},[s("el-option",{attrs:{label:"#1 发电机",value:"1"}}),e._v(" "),s("el-option",{attrs:{label:"#2 发电机",value:"2"}}),e._v(" "),s("el-option",{attrs:{label:"#3 发电机",value:"3"}})],1)],1),e._v(" "),s("p",{directives:[{name:"show",rawName:"v-show",value:e.isShowStartItem,expression:"isShowStartItem"}],staticStyle:{color:"#606266","font-size":"14px"}},[e._v("当前机组状态："),s("span",{staticStyle:{color:"red","font-size":"14px"}},[e._v(e._s(e.genState))])]),e._v(" "),s("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.isShowStartItem,expression:"isShowStartItem"}],attrs:{label:"开机时间"}},[s("el-col",{attrs:{span:11}},[s("el-form-item",{attrs:{prop:"startDate"}},[s("el-date-picker",{staticStyle:{width:"100%"},attrs:{readonly:e.isReadOnly,editable:!1,type:"date",placeholder:"选择日期"},model:{value:e.newRecord.startDate,callback:function(t){e.$set(e.newRecord,"startDate",t)},expression:"newRecord.startDate"}})],1)],1),e._v(" "),s("el-col",{staticClass:"is-center",attrs:{span:2}},[e._v("-")]),e._v(" "),s("el-col",{attrs:{span:11}},[s("el-form-item",{attrs:{prop:"startTime"}},[s("el-time-picker",{staticStyle:{width:"100%"},attrs:{readonly:e.isReadOnly,editable:!1,placeholder:"选择时间"},model:{value:e.newRecord.startTime,callback:function(t){e.$set(e.newRecord,"startTime",t)},expression:"newRecord.startTime"}})],1)],1)],1),e._v(" "),s("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.isShowStopItem,expression:"isShowStopItem"}],attrs:{label:"停机时间"}},[s("el-col",{attrs:{span:11}},[s("el-form-item",{attrs:{prop:"stopDate"}},[s("el-date-picker",{staticStyle:{width:"100%"},attrs:{editable:!1,type:"date",placeholder:"选择日期"},model:{value:e.newRecord.stopDate,callback:function(t){e.$set(e.newRecord,"stopDate",t)},expression:"newRecord.stopDate"}})],1)],1),e._v(" "),s("el-col",{staticClass:"is-center",attrs:{span:2}},[e._v("-")]),e._v(" "),s("el-col",{attrs:{span:11}},[s("el-form-item",{attrs:{prop:"stopTime"}},[s("el-time-picker",{staticStyle:{width:"100%"},attrs:{editable:!1,placeholder:"选择时间"},model:{value:e.newRecord.stopTime,callback:function(t){e.$set(e.newRecord,"stopTime",t)},expression:"newRecord.stopTime"}})],1)],1)],1),e._v(" "),s("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.isShowStopItem,expression:"isShowStopItem"}],attrs:{prop:"stopCause",label:"停机原因"}},[s("el-select",{attrs:{placeholder:"选择停机原因"},model:{value:e.newRecord.stopCause,callback:function(t){e.$set(e.newRecord,"stopCause",t)},expression:"newRecord.stopCause"}},[s("el-option",{attrs:{label:"调度发令",value:"1"}}),e._v(" "),s("el-option",{attrs:{label:"事故停机",value:"2"}})],1)],1),e._v(" "),s("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.isShowStartItem,expression:"isShowStartItem"}]},[s("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handlePostRecord(t)}}},[e._v("提 交")])],1)],1)},[],!1,null,"582554ff",null);m.options.__file="log.vue";t.default=m.exports},VWvT:function(e,t,s){},tHYo:function(e,t,s){"use strict";var a={LIST:["松山河口电厂","苏家河口电厂"]};function n(e){if(""===e)return"";var t=Number(e)-1;return t>=0&&t<a.LIST.length?a.LIST[t]:""}s.d(t,"a",function(){return n})},u4ik:function(e,t,s){"use strict";var a=s("VWvT");s.n(a).a}}]);