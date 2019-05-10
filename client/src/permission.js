import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

// 不需要登录可访问的页面
const whiteList = ['/home', '/login', '/signup', '/forgot_password', '/reset_password/:uid/post/:hash_code', '/404']
// 所有前端路由
const routerFullList = ['/home', '/signup', '/login', '/user_settings', '/forgot_password', '/reset_password/:uid/post/:hash_code', '/generator/start_stop/log', '/404']

// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   // if (to.name === 'reset_password_by_code') {
//   //   const code = this.$route.params.code
//   //   console.log(code)
//   // }
//   const token = getToken()
//   if (!token) {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       if (routerFullList.indexOf(to.path) !== -1) {
//         Message({
//           type: 'warning',
//           message: '请登录后，继续访问！',
//           duration: 3 * 1000,
//           showClose: true
//         })
//         next(`/login?redirect=${to.path}`)
//       } else {
//         next({ path: '/404' })
//       }
//     }
//   } else {
//     if (store.getters.phone === '') {
//       store.dispatch('GetUserProfile')
//         .then(() => { // 拉取用户信息
//           next()
//         }).catch(() => {
//           store.dispatch('FedLogOut').then(() => {
//             Message.error('服务器未响应，请重新登录！')
//             next({ path: '/' })
//           })
//         })
//     } else {
//       next()
//     }
//   }
// })

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
