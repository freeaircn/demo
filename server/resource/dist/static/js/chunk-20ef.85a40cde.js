(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-20ef"],{"/a3M":function(e,t,s){"use strict";s.r(t);var a=s("Q2AE"),r={name:"GenStartStopLog",data:function(){return{stationIdx:"",isRunning:"",startRecoder:"",stopRecorder:"",newRecord:{genIdx:"",startDate:"",startTime:"",stopDate:"",stopTime:""},newRecordRules:{genIdx:[{required:!0,message:"请选择机组",trigger:"change"}],startDate:[{required:!0,message:"请选择开机日期",trigger:"change"}],startTime:[{required:!0,message:"请选择开机时间",trigger:"change"}],stopDate:[{required:!0,message:"请选择停机日期",trigger:"change"}],stopTime:[{required:!0,message:"请选择停机时间",trigger:"change"}]},isReadOnly:!1,isShowStartItem:!1,isShowStopItem:!1,redirect:void 0}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},mounted:function(){this.getStationIdxByUser()},methods:{getStationIdxByUser:function(){console.log("Gen: "+a.a.getters.profile)},RequestGenStartLog:function(e){this.isRunning="1","0"===this.isRunning?(this.isShowStartItem=!0,this.isReadOnly=!1,this.isShowStopItem=!1):(this.isShowStartItem=!0,this.isReadOnly=!0,this.isShowStopItem=!0)},handlePostRecord:function(){this.$refs.new_record_form.validate(function(e){if(!e)return!1})}}},i=(s("pghx"),s("KHd+")),o=Object(i.a)(r,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content-wrapper"},[s("div",{staticClass:"content-container py-3"},[s("el-tabs",{staticClass:"container-sm px-responsive",attrs:{type:"card"}},[s("el-tab-pane",{attrs:{label:"启停记录"}},[s("el-form",{ref:"new_record_form",attrs:{model:e.newRecord,rules:e.newRecordRules,"label-position":"top"}},[s("el-form-item",{attrs:{prop:"genIdx",label:"机组编号"}},[s("el-select",{attrs:{placeholder:"选择机组编号"},on:{change:function(t){e.RequestGenStartLog(e.newRecord.genIdx)}},model:{value:e.newRecord.genIdx,callback:function(t){e.$set(e.newRecord,"genIdx",t)},expression:"newRecord.genIdx"}},[s("el-option",{attrs:{label:"#1 发电机",value:"1"}}),e._v(" "),s("el-option",{attrs:{label:"#2 发电机",value:"2"}}),e._v(" "),s("el-option",{attrs:{label:"#3 发电机",value:"3"}})],1)],1),e._v(" "),s("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.isShowStartItem,expression:"isShowStartItem"}],attrs:{label:"开机时间"}},[s("el-col",{attrs:{span:11}},[s("el-date-picker",{staticStyle:{width:"100%"},attrs:{readonly:e.isReadOnly,type:"date",placeholder:"选择日期"},model:{value:e.newRecord.startDate,callback:function(t){e.$set(e.newRecord,"startDate",t)},expression:"newRecord.startDate"}})],1),e._v(" "),s("el-col",{staticClass:"is-center",attrs:{span:2}},[e._v("-")]),e._v(" "),s("el-col",{attrs:{span:11}},[s("el-time-picker",{staticStyle:{width:"100%"},attrs:{readonly:e.isReadOnly,placeholder:"选择时间"},model:{value:e.newRecord.startTime,callback:function(t){e.$set(e.newRecord,"startTime",t)},expression:"newRecord.startTime"}})],1)],1),e._v(" "),s("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.isShowStopItem,expression:"isShowStopItem"}],attrs:{label:"停机时间"}},[s("el-col",{attrs:{span:11}},[s("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期"},model:{value:e.newRecord.stopDate,callback:function(t){e.$set(e.newRecord,"stopDate",t)},expression:"newRecord.stopDate"}})],1),e._v(" "),s("el-col",{staticClass:"is-center",attrs:{span:2}},[e._v("-")]),e._v(" "),s("el-col",{attrs:{span:11}},[s("el-time-picker",{staticStyle:{width:"100%"},attrs:{placeholder:"选择时间"},model:{value:e.newRecord.stopTime,callback:function(t){e.$set(e.newRecord,"stopTime",t)},expression:"newRecord.stopTime"}})],1)],1),e._v(" "),s("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.isShowStartItem,expression:"isShowStartItem"}]},[s("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handlePostRecord(t)}}},[e._v("提 交")])],1)],1)],1),e._v(" "),s("el-tab-pane",{attrs:{label:"查看"}},[s("p",[e._v("功能编写中")])]),e._v(" "),s("el-tab-pane",{attrs:{label:"图表"}},[s("p",[e._v("功能编写中")])])],1)],1),e._v(" "),e._m(0)])},[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"footer-wrapper py-responsive"},[s("div",{staticClass:"footer-container container-xl px-responsive"},[s("div",{staticClass:"pure-g"},[s("div",{staticClass:"pure-u-1 pure-u-lg-1-3 gutter-space-responsive"},[s("h4",[e._v("BE")])]),e._v(" "),s("div",{staticClass:"pure-u-1 pure-u-lg-1-3 gutter-space-responsive"},[s("h4",[e._v("链接")]),e._v(" "),s("a",{staticClass:"footer-link",attrs:{href:"#"}},[e._v("帮助")])]),e._v(" "),s("div",{staticClass:"pure-u-1 pure-u-lg-1-3 gutter-space-responsive"},[s("h4",[e._v("社区")]),e._v(" "),s("a",{staticClass:"footer-link",attrs:{href:"#"}},[e._v("反馈建议")])])]),e._v(" "),s("div",{staticClass:"is-right mt-4"},[s("p",[e._v("© 2019 Freeair Studio.")])])])])}],!1,null,"bdcfc604",null);o.options.__file="g_start_stop_log.vue";t.default=o.exports},GKui:function(e,t,s){},pghx:function(e,t,s){"use strict";var a=s("GKui");s.n(a).a}}]);