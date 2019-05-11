<template>
  <div class="app-wrapper">
    <!-- <div class="main-container"> -->
    <navbar class="navbar" />
    <app-main class="app-main" />
    <app-footer class="app-footer" />
    <!-- </div> -->
  </div>
</template>

<script>
import ResizeMixin from './mixin/ResizeHandler'
import { Navbar, AppMain, AppFooter } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    AppFooter
  },
  mixins: [ResizeMixin]
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    // @include clearfix;
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    .navbar {
      flex: 0 0 auto;
    }
    .app-main {
      flex: 1 0 auto;
      margin-bottom: 64px;
    }
    .app-footer {
      flex: 0 0 auto;
    }
  }
</style>
