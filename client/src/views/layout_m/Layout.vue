<template>
  <div class="app-wrapper">
    <!-- <div class="main-container"> -->
    <navbar class="navbar" />
    <breadcrumb class="breadcrumb" />
    <app-main class="app-main" />
    <app-footer class="app-footer" />
    <!-- </div> -->
  </div>
</template>

<script>
import ResizeMixin from './mixin/ResizeHandler'
import Breadcrumb from '@/components/Breadcrumb'
import { Navbar, AppMain, AppFooter } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Breadcrumb,
    AppMain,
    AppFooter
  },
  mixins: [ResizeMixin]
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  @import "src/styles/_free_variables.scss";
  @import "src/styles/_layout.scss";

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
    .breadcrumb {
      position: relative !important;
      top: $navbar-height; left: 0;
      flex: 0 0 auto;
    }
    .app-main {
      position: relative !important;
      top: calc(#{$navbar-height} + #{$breadcrumb-height}); left: 0;
      flex: 1 0 auto;
      margin-bottom: 64px;
    }
    .app-footer {
      flex: 0 0 auto;
    }
  }
</style>
