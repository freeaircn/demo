<template>
  <div class="content-wrapper">
    <div class="content-container container-sm px-responsive py-3">
      <!-- <h2 class="title is-center">{{ stationName }}</h2> -->
      <h2 class="title is-center">发电机启停统计</h2>
      <el-menu :default-active="activeIndex" router mode="horizontal">
        <el-menu-item index="/generator/start_stop/log">启停记录</el-menu-item>
        <el-menu-item index="/generator/start_stop/history">查询历史</el-menu-item>
        <el-menu-item index="/generator/start_stop/statistic">统计图表</el-menu-item>
      </el-menu>
      <router-view />
    </div>
  </div>
</template>

<script>
// import store from '@/store'
// import { getStationName } from '@/utils/station'

export default {
  name: 'Index',
  data() {
    return {
      activeIndex: this.$route.path
    }
  },
  // computed: {
  //   stationIdx: function() {
  //     return store.getters.profile.station
  //   },
  //   stationName: function() {
  //     return getStationName(this.stationIdx)
  //   }
  // },
  mounted() {
    this.activeIndex = this.$route.path
  },
  methods: {
  //   handleSelect(menuIndex) {
  //     switch (menuIndex) {
  //       case '1':
  //         this.$router.push({ path: '/generator/start_stop/log' })
  //         break
  //       case '2':
  //         this.$router.push({ path: '/generator/start_stop/history' })
  //         break
  //       case '3':
  //         this.$router.push({ path: '/generator/start_stop/statistic' })
  //         break
  //       default:
  //         break
  //     }
  //   }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/_free_variables.scss";
@import "src/styles/_layout.scss";

.content-wrapper {
  position: relative !important;
  top: $navbar-height; left: 0;
  width: 100%;
  // background-color:  $bg-gray-light;
}

.title {
  font-weight: 400;
  color: $title-color;
}
.p-text {
  font-weight: 600;
  color: $blue-light;
  font-size: $font-size-base;
}
</style>
