<template>
  <div class="home-container">
    <div class="splash-container">
      <div class="splash">
        <div class="pure-g">
          <div class="pure-u-1 pure-u-lg-1-3">
            <h1 class="splash-head">定制化</h1>
            <p class="splash-subhead">共建高效，便捷，共享，安全的信息环境</p>
          </div>
          <div class="img-wrapper pure-u-1 pure-u-lg-2-3">
            <span><img class="pure-img" src="@/assets/home_page/web_61b1f33.png" alt="web_61b1f33.png" ></span>
          </div>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="content">
        <h2 class="content-head is-center">试一试</h2>
        <div class="pure-g">
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <h3 class="content-subhead">运行日志</h3>
            <p>
              lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala
            </p>
          </div>
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <h3 class="content-subhead">电量统计</h3>
            <p>
              lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala
            </p>
          </div>
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <h3 class="content-subhead">库房</h3>
            <p>
              lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala
            </p>
          </div>
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <h3 class="content-subhead">案例库</h3>
            <p>
              lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala
            </p>
          </div>
        </div>
        <!--  -->
        <div class="pure-g">
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <h3 class="content-subhead">工作票&检修票</h3>
            <p>
              lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala
            </p>
          </div>
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <h3 class="content-subhead">设备缺陷</h3>
            <p>
              lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala
            </p>
          </div>
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <h3 class="content-subhead">档案</h3>
            <p>
              lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala
            </p>
          </div>
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <h3 class="content-subhead">考勤</h3>
            <p>
              lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala lala
            </p>
          </div>
        </div>
      </div>

      <div class="footer l-box">
        <div class="footer-container">
          <div class="footer-main">
            <h4>链接</h4>
            <a href="#" class="footer-main-link">帮助</a>
          </div>
          <div class="footer-main">
            <h4>社区</h4>
            <a href="#" class="footer-main-link">反馈建议</a>
          </div>
        </div>
        <div class="is-center">
          <ul style="color:#333; list-style-type:none; font-size:12px;">
            <li>© 2019 Freeair Studio.</li>
          </ul>
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
@import "src/styles/variables.scss";

/*
 * -- LAYOUT STYLES --
 * These are some useful classes which I will need
 */
.is-center {
    text-align: center;
}
/*
 * -- SPLASH STYLES --
 * This is the blue top section that appears on the page.
 */
.splash-container {
    background: $splash-bg;
    z-index: $zindex-splash;
    overflow: hidden;
    /* The following styles are required for the "scroll-over" effect */
    position: fixed !important;
    top: $navbar-height; left: 0;
    width: 100%;
    height: 88%;
}
.splash {
  /* absolute center .splash within .splash-container */
  width: 100%;
  height: 100%;
  // margin: auto;
  position: absolute;
  top: 0px; left: 0; right: 0;
  text-align: center;
  .pure-g {
    display: flex;
    align-items: center;
  }
}
.img-wrapper {
  display: table;
  height: 100%;
  span {
    display: table-cell;
    vertical-align: middle;
  }
}

/* This is the main heading that appears on the blue section */
.splash-head {
    font-size: $font-size-h4;
    color: white;
    text-align: center;
    padding: 0.5em 1em;
    font-weight: 400;
    line-height: 1em;
}
/* This is the subheading that appears on the blue section */
.splash-subhead {
    color: white;
    text-align: center;
    letter-spacing: 0.05em;
    opacity: 0.8;
}

/*
 * -- CONTENT STYLES --
 * This represents the content area (everything below the blue section)
 */
.content-wrapper {
    /* These styles are required for the "scroll-over" effect */
    position: absolute;
    top: 88%;
    width: 100%;
    min-height: 12%;
    z-index: $zindex-content;
    background: white;
}
.content {
  padding: 1em 1em 3em;
}
.content-head {
    font-weight: 400;
    letter-spacing: 0.1em;
    margin: 2em 0 1em;
}
/* This is the class used for the content sub-headers (<h3>) */
.content-subhead {
    color: #1f8dd6;
}
.content-subhead i {
    margin-right: 7px;
}

.footer {
  background: #e4eff5;
  width: 100%;
  // position: fixed;
  // bottom: 0;
  .footer-main {
    // font-size: 0px;
    display: inline-block;
    vertical-align: top;
    margin-right: 110px;
    h4 {
      font-size: 18px;
      color: #333;
      line-height: 1;
      margin: 0 0 15px;
      display: block;
      margin-block-start: 1.33em;
      margin-block-end: 1.33em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
    }
    .footer-main-link {
      display: block;
      margin: 0;
      line-height: 2;
      font-size: 14px;
      color: #666;
    }
  }
}

@media (min-width: 768px) {
  /* We decrease the width of the .splash, since we have more width
  to work with */

  .splash-head {
      font-size: 200%;
  }
  .l-box-lrg {
    border: none;
  }
}

</style>
