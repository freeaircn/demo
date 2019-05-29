<template>
  <div class="layout-wrapper container-xl">
    <div class="layout-container">
      <el-container style="height: 100%; border-top: 1px solid #eee">
        <el-header height="40px" style="">
          <el-button type="text" style="color: white;float: left" @click.native="collapseLeftSideBar"><i :class="collapseIcon" /></el-button>
          <!-- <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px;color: white" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <span style="">松山河口电厂</span>
        </el-header>
        <el-container style="height: 100%;">
          <el-aside width="auto">
            <el-menu :collapse="isCollapse" :collapse-transition="false" style="border: 0px">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location" />
                  <span slot="title">导航一</span>
                </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                <el-menu-item index="1-3">选项3</el-menu-item>
                <el-submenu index="1-4">
                  <span slot="title">选项4</span>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2" style="">
                <i class="el-icon-menu" />
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <i class="el-icon-document" />
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting" />
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main style="height: 100%; border-left: 1px solid #eee">
            <p>Content</p>
          </el-main>
        </el-container>
      </el-container>
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
      isCollapse: false
    }
  },
  computed: {
    collapseIcon: function() {
      if (this.isCollapse) {
        return 'el-icon-d-arrow-right'
      } else {
        return 'el-icon-d-arrow-left'
      }
    }
  },
  mounted() {
  },
  methods: {
    collapseLeftSideBar() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* reset element-ui css */
.layout-container {
  .el-menu--collapse {
    width: 34px;
  }
  .el-submenu__title {
    padding: 0 5px !important;
  }
  .el-menu-item {
    padding: 0 5px !important;
  }
  .el-tooltip {
    padding: 0 5px !important;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>

.layout-wrapper {
  width: 100%;
  display: flex;
}
.layout-container {
  flex: 1 0 auto;
}
.el-header {
  background-color: $bg-blue-light;
  color: white;
  text-align: center;
  font-size: 14px;
  line-height: 40px;
}
</style>
