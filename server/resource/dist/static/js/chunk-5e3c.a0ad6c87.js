(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5e3c"],{KRkD:function(e,t,i){},Svx8:function(e,t,i){"use strict";i.r(t);var a=i("fe1z"),n=i("42cJ"),r="https://mail.163.com",o="https://mail.126.com",l="https://mail.qq.com",s={name:"ActiveMail",data:function(){var e=/^[1][3,4,5,7,8][0-9]{9}$/,t=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;return{activeMailForm:{userphone:"",email:""},activeMailRules:{userphone:[{required:!0,trigger:"change",validator:function(t,i,a){""===i?a(new Error("请输入手机号！")):e.test(i)?a():a(new Error("请输入11位有效的手机号！"))}}],email:[{required:!0,trigger:"change",validator:function(e,i,a){""===i?a(new Error("请输入电子邮箱！")):t.test(i)?a():a(new Error("邮箱地址有误！"))}}]},loading:!1,show_contents:0,mailServerUrl:"",btn_name:"返回登录页面",redirect:void 0}},computed:{emailLowcase:function(){return this.activeMailForm.email.toLowerCase()}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},methods:{handleSendActiveMail:function(){var e=this;this.$refs.activeMailForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.loading=!0;var i=e.activeMailForm.userphone,s=e.emailLowcase;Object(a.d)(i,s).then(function(t){if(console.log(t),e.loading=!1,e.$message({type:"info",message:t.msg,duration:3e3}),t.code===n.a.USERS_ACTIVATE_USER_BEEN_ACTIVATED&&(e.show_contents=1),t.code===n.a.SUCCESS){e.btn_name="返回登录页面";var i=/@([a-z1-9]{2,3})/.exec(e.emailLowcase);null!==i&&"@163"===i[0]&&(e.mailServerUrl=r,e.btn_name="登录邮箱"),null!==i&&"@126"===i[0]&&(e.mailServerUrl=o,e.btn_name="登录邮箱"),null!==i&&"@qq"===i[0]&&(e.mailServerUrl=l,e.btn_name="登录邮箱"),e.show_contents=2}}).catch(function(t){e.loading=!1,console.log(t)})})},handleGotoLogin:function(){this.$router.push({name:"login"})},handleGoback:function(){this.$refs.activeMailForm.resetFields(),this.show_contents=0},handleGotoMailBox:function(){""===this.mailServerUrl?this.$router.push({name:"login"}):(this.$refs.activeMailForm.resetFields(),window.location.replace(this.mailServerUrl),this.mailServerUrl="")}}},c=(i("UxH4"),i("tb1G"),i("KHd+")),v=Object(c.a)(s,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"active-mail-container"},[i("div",{directives:[{name:"show",rawName:"v-show",value:0===e.show_contents,expression:"show_contents === 0"}]},[i("el-form",{ref:"activeMailForm",staticClass:"active-mail-form",attrs:{model:e.activeMailForm,rules:e.activeMailRules,"label-position":"left"}},[i("h3",{staticClass:"title"},[e._v("激 活")]),e._v(" "),i("el-form-item",{attrs:{prop:"userphone"}},[i("span",{staticClass:"svg-container"},[i("svg-icon",{attrs:{"icon-class":"icon_mobilephone"}})],1),e._v(" "),i("el-input",{attrs:{name:"userphone",type:"text",placeholder:"输入注册的手机号",clearable:""},model:{value:e.activeMailForm.userphone,callback:function(t){e.$set(e.activeMailForm,"userphone",t)},expression:"activeMailForm.userphone"}})],1),e._v(" "),i("el-form-item",{ref:"email",attrs:{prop:"email"}},[i("span",{staticClass:"svg-container"},[i("svg-icon",{attrs:{"icon-class":"icon_dmail_fill"}})],1),e._v(" "),i("el-input",{attrs:{name:"email",type:"text",placeholder:"输入注册的电子邮箱",clearable:""},model:{value:e.activeMailForm.email,callback:function(t){e.$set(e.activeMailForm,"email",t)},expression:"activeMailForm.email"}})],1),e._v(" "),i("div",{staticStyle:{margin:"0px 0px 15px 0px",color:"#409EFF"}},[i("router-link",{attrs:{to:"/login"}},[e._v("去登录")])],1),e._v(" "),i("el-form-item",[i("el-button",{staticStyle:{width:"100%"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleSendActiveMail(t)}}},[e._v("发送激活邮件")])],1),e._v(" "),i("div",{staticClass:"tips"},[i("span",{staticStyle:{"margin-right":"20px"}},[e._v(":)")])])],1)],1),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:1===e.show_contents,expression:"show_contents === 1"}]},[i("div",{staticClass:"active-mail-form"},[i("h3",{staticClass:"title"},[e._v("激 活")]),e._v(" "),i("el-button",{staticStyle:{width:"100%"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleGotoLogin(t)}}},[e._v("去登录")]),e._v(" "),i("hr",{attrs:{align:"center",width:"100%",color:"#DCDFE6",size:"1"}}),e._v(" "),i("el-button",{staticStyle:{width:"100%"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleGoback(t)}}},[e._v("返回激活其他账号")])],1)]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:2===e.show_contents,expression:"show_contents === 2"}]},[i("div",{staticClass:"active-mail-form"},[i("h3",{staticClass:"title"},[e._v("激 活")]),e._v(" "),i("el-button",{staticStyle:{width:"100%"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleGotoMailBox(t)}}},[e._v(e._s(e.btn_name))]),e._v(" "),i("hr",{attrs:{align:"center",width:"100%",color:"#DCDFE6",size:"1"}}),e._v(" "),e._m(0)],1)])])},[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tips"},[t("span",{staticStyle:{margin:"20px 0px 20px 0px","text-align":"left"}},[this._v("请用户登录自己的邮箱，点击激活邮件中的链接激活账号")])])}],!1,null,"2a1a1075",null);v.options.__file="index.vue";t.default=v.exports},UxH4:function(e,t,i){"use strict";var a=i("KRkD");i.n(a).a},mJ0n:function(e,t,i){},tb1G:function(e,t,i){"use strict";var a=i("mJ0n");i.n(a).a}}]);