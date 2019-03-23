(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5874"],{"/CEO":function(e,t,o){"use strict";var r=o("RHkU");o.n(r).a},"/zmP":function(e,t,o){"use strict";var r=o("WvzK");o.n(r).a},RHkU:function(e,t,o){},WvzK:function(e,t,o){},h97h:function(e,t,o){"use strict";o.r(t);var r=o("XJYT"),a=o("t3Un");var s=o("42cJ"),n={name:"Signup",data:function(){var e=this,t=/^[1][3,4,5,7,8][0-9]{9}$/,o=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,r=/^[0-9]*$/,a=/^([\u4e00-\u9fa5]){2,5}$/;return{activeStep:0,formBaseInfo:{userphone:"",email:"",password:"",confirmPassword:""},formBaseInfoRules:{userphone:[{required:!0,trigger:"change",validator:function(e,o,r){""===o?r(new Error("请输入手机号！")):t.test(o)?r():r(new Error("请输入11位有效的手机号！"))}}],email:[{required:!0,trigger:"change",validator:function(e,t,r){""===t?r(new Error("请输入电子邮箱！")):o.test(t)?r():r(new Error("邮箱地址有误！"))}}],password:[{required:!0,trigger:"change",validator:function(t,o,a){""===o?a(new Error("请输入密码")):r.test(o)?(""!==e.formBaseInfo.confirmPassword&&e.$refs.formBaseInfo.validateField("confirmPassword"),a()):a(new Error("密码最小长度为8位，必须包含大写、小写字母、数字！"))}}],confirmPassword:[{required:!0,trigger:"change",validator:function(t,o,r){""===o?r(new Error("请再次输入密码")):o!==e.formBaseInfo.password?r(new Error("两次输入密码不一致!")):r()}}]},userid:"",formMoreInfo:{username:"",gender:"",parties:"",company:"",deptLevel1:"",deptLevel2:"",job:""},formMoreInfoRules:{username:[{required:!0,trigger:"change",validator:function(e,t,o){""===t?o(new Error("请输入中文姓名！")):a.test(t)?o():o(new Error("有效姓名：2~5个中文！"))}}],gender:[{required:!0,message:"请选择性别",trigger:"change"}],parties:[{required:!0,message:"请选择党派",trigger:"change"}],company:[{required:!0,message:"请选择公司",trigger:"change"}],deptLevel1:[{required:!0,message:"请选择电厂",trigger:"change"}],deptLevel2:[{required:!0,message:"请选择班组",trigger:"change"}],job:[{required:!0,message:"请选择职务",trigger:"change"}]},loading:!1,pwdType:"password",redirect:void 0}},computed:{emailLowcase:function(){return this.formBaseInfo.email.toLowerCase()}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},methods:{showPwd:function(){"password"===this.pwdType?this.pwdType="":this.pwdType="password"},checkInfo:function(e){var t=this.formBaseInfo.userphone,o=this.emailLowcase;switch(e){case"phone":/^[1][3,4,5,7,8][0-9]{9}$/.test(t)&&function(e){return Object(a.a)({url:"/users/check_phone",method:"post",data:{phone:e}})}(t).then(function(e){e.code===s.a.USERS_SIGNUP_IDENTITY_EXISTING&&(this.$refs.userphone.resetField(),Object(r.Message)({message:t+e.msg,showClose:!0,type:"error",duration:3e3}))}.bind(this)).catch(function(e){console.log(e)});break;case"email":/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(o)&&function(e){return Object(a.a)({url:"/users/check_email",method:"post",data:{email:e}})}(o).then(function(e){e.code===s.a.USERS_SIGNUP_EMAIL_EXISTING&&(this.$refs.email.resetField(),Object(r.Message)({message:o+e.msg,showClose:!0,type:"error",duration:3e3}))}.bind(this)).catch(function(e){console.log(e)})}},handleCreateUser:function(){var e=this;this.$refs.formBaseInfo.validate(function(t){if(!t)return console.log("error submit!!"),!1;var o=e.formBaseInfo.userphone,n=e.emailLowcase,i=e.formBaseInfo.password;e.$confirm("请核对信息"+o+"，"+n+" 是否正确?","提示",{confirmButtonText:"正确",cancelButtonText:"返回",type:"warning"}).then(function(){(function(e,t,o){return Object(a.a)({url:"/users/create_user",method:"post",data:{phone:e,email:t,password:o}})})(o,n,i).then(function(e){e.code===s.a.SUCCESS?(this.userid=e.userid,this.activeStep+=1):e.code===s.a.USERS_SIGNUP_USER_CREATE_FAILED&&Object(r.Message)({message:e.msg,showClose:!0,type:"error",duration:3e3})}.bind(e)).catch(function(e){console.log(e)})}).catch(function(){e.$message({type:"info",message:"已取消注册"})})})},handleResetBaseInfo:function(){this.$refs.formBaseInfo.resetFields()},handleMoreInfo:function(){var e=this;this.$refs.formMoreInfo.validate(function(t){if(!t)return console.log("error submit!!"),!1;(function(e,t,o,r,s,n,i,l){return Object(a.a)({url:"/users/log_user_info",method:"post",data:{userid:e,username:t,gender:o,parties:r,company:s,dept_level_1:n,dept_level_2:i,job:l}})})(e.userid,e.formMoreInfo.username,e.formMoreInfo.gender,e.formMoreInfo.parties,e.formMoreInfo.company,e.formMoreInfo.deptLevel1,e.formMoreInfo.deptLevel2,e.formMoreInfo.job).then(function(e){e.code===s.a.SUCCESS?this.activeStep+=1:e.code===s.a.USERS_SIGNUP_LOG_USER_INFO_FAILED&&Object(r.Message)({message:e.msg,showClose:!0,type:"error",duration:3e3})}.bind(e)).catch(function(e){console.log(e)})})},handleResetMoreInfo:function(){this.$refs.formMoreInfo.resetFields()},handleToLogin:function(){this.$router.push({name:"login"})}}},i=(o("/zmP"),o("/CEO"),o("KHd+")),l=Object(i.a)(n,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"signup-container"},[o("h3",{staticClass:"title"},[e._v("欢迎加入我们")]),e._v(" "),o("el-steps",{staticClass:"signup-steps",attrs:{active:e.activeStep}},[o("el-step",{attrs:{title:"新用户"}}),e._v(" "),o("el-step",{attrs:{title:"用户信息"}}),e._v(" "),o("el-step",{attrs:{title:"去登录"}})],1),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:0===e.activeStep,expression:"activeStep === 0"}],staticClass:"form-baseinfo-container"},[o("el-form",{ref:"formBaseInfo",staticClass:"signup-form",attrs:{model:e.formBaseInfo,rules:e.formBaseInfoRules,"label-position":"left"}},[o("el-form-item",{ref:"userphone",attrs:{prop:"userphone"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"icon_mobilephone"}})],1),e._v(" "),o("el-input",{attrs:{name:"userphone",type:"text",placeholder:"手机号",clearable:""},on:{blur:function(t){e.checkInfo("phone")}},model:{value:e.formBaseInfo.userphone,callback:function(t){e.$set(e.formBaseInfo,"userphone",t)},expression:"formBaseInfo.userphone"}})],1),e._v(" "),o("el-form-item",{ref:"email",attrs:{prop:"email"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"icon_dmail_fill"}})],1),e._v(" "),o("el-input",{attrs:{name:"email",type:"text",placeholder:"电子邮箱",clearable:""},on:{blur:function(t){e.checkInfo("email")}},model:{value:e.formBaseInfo.email,callback:function(t){e.$set(e.formBaseInfo,"email",t)},expression:"formBaseInfo.email"}})],1),e._v(" "),o("el-form-item",{attrs:{prop:"password"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),o("el-input",{attrs:{type:e.pwdType,name:"password",placeholder:"密码",clearable:""},model:{value:e.formBaseInfo.password,callback:function(t){e.$set(e.formBaseInfo,"password",t)},expression:"formBaseInfo.password"}}),e._v(" "),o("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[o("svg-icon",{attrs:{"icon-class":"password"===e.pwdType?"eye":"eye-open"}})],1)],1),e._v(" "),o("el-form-item",{attrs:{prop:"confirmPassword"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),o("el-input",{attrs:{type:e.pwdType,name:"confirmPassword",placeholder:"确认密码",clearable:""},model:{value:e.formBaseInfo.confirmPassword,callback:function(t){e.$set(e.formBaseInfo,"confirmPassword",t)},expression:"formBaseInfo.confirmPassword"}}),e._v(" "),o("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[o("svg-icon",{attrs:{"icon-class":"password"===e.pwdType?"eye":"eye-open"}})],1)],1),e._v(" "),o("div",{staticStyle:{margin:"0px 0px 15px 0px",color:"#409EFF"}},[o("router-link",{attrs:{to:"/login"}},[e._v("已有账号？去登录")])],1),e._v(" "),o("el-row",{attrs:{type:"flex",justify:"space-between"}},[o("el-col",{attrs:{span:10}},[o("div",{staticClass:"grid-content"},[o("el-button",{staticStyle:{width:"100%"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleCreateUser(t)}}},[e._v("注 册")])],1)]),e._v(" "),o("el-col",{attrs:{span:10}},[o("div",{staticClass:"grid-content"},[o("el-button",{staticStyle:{width:"100%"},attrs:{loading:e.loading},nativeOn:{click:function(t){return t.preventDefault(),e.handleResetBaseInfo(t)}}},[e._v("清 空")])],1)])],1),e._v(" "),o("div",{staticClass:"tips"},[o("p",[e._v("1. 请用户输入手机号和电子邮箱")]),e._v(" "),o("p",[e._v("2. 注册后，系统将发送账户激活邮件至用户登记的电子邮箱")]),e._v(" "),o("p",[e._v("3. 激活后，用户将使用手机号登录")]),e._v(" "),o("p",[e._v("4. 请勿用银行密码和支付软件密码作为该账号密码")])])],1)],1),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:1===e.activeStep,expression:"activeStep === 1"}],staticClass:"form-moreinfo-container"},[o("el-form",{ref:"formMoreInfo",staticClass:"signup-form",attrs:{model:e.formMoreInfo,rules:e.formMoreInfoRules,"label-position":"right"}},[o("el-form-item",{attrs:{prop:"username"}},[o("el-input",{attrs:{name:"username",type:"text",placeholder:"中文姓名",clearable:""},model:{value:e.formMoreInfo.username,callback:function(t){e.$set(e.formMoreInfo,"username",t)},expression:"formMoreInfo.username"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"性别",prop:"gender"}},[o("el-radio-group",{model:{value:e.formMoreInfo.gender,callback:function(t){e.$set(e.formMoreInfo,"gender",t)},expression:"formMoreInfo.gender"}},[o("el-radio",{attrs:{label:"男"}},[e._v("男")]),e._v(" "),o("el-radio",{attrs:{label:"女"}},[e._v("女")])],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"党派",prop:"parties"}},[o("el-radio-group",{model:{value:e.formMoreInfo.parties,callback:function(t){e.$set(e.formMoreInfo,"parties",t)},expression:"formMoreInfo.parties"}},[o("el-radio",{attrs:{label:"1"}},[e._v("无党派")]),e._v(" "),o("el-radio",{attrs:{label:"2"}},[e._v("中共党员")]),e._v(" "),o("el-radio",{attrs:{label:"3"}},[e._v("其他党派")])],1)],1),e._v(" "),o("el-form-item",{attrs:{prop:"company"}},[o("el-select",{attrs:{placeholder:"请选择所属公司"},model:{value:e.formMoreInfo.company,callback:function(t){e.$set(e.formMoreInfo,"company",t)},expression:"formMoreInfo.company"}},[o("el-option",{attrs:{label:"保山能源发展股份有限公司",value:"1"}})],1)],1),e._v(" "),o("el-form-item",{attrs:{prop:"deptLevel1"}},[o("el-select",{attrs:{placeholder:"请选择所属电厂"},model:{value:e.formMoreInfo.deptLevel1,callback:function(t){e.$set(e.formMoreInfo,"deptLevel1",t)},expression:"formMoreInfo.deptLevel1"}},[o("el-option",{attrs:{label:"松山河口电厂",value:"1"}}),e._v(" "),o("el-option",{attrs:{label:"苏家河口电厂",value:"2"}})],1)],1),e._v(" "),o("el-form-item",{attrs:{prop:"deptLevel2"}},[o("el-select",{attrs:{placeholder:"请选择所属班组"},model:{value:e.formMoreInfo.deptLevel2,callback:function(t){e.$set(e.formMoreInfo,"deptLevel2",t)},expression:"formMoreInfo.deptLevel2"}},[o("el-option",{attrs:{label:"检修班",value:"1"}}),e._v(" "),o("el-option",{attrs:{label:"运行一班",value:"2"}}),e._v(" "),o("el-option",{attrs:{label:"运行二班",value:"3"}}),e._v(" "),o("el-option",{attrs:{label:"运行三班",value:"4"}}),e._v(" "),o("el-option",{attrs:{label:"运行四班",value:"5"}}),e._v(" "),o("el-option",{attrs:{label:"运行五班",value:"6"}}),e._v(" "),o("el-option",{attrs:{label:"办公室",value:"7"}})],1)],1),e._v(" "),o("el-form-item",{attrs:{prop:"job"}},[o("el-select",{attrs:{placeholder:"请选择职务"},model:{value:e.formMoreInfo.job,callback:function(t){e.$set(e.formMoreInfo,"job",t)},expression:"formMoreInfo.job"}},[o("el-option",{attrs:{label:"检修员",value:"1"}}),e._v(" "),o("el-option",{attrs:{label:"运行员",value:"2"}}),e._v(" "),o("el-option",{attrs:{label:"班长",value:"3"}})],1)],1),e._v(" "),o("el-row",{attrs:{type:"flex",justify:"space-between"}},[o("el-col",{attrs:{span:10}},[o("div",{staticClass:"grid-content"},[o("el-button",{staticStyle:{width:"100%"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleMoreInfo(t)}}},[e._v("提 交")])],1)]),e._v(" "),o("el-col",{attrs:{span:10}},[o("div",{staticClass:"grid-content"},[o("el-button",{staticStyle:{width:"100%"},attrs:{loading:e.loading},nativeOn:{click:function(t){return t.preventDefault(),e.handleResetMoreInfo(t)}}},[e._v("清 空")])],1)])],1)],1)],1),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:2===e.activeStep,expression:"activeStep === 2"}]},[o("h3",{staticStyle:{color:"#2d8cf0","text-align":"center",margin:"20px"}},[e._v("完成注册")]),e._v(" "),o("div",{staticClass:"signup-form"},[o("el-button",{staticStyle:{width:"100%"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleToLogin(t)}}},[e._v("去登录")])],1)])],1)},[],!1,null,"71aa87ec",null);l.options.__file="index.vue";t.default=l.exports}}]);