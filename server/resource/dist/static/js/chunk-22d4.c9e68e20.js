(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-22d4"],{"1Mo9":function(e,t,o){},HAJa:function(e,t,o){"use strict";var r=o("nAmh");o.n(r).a},h6Y3:function(e,t,o){"use strict";o.r(t);var r=o("fe1z"),n=o("42cJ"),a=o("bPQK"),i={name:"ForgotPassword",data:function(){var e=a.a.REGEX_POHONE,t=a.a.REGEX_MAIL;return{forgotPwdForm:{userphone:"",email:""},forgotPwdRules:{userphone:[{required:!0,trigger:"change",validator:function(t,o,r){""===o?r(new Error("请输入手机号！")):e.test(o)?r():r(new Error("请输入11位有效的手机号！"))}}],email:[{required:!0,trigger:"change",validator:function(e,o,r){""===o?r(new Error("请输入电子邮箱！")):t.test(o)?r():r(new Error("邮箱地址有误！"))}}]},loading:!1,show_contents:0,mailServerUrl:"",btn_name:"返回登录页面",redirect:void 0}},computed:{emailLowcase:function(){return this.forgotPwdForm.email.toLowerCase()}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},methods:{handleForgotPassword:function(){var e=this;this.$refs.forgotPwdForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.loading=!0;var o=e.forgotPwdForm.userphone,i=e.emailLowcase;Object(r.a)(o,i).then(function(t){if(console.log(t),e.loading=!1,e.$message({type:"info",message:t.msg,duration:3e3}),t.code===n.a.SUCCESS){e.btn_name="返回登录页面";var o=/@([a-z1-9]{2,3})/.exec(e.emailLowcase);null!==o&&"@163"===o[0]&&(e.mailServerUrl=a.a.MAIL_163_URL,e.btn_name="登录邮箱"),null!==o&&"@126"===o[0]&&(e.mailServerUrl=a.a.MAIL_126_URL,e.btn_name="登录邮箱"),null!==o&&"@qq"===o[0]&&(e.mailServerUrl=a.a.MAIL_QQ_URL,e.btn_name="登录邮箱"),e.show_contents=1}}).catch(function(t){e.loading=!1,console.log(t)})})},handleGotoMailBox:function(){""===this.mailServerUrl?this.$router.push({name:"login"}):(this.$refs.forgotPwdForm.resetFields(),window.location.replace(this.mailServerUrl),this.mailServerUrl="")}}},s=(o("HAJa"),o("nMe+"),o("KHd+")),l=Object(s.a)(i,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"forgot-pwd-container"},[o("div",{directives:[{name:"show",rawName:"v-show",value:0===e.show_contents,expression:"show_contents === 0"}]},[o("el-form",{ref:"forgotPwdForm",staticClass:"forgot-pwd-form",attrs:{model:e.forgotPwdForm,rules:e.forgotPwdRules,"label-position":"left"}},[o("h3",{staticClass:"title"},[e._v("忘记密码")]),e._v(" "),o("el-form-item",{attrs:{prop:"userphone"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"icon_mobilephone"}})],1),e._v(" "),o("el-input",{attrs:{name:"userphone",type:"text",placeholder:"输入注册的手机号",clearable:""},model:{value:e.forgotPwdForm.userphone,callback:function(t){e.$set(e.forgotPwdForm,"userphone",t)},expression:"forgotPwdForm.userphone"}})],1),e._v(" "),o("el-form-item",{ref:"email",attrs:{prop:"email"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"icon_dmail_fill"}})],1),e._v(" "),o("el-input",{attrs:{name:"email",type:"text",placeholder:"输入注册的电子邮箱",clearable:""},model:{value:e.forgotPwdForm.email,callback:function(t){e.$set(e.forgotPwdForm,"email",t)},expression:"forgotPwdForm.email"}})],1),e._v(" "),o("div",{staticStyle:{margin:"0px 0px 15px 0px",color:"#409EFF"}},[o("router-link",{attrs:{to:"/login"}},[e._v("去登录")])],1),e._v(" "),o("el-form-item",[o("el-button",{staticStyle:{width:"100%"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleForgotPassword(t)}}},[e._v("申请重置密码")])],1),e._v(" "),o("div",{staticClass:"tips"},[o("span",{staticStyle:{"margin-right":"20px"}},[e._v(":)")])])],1)],1),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:1===e.show_contents,expression:"show_contents === 1"}]},[o("div",{staticClass:"forgot-pwd-form"},[o("h3",{staticClass:"title"},[e._v("忘记密码")]),e._v(" "),o("el-button",{staticStyle:{width:"100%"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleGotoMailBox(t)}}},[e._v(e._s(e.btn_name))]),e._v(" "),o("hr",{attrs:{align:"center",width:"100%",color:"#DCDFE6",size:"1"}}),e._v(" "),e._m(0)],1)])])},[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tips"},[t("span",{staticStyle:{margin:"20px 0px 20px 0px","text-align":"left"}},[this._v("请用户登录自己的邮箱，点击邮件中的链接完成设置新密码")])])}],!1,null,"1d77f6aa",null);l.options.__file="index.vue";t.default=l.exports},nAmh:function(e,t,o){},"nMe+":function(e,t,o){"use strict";var r=o("1Mo9");o.n(r).a}}]);