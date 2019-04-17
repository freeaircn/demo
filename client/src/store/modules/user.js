import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Constants } from '@/Constants'

const user = {
  state: {
    token: getToken(),
    avatar: '',
    roles: [],
    phone: '',
    email: '',
    active: '',
    user_detailed_done: '',
    //
    name: '',
    gender: '',
    userOrgInfo: {
      politicalParty: '',
      company: '',
      dept_lv10: '',
      dept_lv20: '',
      dept_lv30: '',
      job: ''
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_GENDER: (state, gender) => {
      state.gender = gender
    },
    SET_USER_INFO: (state, phone, email, active, user_detailed_done) => {
      state.phone = phone
      state.email = email
      state.active = active
      state.user_detailed_done = user_detailed_done
    },
    SET_USER_ORG_INFO: (state, political_party, company, dept_lv10, dept_lv20, dept_lv30, job) => {
      state.userOrgInfo.politicalParty = political_party
      state.userOrgInfo.company = company
      state.userOrgInfo.dept_lv10 = dept_lv10
      state.userOrgInfo.dept_lv20 = dept_lv20
      state.userOrgInfo.dept_lv30 = dept_lv30
      state.userOrgInfo.job = job
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const userphone = userInfo.userphone.trim()
      return new Promise((resolve, reject) => {
        login(userphone, userInfo.password).then(data => {
          if (data.code === Constants.SUCCESS) {
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            commit('SET_USER_INFO', data.phone, data.email, data.active, data.detailed_info_done)
            if (data.detailed_info_done === '1') {
              commit('SET_NAME', data.name)
              commit('SET_GENDER', data.gender)
              commit('SET_USER_ORG_INFO', data.political_party, data.company, data.dept_lv10, data.dept_lv20, data.dept_lv30, data.job)
            }
            resolve(data)
          } else {
            reject(data.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(data => {
          if (data.code === Constants.SUCCESS) {
            resolve(data.info)
          } else {
            reject(data.msg)
          }
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          // resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    }
  }
}

export default user
