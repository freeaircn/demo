<template>
  <div class="content-wrapper">
    <div class="content-container container-sm px-responsive py-3">
      <h2 class="title is-center">{{ stationName }}</h2>
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">启停记录</el-menu-item>
        <el-menu-item index="2">查询历史</el-menu-item>
        <el-menu-item index="3">统计图表</el-menu-item>
      </el-menu>
      <router-view />
    </div>

    <div class="footer-wrapper py-responsive">
      <div class="footer-container container-xl px-responsive">
        <div class="pure-g">
          <div class="pure-u-1 pure-u-lg-1-3 gutter-space-responsive">
            <h4>BE</h4>
          </div>
          <div class="pure-u-1 pure-u-lg-1-3 gutter-space-responsive">
            <h4>链接</h4>
            <a href="#" class="footer-link">帮助</a>
          </div>
          <div class="pure-u-1 pure-u-lg-1-3 gutter-space-responsive">
            <h4>社区</h4>
            <a href="#" class="footer-link">反馈建议</a>
          </div>
        </div>
        <div class="is-right mt-4">
          <p>© 2019 Freeair Studio.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { getStationName } from '@/utils/station'

export default {
  name: 'Index',
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    stationIdx: function() {
      return store.getters.profile.station
    },
    stationName: function() {
      return getStationName(this.stationIdx)
    }
  },
  methods: {
    handleSelect(menuIndex) {
      switch (menuIndex) {
        case '1':
          this.$router.push({ path: '/generator/start_stop/log' })
          break
        case '2':
          this.$router.push({ path: '/generator/start_stop/history' })
          break
        case '3':
          this.$router.push({ path: '/generator/start_stop/statistic' })
          break
        default:
          break
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/_free_variables.scss";
@import "src/styles/_layout.scss";

.content-wrapper {
  position: relative !important;
  top: $navbar-height; left: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  // background-color:  $bg-gray-light;
}
.content-container {
  flex: 1 0 auto;
}
.title {
  font-weight: 400;
  color: $title-color;
  letter-spacing: 6px;
}

.p-text {
  font-weight: 600;
  color: $blue-light;
  font-size: $font-size-base;
}

.footer-wrapper {
  background: $footer-default-bg;
  width: 100%;
  flex: 0 0 auto;
  h4 {
    color: $title-color;
  }
  .footer-link {
    font-size: 14px;
    color: $text-color;
  }
  p {
    font-size: 14px;
    color: $text-color;
  }
}
</style>
