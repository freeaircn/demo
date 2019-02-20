<template>
  <div class="home-container">
    <h3 class="title">Home Page</h3>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.home-container {
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
