<template>
  <div class="home-container">
    <div class="jumbotron-wrapper py-responsive">
      <div class="jumbotron-container container-xl px-responsive">
        <div class="pure-g">
          <div class="pure-u-1 pure-u-lg-1-3 gutter-space-responsive">
            <h1 class="jumbotron-head is-center">定制化</h1>
            <p class="jumbotron-subhead is-center">共建高效，便捷，共享，安全的信息平台</p>
          </div>
          <div class="pure-u-1 pure-u-lg-2-3 gutter-space-responsive">
            <img class="pure-img is-center" src="@/assets/home_page/home_info.svg" alt="web_61b1f33.png" >
          </div>
        </div>
      </div>
    </div>

    <div class="content-wrapper py-responsive">
      <div class="content-container container-xl px-responsive">
        <h1 class="content-head is-center">试一试</h1>
        <div class="pure-g">
          <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 gutter-space-responsive">
            <h3 class="content-subhead">考勤</h3>
            <p>
              通过某种方式来获得员工或者某些团体、个人在某个特定的场所及特定的时间段内的出勤情况，包括上下班、迟到、早退、病假、婚假、丧假、公休、工作时间、加班情况等。通过对以前阶段，本阶段内出勤情况的研究，进行以后阶段的统筹、安排等。
            </p>
          </div>
          <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 gutter-space-responsive">
            <h3 class="content-subhead">电量统计</h3>
            <p>
              统计一词起源于国情调查，最早意为国情学。一般来说，统计包括三个含义：统计工作、统计资料和统计科学。统计工作、统计资料、统计科学三者之间的关系是：统计工作的成果是统计资料，统计资料和统计科学的基础是统计工作，统计科学既是统计工作经验的理论概括，又是指导统计工作的原理、原则和方法。
            </p>
          </div>
          <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 gutter-space-responsive">
            <h3 class="content-subhead">库房管理</h3>
            <p>
              对仓储货物的收发、结存等活动的有效控制，其目的是为企业保证仓储货物的完好无损，确保生产经营活动的正常进行，并在此基础上对各类货物的活动状况进行分类记录，以明确的图表方式表达仓储货物在数量、品质方面的状况，以及所在的地理位置、部门、订单归属和仓储分散程度等情况的综合管理形式。
            </p>
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
}
.jumbotron-wrapper {
  width: 100%;
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
    background: white;
}
.content-container {
  p {
    color: $text-color;
  }
}
.content-head {
    color: $title-color;
    font-weight: 600;
    letter-spacing: 0.1em;
}
.content-subhead {
    color: $title-color;
    font-weight: 600;
}

.footer-wrapper {
  background: $footer-default-bg;
  width: 100%;
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
