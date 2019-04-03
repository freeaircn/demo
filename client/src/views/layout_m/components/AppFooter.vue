<template>
  <div class="footer-wrapper">
    <div class="footer-container p-responsive">
      <div class="footer-main">
        <h4>链接</h4>
        <a href="#" class="footer-main-link">帮助</a>
      </div>
      <div class="footer-main">
        <h4>社区</h4>
        <a href="#" class="footer-main-link">反馈建议</a>
      </div>
    </div>
    <div class="p-responsive">
      <ul class="list-style-none d-flex text-gray">
        <li>© {{ year }} Freeair Studio.</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AppFooter',
  computed: {
    year: function() {
      const date = new Date()
      return date.getFullYear()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/layout.scss";
.footer-wrapper {
  background-color: #f7fbfd;
  width: 100%;
  padding: 40px 150px;
  // margin-top: -340px;
  box-sizing: border-box;
  height: 240px;
  // position: absolute;
  // top: 90%;
  // min-height: 10%;
  // z-index: 2;
  .footer-container {
    height: 100%;
    width: auto;
    // max-width: 1280px;
    margin: 0 auto;
    .footer-main {
      font-size: 0px;
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
}
</style>

