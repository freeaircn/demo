<template>
  <div class="login-container">
    <h3 class="title">Hello World</h3>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#e4e5e7;
$light_gray:#eee;

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#e4e5e7;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
</style>
