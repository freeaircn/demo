<template>
  <div class="app-wrapper">
    <!-- <div class="main-container"> -->
      <navbar/>
      <app-main/>
    <!-- </div> -->
  </div>
</template>

<script>
import ResizeMixin from './mixin/ResizeHandler'
import { Navbar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain
  },
  mixins: [ResizeMixin]
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
