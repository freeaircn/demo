import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout_m/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: 'home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: 'BE', breadcrumb: true }
    }]
  },
  {
    path: '/signup',
    name: 'signup',
    hidden: true,
    component: () => import('@/views/signup/index'),
    meta: { title: '注册', breadcrumb: true }
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/index'),
    meta: { title: '登录', breadcrumb: true }
  },
  // {
  //   path: '/active_mail',
  //   name: 'active_mail',
  //   component: () => import('@/views/active_mail/index'),
  //   meta: {
  //     title: '激活',
  //     hideInMenu: true
  //   },
  //   hidden: true
  // },
  {
    path: '/forgot_password',
    name: 'forgot_password',
    hidden: true,
    component: () => import('@/views/user/forgot_password'),
    meta: { title: '忘记密码', breadcrumb: true }
  },
  {
    path: '/reset_password/:uid/post/:hash_code',
    name: 'reset_password',
    hidden: true,
    component: () => import('@/views/user/reset_password'),
    meta: { title: '重置密码', breadcrumb: true }
  },
  {
    path: '/user_settings',
    component: Layout,
    hidden: true,
    children: [{
      path: '/',
      name: 'user_settings',
      component: () => import('@/views/user/settings'),
      meta: { title: '用户设置', breadcrumb: true }
    }]
  },
  {
    path: '/generator',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'start_stop',
        component: () => import('@/views/station/generator/start_stop/index'),
        children: [
          {
            path: 'log',
            name: 'gen_start_log',
            component: () => import('@/views/station/generator/start_stop/log'),
            meta: { title: '机组启停', breadcrumb: true }
          },
          {
            path: 'history',
            name: 'gen_start_his',
            component: () => import('@/views/station/generator/start_stop/history'),
            meta: { title: '历史查询', breadcrumb: true }
          },
          {
            path: 'statistic',
            name: 'gen_start_stat',
            component: () => import('@/views/station/generator/start_stop/statistic'),
            meta: { title: '统计图表', breadcrumb: true }
          }
        ]
      }
    ]
  },
  // {
  //   path: '/dashboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       meta: { title: 'Dashboard', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  { path: '*', name: '404', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
