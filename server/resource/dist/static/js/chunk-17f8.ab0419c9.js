(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-17f8"],{"1+xr":function(e,t,a){"use strict";var o=a("4dEM");a.n(o).a},"4dEM":function(e,t,a){},dU37:function(e,t,a){"use strict";a.r(t);var o=a("Q2AE"),n=a("jR8p"),i=a("wk8/"),r=a("z0WU"),l=a("Yfch"),s=a("42cJ"),c={name:"UserSettings",data:function(){var e=this;return{phone:"",email:"",account_active:"",account_detailed_done:"",profile:{username:"",gender:"",political_party:"",company:"",subcompany:"",station:"",department:"",job:""},profileRules:{username:[{required:!0,trigger:"change",validator:function(e,t,a){Object(l.b)(t)?a():a(new Error("请输入中文姓名(2~5个汉字)"))}}],gender:[{required:!0,message:"请选择性别",trigger:"change"}],political_party:[{required:!0,message:"请选择党派",trigger:"change"}],company:[{required:!0,message:"请选择公司",trigger:"change"}],subcompany:[{required:!0,message:"请选择子公司",trigger:"change"}],station:[{required:!0,message:"请选择电厂",trigger:"change"}],department:[{required:!0,message:"请选择班组",trigger:"change"}],job:[{required:!0,message:"请选择职务",trigger:"change"}]},pwdForm:{oldPwd:"",newPwd:"",newConfirm:""},pwdRules:{oldPwd:[{required:!0,trigger:"change",message:"请输入旧密码"}],newPwd:[{required:!0,trigger:"change",validator:function(t,a,o){Object(l.e)(a)?(""!==e.pwdForm.newConfirm&&e.$refs.pwd_form.validateField("newConfirm"),o()):o(new Error("密码最小长度为8位，必须包含大写、小写字母、数字！"))}}],newConfirm:[{required:!0,trigger:"change",validator:function(t,a,o){a!==e.pwdForm.newPwd?o(new Error("两次输入密码不一致!")):o()}}]},emailForm:{newEmail:"",verificationCode:""},emailRules:{newEmail:[{required:!0,trigger:"change",validator:function(e,t,a){Object(l.d)(t)?a():a(new Error("请输入有效的邮箱！"))}}],verificationCode:[{required:!0,trigger:"change",validator:function(e,t,a){Object(l.c)(t)?a():a(new Error("请输入5位验证码！"))}}]},phoneForm:{newPhone:""},phoneRules:{newPhone:[{required:!0,trigger:"change",validator:function(e,t,a){Object(l.f)(t)?a():a(new Error("请输入11位有效的手机号！"))}}]},content_loading:!0,isUpdateUserBtnDisable:!0,isReuqestCodeBtnDisable:!1,requestCodeBtnContent:"获取验证码",timer1s:null,countdown:60,redirect:void 0}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},mounted:function(){Object(i.a)().then(function(e){e.code===s.a.SUCCESS?(this.phone=e.phone,this.email=e.email,this.account_active=e.active,this.account_detailed_done=e.detailed_info_done,this.profile.username=e.profile.username,this.profile.gender=e.profile.gender,this.profile.political_party=e.profile.political_party,this.profile.company=e.profile.company,this.profile.subcompany=e.profile.subcompany,this.profile.station=e.profile.station,this.profile.department=e.profile.department,this.profile.job=e.profile.job,this.content_loading=!1):this.$message({type:"info",message:e.msg,showClose:!0})}.bind(this)).catch(function(e){console.log(e),this.$message({type:"info",message:"服务器响应超时，请重试！",showClose:!0})})},methods:{profileItemChange:function(){this.isUpdateUserBtnDisable=!1},handleUpdateUserProfile:function(){var e=this;this.$refs.profile_form.validate(function(t){if(!t)return!1;Object(i.e)(e.profile).then(function(e){e.code===s.a.SUCCESS&&(this.isUpdateUserBtnDisable=!0),this.$message({type:"info",message:e.msg,duration:3e3})}.bind(e)).catch(function(e){console.log(e),this.$message({type:"info",message:"服务器响应超时，请重试！",duration:3e3})})})},handleUpdatePassword:function(){var e=this;this.$refs.pwd_form.validate(function(t){if(!t)return!1;Object(i.c)(e.pwdForm.oldPwd,e.pwdForm.newPwd).then(function(e){e.code===s.a.SUCCESS&&this.$refs.pwd_form.resetFields(),this.$message({type:"info",message:e.msg,duration:3e3})}.bind(e)).catch(function(e){console.log(e),this.$message({type:"info",message:"服务器响应超时，请重试！",duration:3e3})})})},diableRequestCodeBtn:function(){var e=this;this.isReuqestCodeBtnDisable=!0,this.requestCodeBtnContent="重新发送("+this.countdown+")",this.timer1s||(this.timer1s=setInterval(function(){e.countdown>0&&e.countdown<=60&&(e.countdown--,0!==e.countdown?e.requestCodeBtnContent="重新发送("+e.countdown+")":(clearInterval(e.timer1s),e.isReuqestCodeBtnDisable=!1,e.requestCodeBtnContent="获取验证码",e.countdown=60,e.timer1s=null))},1e3))},handleRequestCode:function(){if(this.$refs.email_form.validateField("newEmail"),""===this.$refs.newEmail.validateMessage){if(this.emailForm.newEmail===this.email)return this.$message({type:"info",message:"与正在使用的邮箱相同！",duration:3e3}),!1;this.diableRequestCodeBtn(),Object(n.d)(this.emailForm.newEmail).then(function(e){if(e.code===s.a.SUCCESS){var t=Object(r.a)(this.emailForm.newEmail);t?(this.$message({type:"info",message:"验证码已发送，5秒后将在新窗口打开邮箱登录页面",duration:4e3}),Object(r.b)(t,"blank")):this.$message({type:"info",message:"验证码已发送，请用户登录邮箱查看验证码",duration:3e3})}else this.$message({type:"info",message:e.msg,duration:3e3})}.bind(this)).catch(function(e){console.log(e),this.$message({type:"info",message:"服务器响应超时，请重新获取!",duration:3e3})})}},handleUpdateEmail:function(){var e=this;this.$refs.email_form.validate(function(t){if(!t)return!1;Object(i.b)(e.email,e.emailForm.newEmail,e.emailForm.verificationCode).then(function(e){e.code===s.a.SUCCESS&&(this.email=this.emailForm.newEmail,this.$refs.email_form.resetFields()),this.$message({type:"info",message:e.msg,duration:3e3})}.bind(e)).catch(function(e){console.log(e),this.$message({type:"info",message:"服务器响应超时，请重试！",duration:3e3})})})},handleUpdatePhone:function(){var e=this;this.$refs.phone_form.validate(function(t){return!!t&&(e.phoneForm.newPhone===e.phone?(e.$message({type:"info",message:"与正在使用的手机号相同！",duration:3e3}),!1):void Object(i.d)(e.phoneForm.newPhone).then(function(e){var t=this;this.$message({type:"info",message:e.msg,duration:3e3}),e.code===s.a.SUCCESS&&(this.$refs.phone_form.resetFields(),o.a.dispatch("FedLogOut").then(function(){t.$router.replace({path:"/login"})}).catch(function(e){console.log(e),t.$router.replace({path:"/login"})}))}.bind(e)).catch(function(e){console.log(e),this.$message({type:"info",message:"服务器响应超时，请重试！",duration:3e3})}))})}}},p=(a("1+xr"),a("KHd+")),d=Object(p.a)(c,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content-wrapper"},[a("div",{staticClass:"content-container py-3"},[a("el-tabs",{directives:[{name:"loading",rawName:"v-loading",value:e.content_loading,expression:"content_loading"}],staticClass:"container-sm px-responsive",attrs:{type:"card"}},[a("el-tab-pane",{attrs:{label:"个人信息"}},[a("el-form",{ref:"profile_form",attrs:{model:e.profile,rules:e.profileRules,"label-position":"right"}},[a("el-form-item",{attrs:{prop:"username"}},[a("el-input",{attrs:{name:"username",type:"text",placeholder:"中文姓名",clearable:""},on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.username,callback:function(t){e.$set(e.profile,"username",t)},expression:"profile.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性别",prop:"gender"}},[a("el-radio-group",{on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.gender,callback:function(t){e.$set(e.profile,"gender",t)},expression:"profile.gender"}},[a("el-radio",{attrs:{label:"男"}},[e._v("男")]),e._v(" "),a("el-radio",{attrs:{label:"女"}},[e._v("女")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"党派",prop:"political_party"}},[a("el-radio-group",{on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.political_party,callback:function(t){e.$set(e.profile,"political_party",t)},expression:"profile.political_party"}},[a("el-radio",{attrs:{label:"1"}},[e._v("无党派")]),e._v(" "),a("el-radio",{attrs:{label:"2"}},[e._v("中共党员")]),e._v(" "),a("el-radio",{attrs:{label:"3"}},[e._v("其他党派")])],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"company"}},[a("el-select",{attrs:{placeholder:"请选择所属公司"},on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.company,callback:function(t){e.$set(e.profile,"company",t)},expression:"profile.company"}},[a("el-option",{attrs:{label:"保山能源发展股份有限公司",value:"1"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"subcompany"}},[a("el-select",{attrs:{placeholder:"请选择子公司"},on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.subcompany,callback:function(t){e.$set(e.profile,"subcompany",t)},expression:"profile.subcompany"}},[a("el-option",{attrs:{label:"保山槟榔江水电开发有限公司",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"直属电厂",value:"2"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"station"}},[a("el-select",{attrs:{placeholder:"请选择所属电厂"},on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.station,callback:function(t){e.$set(e.profile,"station",t)},expression:"profile.station"}},[a("el-option",{attrs:{label:"松山河口电厂",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"苏家河口电厂",value:"2"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"department"}},[a("el-select",{attrs:{placeholder:"请选择所属班组"},on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.department,callback:function(t){e.$set(e.profile,"department",t)},expression:"profile.department"}},[a("el-option",{attrs:{label:"检修班",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"运行一班",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"运行二班",value:"3"}}),e._v(" "),a("el-option",{attrs:{label:"运行三班",value:"4"}}),e._v(" "),a("el-option",{attrs:{label:"运行四班",value:"5"}}),e._v(" "),a("el-option",{attrs:{label:"运行五班",value:"6"}}),e._v(" "),a("el-option",{attrs:{label:"办公室",value:"7"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"job"}},[a("el-select",{attrs:{placeholder:"请选择职务"},on:{change:function(t){e.profileItemChange()}},model:{value:e.profile.job,callback:function(t){e.$set(e.profile,"job",t)},expression:"profile.job"}},[a("el-option",{attrs:{label:"检修员",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"运行员",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"班长",value:"3"}})],1)],1),e._v(" "),a("el-form-item",[a("el-button",{staticStyle:{width:"100%"},attrs:{disabled:e.isUpdateUserBtnDisable,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleUpdateUserProfile(t)}}},[e._v("更 新")])],1)],1)],1),e._v(" "),a("el-tab-pane",{attrs:{label:"密码"}},[a("div",{staticClass:"pwd-container"},[a("div",{staticClass:"is-left"},[a("p",{staticClass:"p-text"},[e._v("更改密码")])]),e._v(" "),a("el-form",{ref:"pwd_form",attrs:{model:e.pwdForm,rules:e.pwdRules,"label-position":"right"}},[a("el-form-item",{attrs:{prop:"oldPwd"}},[a("el-input",{attrs:{type:"password",placeholder:"输入旧密码",clearable:""},model:{value:e.pwdForm.oldPwd,callback:function(t){e.$set(e.pwdForm,"oldPwd",t)},expression:"pwdForm.oldPwd"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"newPwd"}},[a("el-input",{attrs:{type:"password",placeholder:"输入新密码",clearable:""},model:{value:e.pwdForm.newPwd,callback:function(t){e.$set(e.pwdForm,"newPwd",t)},expression:"pwdForm.newPwd"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"newConfirm"}},[a("el-input",{attrs:{type:"password",placeholder:"再次输入新密码",clearable:""},model:{value:e.pwdForm.newConfirm,callback:function(t){e.$set(e.pwdForm,"newConfirm",t)},expression:"pwdForm.newConfirm"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleUpdatePassword(t)}}},[e._v("更改密码")])],1)],1)],1)]),e._v(" "),a("el-tab-pane",{attrs:{label:"邮箱"}},[a("div",{staticClass:"email-container"},[a("div",{staticClass:"is-left"},[a("p",{staticClass:"p-text"},[e._v("注册邮箱 "+e._s(e.email))])]),e._v(" "),a("el-form",{ref:"email_form",attrs:{model:e.emailForm,rules:e.emailRules,"label-position":"right"}},[a("el-form-item",{ref:"newEmail",attrs:{prop:"newEmail"}},[a("el-input",{attrs:{type:"text",placeholder:"输入新邮箱",clearable:""},model:{value:e.emailForm.newEmail,callback:function(t){e.$set(e.emailForm,"newEmail",t)},expression:"emailForm.newEmail"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"verificationCode"}},[a("el-input",{attrs:{type:"text",placeholder:"输入验证码",clearable:""},model:{value:e.emailForm.verificationCode,callback:function(t){e.$set(e.emailForm,"verificationCode",t)},expression:"emailForm.verificationCode"}})],1),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.requestCodeBtnContent,expression:"requestCodeBtnContent"}],staticClass:"btn-code",attrs:{disabled:e.isReuqestCodeBtnDisable,type:"button"},domProps:{value:e.requestCodeBtnContent},on:{click:e.handleRequestCode,input:function(t){t.target.composing||(e.requestCodeBtnContent=t.target.value)}}}),e._v(" "),a("el-form-item",[a("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleUpdateEmail(t)}}},[e._v("更改邮箱")])],1)],1)],1)]),e._v(" "),a("el-tab-pane",{attrs:{label:"手机号"}},[a("div",{staticClass:"phone-container"},[a("div",{staticClass:"is-left"},[a("p",{staticClass:"p-text"},[e._v("注册手机号 "+e._s(e.phone))])]),e._v(" "),a("el-form",{ref:"phone_form",attrs:{model:e.phoneForm,rules:e.phoneRules,"label-position":"right"}},[a("el-form-item",{attrs:{prop:"newPhone"}},[a("el-input",{attrs:{type:"text",placeholder:"输入新手机号",clearable:""},model:{value:e.phoneForm.newPhone,callback:function(t){e.$set(e.phoneForm,"newPhone",t)},expression:"phoneForm.newPhone"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleUpdatePhone(t)}}},[e._v("更改手机号")])],1)],1)],1)])],1)],1),e._v(" "),e._m(0)])},[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"footer-wrapper py-responsive"},[a("div",{staticClass:"footer-container container-xl px-responsive"},[a("div",{staticClass:"pure-g"},[a("div",{staticClass:"pure-u-1 pure-u-lg-1-3 gutter-space-responsive"},[a("h4",[e._v("BE")])]),e._v(" "),a("div",{staticClass:"pure-u-1 pure-u-lg-1-3 gutter-space-responsive"},[a("h4",[e._v("链接")]),e._v(" "),a("a",{staticClass:"footer-link",attrs:{href:"#"}},[e._v("帮助")])]),e._v(" "),a("div",{staticClass:"pure-u-1 pure-u-lg-1-3 gutter-space-responsive"},[a("h4",[e._v("社区")]),e._v(" "),a("a",{staticClass:"footer-link",attrs:{href:"#"}},[e._v("反馈建议")])])]),e._v(" "),a("div",{staticClass:"is-right mt-4"},[a("p",[e._v("© 2019 Freeair Studio.")])])])])}],!1,null,"392dc94d",null);d.options.__file="settings.vue";t.default=d.exports},jR8p:function(e,t,a){"use strict";a.d(t,"c",function(){return n}),a.d(t,"d",function(){return i}),a.d(t,"a",function(){return r}),a.d(t,"b",function(){return l});var o=a("t3Un");function n(e){return Object(o.a)({url:"/users/check_phone",method:"post",data:{phone:e}})}function i(e){return Object(o.a)({url:"/users/request_code",method:"post",data:{email:e}})}function r(e,t){return Object(o.a)({url:"/users/check_verification_code",method:"post",data:{email:e,code:t}})}function l(e,t,a){return Object(o.a)({url:"/users/create_user",method:"post",data:{phone:e,email:t,password:a}})}},z0WU:function(e,t,a){"use strict";a.d(t,"a",function(){return n}),a.d(t,"b",function(){return i});var o=a("bPQK");function n(e){var t=/@([a-z1-9]{2,3})/.exec(e);return null!==t&&"@163"===t[0]?o.a.MAIL_163_URL:null!==t&&"@126"===t[0]?o.a.MAIL_126_URL:null!==t&&"@139"===t[0]?o.a.MAIL_139_URL:null!==t&&"@qq"===t[0]&&o.a.MAIL_QQ_URL}function i(e,t){var a=setInterval(function(){clearInterval(a),a=null,"blank"===t&&window.open(e,"_blank"),"replace"===t&&window.location.replace(e)},5e3)}}}]);