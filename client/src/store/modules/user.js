// import { login, logout, getInfo } from '@/api/login'
import { login, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { requestUserInfo } from '@/api/user'
import { Constants } from '@/Constants'

const user = {
  state: {
    token: getToken(),
    // token: '',
    avatar: '',
    roles: [],
    phone: '',
    email: '',
    user_active: '',
    user_detailed_done: '',
    //
    profile: {
      username: '',
      gender: '',
      politicalParty: '',
      company: '',
      subcompany: '',
      station: '',
      department: '',
      job: ''
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    // SET_NAME: (state, name) => {
    //   state.name = name
    // },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_USER_EMAIL: (state, emial) => {
      state.emial = emial
    },
    SET_USER_STATE: (state, active, user_detailed_done) => {
      state.user_active = active
      state.user_detailed_done = user_detailed_done
    },
    SET_USER_PROFILE: (state, profile) => {
      state.profile.username = profile.username
      state.profile.gender = profile.gender
      state.profile.politicalParty = profile.political_party
      state.profile.company = profile.company
      state.profile.subcompany = profile.subcompany
      state.profile.station = profile.station
      state.profile.department = profile.department
      state.profile.job = profile.job
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
            commit('SET_USER_STATE', data.active, data.detailed_info_done)
            resolve(data.detailed_info_done)
          } else {
            reject(data.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(data => {
    //       if (data.code === Constants.SUCCESS) {
    //         resolve(data.info)
    //       } else {
    //         reject(data.msg)
    //       }
    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    GetUserProfile({ commit }) {
      return new Promise((resolve, reject) => {
        requestUserInfo().then(data => {
          if (data.code === Constants.SUCCESS) {
            commit('SET_USER_PHONE', data.phone)
            commit('SET_USER_EMAIL', data.email)
            commit('SET_USER_PROFILE', data.profile)
            resolve()
          } else {
            reject(data.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // EmptyUserProfile({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_USER_PHONE', '')
    //     resolve()
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_USER_STATE', '', '')
          commit('SET_USER_PHONE', '')
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
        commit('SET_USER_STATE', '', '')
        commit('SET_USER_PHONE', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
