<template>
  <div class="home-container">
    <div class="jumbotron-wrapper py-responsive">
      <div class="jumbotron-container container-xl px-responsive">
        <div class="pure-g">
          <div class="pure-u-1 pure-u-lg-1-3 gutter-space-responsive sm-and-down-hidden">
            <h1 class="jumbotron-head is-center">Built for us</h1>
            <p class="jumbotron-subhead is-center">共建高效，共享，触手可及的信息平台</p>
          </div>
          <div class="pure-u-1 pure-u-lg-2-3 gutter-space-responsive">
            <img class="pure-img is-center sm-and-down-hidden" src="@/assets/home_lg.svg" alt="web_pic" >
            <img class="pure-img is-center sm-and-up-hidden" src="@/assets/home_xs.svg" alt="web_pic" >
          </div>
        </div>
      </div>
    </div>
    <div class="content-wrapper py-responsive">
      <div class="content-container container-xl px-responsive">
        <h1 class="content-head is-center">从这里开始</h1>
        <div class="pure-g">
          <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 gutter-space-responsive">
            <el-card shadow="hover" class="is-center">
              <router-link to="/gen_start_log"><img class="w-20" src="@/assets/start_stop.svg" alt="web_pic" ></router-link>
              <h3 class="content-subhead">机组启停</h3>
              <p>机组启停</p>
            </el-card>
          </div>
          <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 gutter-space-responsive">
            <el-card shadow="hover" class="is-center">
              <img class="w-20" src="@/assets/work_attendance.svg" alt="web_pic" >
              <h3 class="content-subhead">考勤</h3>
              <p>考勤</p>
            </el-card>
          </div>
          <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 gutter-space-responsive">
            <el-card shadow="hover" class="is-center">
              <img class="w-20" src="@/assets/others.svg" alt="web_pic" >
              <h3 class="content-subhead">更多功能</h3>
              <p>期待你的意见</p>
            </el-card>
          </div>
        </div>
      </div>
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
  position: relative !important;
  top: $navbar-height; left: 0;
  //
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.jumbotron-wrapper {
  width: 100%;
  flex: 1 0 auto;
  background: $jumbotron-bg;
}
.jumbotron-container {
  .pure-g {
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
  flex: 1 0 auto;
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
