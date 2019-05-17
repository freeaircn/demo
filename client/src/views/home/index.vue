<template>
  <div class="home-container">
    <div class="jumbotron-wrapper">
      <div class="jumbotron-container container-xl px-responsive">
        <el-row :gutter="5" class="v-center">
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="sm-and-down-hidden">
              <h1 class="jumbotron-head is-center">Built for us</h1>
              <p class="jumbotron-subhead is-center">融合，共享，触手可及的信息平台</p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
            <div>
              <img class="is-center img-responsive sm-and-down-hidden" src="@/assets/home_lg.svg" alt="web_pic" >
              <img class="is-center img-responsive sm-and-up-hidden" src="@/assets/home_xs.svg" alt="web_pic" >
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="content-wrapper py-responsive">
      <div class="content-container container-xl px-responsive">
        <h1 class="content-head is-center">从这里开始</h1>
        <el-row :gutter="5">
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <el-card shadow="hover" class="is-center">
              <router-link to="/generator/start_stop/log"><img class="w-20" src="@/assets/start_stop.svg" alt="web_pic" ></router-link>
              <h3 class="content-subhead">机组启停</h3>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <el-card shadow="hover" class="is-center">
              <img class="w-20" src="@/assets/electricity_quantity.svg" alt="web_pic" >
              <h3 class="content-subhead">电量</h3>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <el-card shadow="hover" class="is-center">
              <img class="w-20" src="@/assets/others.svg" alt="web_pic" >
              <h3 class="content-subhead">更多功能</h3>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// import { Constants } from '@/Constants'
// import store from '@/store'
// import { getToken } from '@/utils/auth' // 验权

export default {
  name: 'Home'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/_free_variables.scss";
@import "src/styles/_layout.scss";

.home-container {
  // position: relative !important;
  // top: 100px; left: 0;
  width: 100%;
}
.jumbotron-wrapper {
  width: 100%;
  background: $jumbotron-bg;
}
.jumbotron-container {
  .v-center {
    align-items: center;
    justify-content: center;
  }
}
.jumbotron-head {
  color: $title-color;
  font-weight: 400;
}
.jumbotron-subhead {
  color: $text-color;
  letter-spacing: 0.05em;
  opacity: 0.8;
}

.content-wrapper {
  width: 100%;
  background: white;
}
.content-container {
  p {
    color: $text-color;
  }
}
.content-head {
  color: $title-color;
  font-weight: 400;
}
.content-subhead {
  color: $title-color;
  font-weight: 600;
}
</style>
