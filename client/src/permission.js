import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

// 不需要登录可访问的页面
const whiteList = ['/home', '/login', '/signup']

router.beforeEach((to, from, next) => {
  NProgress.start()
  // if (to.name === 'reset_password_by_code') {
  //   const code = this.$route.params.code
  //   console.log(code)
  // }
  const token = getToken()
  if (!token) {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    if (store.getters.phone === '') {
      store.dispatch('GetUserProfile')
        .then(() => { // 拉取用户信息
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err)
            next({ path: '/' })
          })
        })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
