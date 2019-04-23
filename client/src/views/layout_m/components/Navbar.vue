<template>
  <div class="navbar-wrapper pure-menu pure-menu-horizontal pure-menu-fixed">
    <div class="navbar-container container-xl px-responsive">
      <!-- <a class="navbar-logo pure-menu-heading" href="#">BE</a> -->
      <router-link class="navbar-logo pure-menu-heading" to="/home">BE</router-link>
      <!-- <router-link class="navbar-logo pure-menu-heading" to="/home"><span><svg-logo logo-class="be_green" /></span></router-link> -->

      <ul v-if="!isLogined" class="pure-menu-list">
        <li class="pure-menu-item"><router-link to="/login" class="navbar-link pure-menu-link">登 录</router-link></li>
        <li class="pure-menu-item"><router-link to="/signup" class="navbar-link pure-menu-link">注 册</router-link></li>
      </ul>

      <ul v-if="isLogined" class="pure-menu-list">
        <li is="el-dropdown" class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img src="@/assets/avatar/identicon01.png" class="pure-img">
            <i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link class="inlineBlock" to="/user_settings">
              <el-dropdown-item>
                用户设置
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display:block;" @click="handleLogout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '@/store'
// import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth' // 验权

export default {
  name: 'Navbar',
  computed: {
    isLogined: function() {
      if (store.getters.token) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    handleLogout() {
      if (getToken()) {
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
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/_free_variables";
@import "src/styles/_layout.scss";

.navbar-wrapper{
  height: $navbar-height;
  line-height: $navbar-height;
  background: $navbar-default-bg;
  text-align: center;
}

.navbar-container {
    text-align: left;
}
.navbar-container ul {
    float: right;
}
.pure-menu.pure-menu-fixed {
    /* Fixed menus normally have a border at the bottom. */
    border-bottom: none;
    /* I need a higher z-index here because of the scroll-over effect. */
    z-index: $zindex-navbar-fixed;
}

.navbar-logo {
  display: inline-block;
  height: $navbar-height;
  line-height: $navbar-height;
  vertical-align: middle;
  padding: 0em 0em;
}
.navbar-link {
  display: inline-block;
  height: $navbar-height;
  line-height: $navbar-height;
  vertical-align: middle;
  padding: 0em 0.5em;
}
.navbar-container .pure-menu-heading {
  color: $navbar-default-color;
  font-weight: bold;
}
.navbar-container .pure-menu-selected a {
    color: $navbar-default-link-active-color;
}

.navbar-container a {
    color: $navbar-default-link-color;
}
.navbar-container li a:hover,
.navbar-container li a:focus {
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
    // padding: 0em 1em;
  }
}
.el-icon-caret-bottom {
  display: inline-block;
  font-size: $font-size-small;
}

@media (min-width: 320px) {
  /* We can align the menu header to the left, but float the
  menu items to the right. */
  // .navbar-container {
  //     text-align: left;
  // }
  // .navbar-container ul {
  //     float: right;
  // }
}
</style>

