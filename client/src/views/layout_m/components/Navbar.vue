<template>
  <div class="navbar-wrapper">
    <div class="navbar-container container-xl px-responsive">
      <div class="nav-link-wrapper">
        <div class="nav-link-container">
          <router-link class="nav-logo" to="/home">BE</router-link>
          <el-menu :default-active="$route.path" router mode="horizontal" background-color="#f8f8f9" class="nav-menus">
            <el-menu-item index="/home">首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title">厂站</template>
              <el-menu-item index="/station">松山河口电厂</el-menu-item>
              <el-menu-item index="3">电量</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>

      <div v-if="!isLogined" class="nav-other-wrapper">
        <router-link to="/login" class="">登录</router-link>
        <el-divider direction="vertical" />
        <router-link to="/signup" class="">注册</router-link>
      </div>

      <div v-if="isLogined" class="nav-other-wrapper">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img src="@/assets/avatar/identicon01.png" class="">
            <span style="color:#606266; font-size:14px;">{{ username }}</span>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/user_settings">
              <el-dropdown-item>
                用户设置
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display:block;" @click="handleLogout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
  <!-- https://blog.csdn.net/baidu_27438681/article/details/82729776 -->
</template>

<script>
import store from '@/store'
// import { mapGetters } from 'vuex'
// import { getToken } from '@/utils/auth' // 验权

export default {
  name: 'Navbar',
  computed: {
    isLogined: function() {
      if (store.getters.token) {
        return true
      } else {
        return false
      }
    },
    username: function() {
      return store.getters.profile.username
    }
  },
  methods: {
    handleLogout() {
      // if (getToken()) {
      store.dispatch('FedLogOut')
        .then(() => {
          this.$message({
            type: 'info',
            message: '您已退出登录',
            duration: 3 * 1000
          })
          // TODO：路由 replace Home 页面
          this.$router.replace({ path: '/' })
        })
        .catch(err => {
          console.log(err)
          // TODO：路由 replace Login 页面
          this.$router.replace({ path: '/login' })
        })
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* reset element-ui css */
.navbar-container {
  i {
    display: none;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>

.navbar-wrapper{
  width: 100%;
  height: $navbar-height;
  line-height: $navbar-height;
  background: $navbar-default-bg;
  position: fixed;
  top: 0;
  left: 0;
  z-index: $zindex-navbar-fixed;
}

.navbar-container {
  position: relative;
  display: flex;
  justify-content: space-between;
}

.nav-link-wrapper {
  flex: 0 0 auto;
  .nav-link-container {
    display: flex;
    .nav-menus {
      padding-left: 40px;
    }
  }
}

.nav-other-wrapper {
  flex: 0 0 auto;
  font-size: $font-size-base;
}

.navbar-container a {
    color: $navbar-default-link-color;
}
.navbar-container a:hover,
.navbar-container a:focus {
    background: none;
    border: none;
    color: $navbar-default-link-hover-color;
}

.avatar-container {
  display: inline-block;
  position: relative;
}
.avatar-wrapper {
  cursor: pointer;
  position: relative;
  img {
    display: inline-block;
    height: $navbar-icon-height;
    line-height: $navbar-icon-height;
    vertical-align: middle;
  }
}
</style>

