<template>
  <div class="header">
    <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
      <a class="home-menu-logo pure-menu-heading" href="#">BE</a>

      <ul v-if="!isLogined" class="pure-menu-list">
        <li class="pure-menu-item"><a href="#" class="home-menu-link pure-menu-link">登 录</a></li>
        <li class="pure-menu-item"><a href="#" class="home-menu-link pure-menu-link">注 册</a></li>
      </ul>

      <ul v-if="isLogined" class="pure-menu-list">
        <li is="el-dropdown" class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img src="@/assets/avatar/identicon01.png" class="pure-img">
            <i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link class="inlineBlock" to="/">
              <el-dropdown-item>
                个人信息
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
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth' // 验权

export default {
  name: 'Navbar',
  computed: {
    isLogined: function() {
      if (this.token) {
        return true
      } else {
        return false
      }
    },
    ...mapGetters([
      'token',
      'avatar'
    ])
  },
  created() {
    if (this.token) {
      this.isLogined = true
    } else {
      this.isLogined = false
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
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";

.home-menu {
  height: $navbar-height;
  line-height: $navbar-height;
  background: $navbar-default-bg;
  padding: 0em 1em;
}
.home-menu-logo {
  display: inline-block;
  height: $navbar-height;
  line-height: $navbar-height;
  vertical-align: middle;
  padding: 0em 0em;
}
.home-menu-link {
  display: inline-block;
  height: $navbar-height;
  line-height: $navbar-height;
  vertical-align: middle;
  padding: 0em 0.5em;
}

.pure-menu.pure-menu-fixed {
    /* Fixed menus normally have a border at the bottom. */
    border-bottom: none;
    /* I need a higher z-index here because of the scroll-over effect. */
    z-index: $zindex-navbar-fixed;
}

.home-menu .pure-menu-heading {
  color: $navbar-default-color;
  font-weight: bold;
}
.home-menu .pure-menu-selected a {
    color: $navbar-default-link-active-color;
}

.home-menu a {
    color: $navbar-default-link-color;
}
.home-menu li a:hover,
.home-menu li a:focus {
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
  .home-menu {
      text-align: left;
  }
  .home-menu ul {
      float: right;
  }
}
</style>

