import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

// const whiteList = ['/login'] // 不重定向白名单

// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   console.log('cookie: ' + getToken())
//   console.log('store token: ' + store.getters.token)

//   // if (to.name === 'reset_password_by_code') {
//   //   const code = this.$route.params.code
//   //   console.log(code)
//   // }
//   if (getToken()) {
//     if (store.getters.token === '') {
//       console.log('begin to GetUserProfile')
//       store.dispatch('GetUserProfile')
//         .then(() => { // 拉取用户信息
//           console.log('GetUserProfile success')
//           next()
//         }).catch(() => {
//           console.log('GetUserProfile catch err')
//           // store.dispatch('FedLogOut').then(() => {
//           //   Message.error(err)
//           //   next({ path: '/' })
//           // })
//         })
//     } else {
//       next()
//     }
//   } else {
//     next()
//     // if (whiteList.indexOf(to.path) !== -1) {
//     //   next()
//     // } else {
//     //   next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
//     //   NProgress.done()
//     // }
//   }
// })

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
