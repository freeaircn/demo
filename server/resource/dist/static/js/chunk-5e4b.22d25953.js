(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5e4b"],{"3qP1":function(e,t,a){},dU37:function(e,t,a){"use strict";a.r(t);var l=a("t3Un");var r=a("Yfch"),o=a("42cJ"),s={name:"UserSettings",data:function(){return{phone:"",email:"",account_active:"",account_detailed_done:"",password:{old:"",new:"",newConfirm:""},profile:{username:"",gender:"",political_party:"",company:"",dept_lv10:"",dept_lv20:"",dept_lv30:"",job:""},profileRules:{username:[{required:!0,trigger:"change",validator:function(e,t,a){Object(r.b)(t)?a():a(new Error("请输入中文姓名(2~5个汉字)"))}}],gender:[{required:!0,message:"请选择性别",trigger:"change"}],political_party:[{required:!0,message:"请选择党派",trigger:"change"}],company:[{required:!0,message:"请选择公司",trigger:"change"}],dept_lv10:[{required:!0,message:"请选择子公司",trigger:"change"}],dept_lv20:[{required:!0,message:"请选择电厂",trigger:"change"}],dept_lv30:[{required:!0,message:"请选择班组",trigger:"change"}],job:[{required:!0,message:"请选择职务",trigger:"change"}]},content_loading:!0,isUpdateUserBtnDisable:!0,redirect:void 0}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},mounted:function(){Object(l.a)({url:"/users/request_user_info",method:"post"}).then(function(e){e.code===o.a.SUCCESS?(this.phone=e.phone,this.email=e.email,this.account_active=e.active,this.account_detailed_done=e.detailed_info_done,this.profile.username=e.username,this.profile.gender=e.gender,this.profile.political_party=e.political_party,this.profile.company=e.company,this.profile.dept_lv10=e.dept_lv10,this.profile.dept_lv20=e.dept_lv20,this.profile.dept_lv30=e.dept_lv30,this.profile.job=e.job,this.content_loading=!1):this.$message({type:"info",message:"服务器响应异常，请尝试刷新！",showClose:!0})}.bind(this)).catch(function(e){console.log(e),this.$message({type:"info",message:"服务器响应异常，请尝试刷新！！",showClose:!0})})},methods:{profileItemChange:function(){this.isUpdateUserBtnDisable=!1},handleUpdateUserProfile:function(){var e=this;this.$refs.profile_form.validate(function(t){if(!t)return!1;(function(e){return Object(l.a)({url:"/users/update_user_profile",method:"post",data:{username:e.username,gender:e.gender,political_party:e.political_party,company:e.company,dept_lv10:e.dept_lv10,dept_lv20:e.dept_lv20,dept_lv30:e.dept_lv30,job:e.job}})})(e.profile).then(function(e){e.code===o.a.SUCCESS?(this.isUpdateUserBtnDisable=!0,this.$message({type:"info",message:"用户信息已更新！",duration:3e3})):this.$message({type:"info",message:"服务器更新失败，请重试！",duration:3e3})}.bind(e)).catch(function(e){console.log(e),this.$message({type:"info",message:"服务器更新失败，请重试！！",duration:3e3})})})}}},i=(a("rw70"),a("KHd+")),n=Object(i.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content-wrapper"},[a("div",{staticClass:"content-container py-3"},[a("el-tabs",{directives:[{name:"loading",rawName:"v-loading",value:e.content_loading,expression:"content_loading"}],staticClass:"container-sm px-responsive",attrs:{type:"card"}},[a("el-tab-pane",{attrs:{label:"个人信息"}},[a("el-form",{ref:"profile_form",attrs:{model:e.profile,rules:e.profileRules,"label-position":"right"}},[a("el-form-item",{attrs:{prop:"username"}},[a("el-input",{attrs:{name:"username",type:"text",placeholder:"中文姓名",clearable:""},on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.username,callback:function(t){e.$set(e.profile,"username",t)},expression:"profile.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性别",prop:"gender"}},[a("el-radio-group",{on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.gender,callback:function(t){e.$set(e.profile,"gender",t)},expression:"profile.gender"}},[a("el-radio",{attrs:{label:"男"}},[e._v("男")]),e._v(" "),a("el-radio",{attrs:{label:"女"}},[e._v("女")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"党派",prop:"political_party"}},[a("el-radio-group",{on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.political_party,callback:function(t){e.$set(e.profile,"political_party",t)},expression:"profile.political_party"}},[a("el-radio",{attrs:{label:"1"}},[e._v("无党派")]),e._v(" "),a("el-radio",{attrs:{label:"2"}},[e._v("中共党员")]),e._v(" "),a("el-radio",{attrs:{label:"3"}},[e._v("其他党派")])],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"company"}},[a("el-select",{attrs:{placeholder:"请选择所属公司"},on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.company,callback:function(t){e.$set(e.profile,"company",t)},expression:"profile.company"}},[a("el-option",{attrs:{label:"保山能源发展股份有限公司",value:"1"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"dept_lv10"}},[a("el-select",{attrs:{placeholder:"请选择子公司"},on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.dept_lv10,callback:function(t){e.$set(e.profile,"dept_lv10",t)},expression:"profile.dept_lv10"}},[a("el-option",{attrs:{label:"保山槟榔江水电开发有限公司",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"直属电厂",value:"2"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"dept_lv20"}},[a("el-select",{attrs:{placeholder:"请选择所属电厂"},on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.dept_lv20,callback:function(t){e.$set(e.profile,"dept_lv20",t)},expression:"profile.dept_lv20"}},[a("el-option",{attrs:{label:"松山河口电厂",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"苏家河口电厂",value:"2"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"dept_lv30"}},[a("el-select",{attrs:{placeholder:"请选择所属班组"},on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.dept_lv30,callback:function(t){e.$set(e.profile,"dept_lv30",t)},expression:"profile.dept_lv30"}},[a("el-option",{attrs:{label:"检修班",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"运行一班",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"运行二班",value:"3"}}),e._v(" "),a("el-option",{attrs:{label:"运行三班",value:"4"}}),e._v(" "),a("el-option",{attrs:{label:"运行四班",value:"5"}}),e._v(" "),a("el-option",{attrs:{label:"运行五班",value:"6"}}),e._v(" "),a("el-option",{attrs:{label:"办公室",value:"7"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"job"}},[a("el-select",{attrs:{placeholder:"请选择职务"},on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.job,callback:function(t){e.$set(e.profile,"job",t)},expression:"profile.job"}},[a("el-option",{attrs:{label:"检修员",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"运行员",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"班长",value:"3"}})],1)],1),e._v(" "),a("el-form-item",[a("el-button",{staticStyle:{width:"100%"},attrs:{disabled:e.isUpdateUserBtnDisable,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleUpdateUserProfile(t)}}},[e._v("更 新")])],1)],1)],1),e._v(" "),a("el-tab-pane",{attrs:{label:"账号管理"}},[a("div",{staticClass:"password-container"},[a("el-form",{ref:"password_form",attrs:{model:e.password,rules:e.passwordRules,"label-position":"right"}},[a("el-form-item",{attrs:{prop:"old_password"}},[a("el-input",{attrs:{type:"password",name:"old_password",placeholder:"输入旧密码",clearable:""},model:{value:e.password.old,callback:function(t){e.$set(e.password,"old",t)},expression:"password.old"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"new_password"}},[a("el-input",{attrs:{type:"password",name:"new_password",placeholder:"输入新密码",clearable:""},model:{value:e.password.new,callback:function(t){e.$set(e.password,"new",t)},expression:"password.new"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"confirm_password"}},[a("el-input",{attrs:{type:"password",name:"confirm_password",placeholder:"再次输入新密码",clearable:""},model:{value:e.password.newConfirm,callback:function(t){e.$set(e.password,"newConfirm",t)},expression:"password.newConfirm"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleUpdatePassword(t)}}},[e._v("更改密码")])],1)],1)],1)])],1)],1),e._v(" "),e._m(0)])},[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"footer-wrapper py-responsive"},[a("div",{staticClass:"footer-container container-xl px-responsive"},[a("div",{staticClass:"pure-g"},[a("div",{staticClass:"pure-u-1 pure-u-lg-1-3 gutter-space-responsive"},[a("h4",[e._v("BE")])]),e._v(" "),a("div",{staticClass:"pure-u-1 pure-u-lg-1-3 gutter-space-responsive"},[a("h4",[e._v("链接")]),e._v(" "),a("a",{staticClass:"footer-link",attrs:{href:"#"}},[e._v("帮助")])]),e._v(" "),a("div",{staticClass:"pure-u-1 pure-u-lg-1-3 gutter-space-responsive"},[a("h4",[e._v("社区")]),e._v(" "),a("a",{staticClass:"footer-link",attrs:{href:"#"}},[e._v("反馈建议")])])]),e._v(" "),a("div",{staticClass:"is-right mt-4"},[a("p",[e._v("© 2019 Freeair Studio.")])])])])}],!1,null,"329e7e8d",null);n.options.__file="settings.vue";t.default=n.exports},rw70:function(e,t,a){"use strict";var l=a("3qP1");a.n(l).a}}]);