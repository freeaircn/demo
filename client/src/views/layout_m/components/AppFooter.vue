<template>
  <div class="footer-wrapper py-responsive">
    <div class="footer-container container-xl px-responsive">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="px-3">
          <h4>BE</h4>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="px-3">
          <h4>链接</h4>
          <a href="#" class="footer-link">帮助</a>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="px-3">
          <h4>社区</h4>
          <a href="#" class="footer-link">反馈建议</a>
        </el-col>
      </el-row>
      <div class="is-right mt-4">
        <p>© {{ year }} Freeair Studio.</p>
      </div>
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
@import "src/styles/_free_variables.scss";
@import "src/styles/_layout.scss";

.footer-wrapper {
  // position: relative;
  width: 100%;
  background: $footer-default-bg;
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

