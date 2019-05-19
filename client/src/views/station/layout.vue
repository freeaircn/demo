<template>
  <div class="layout-wrapper container-xl">
    <div class="layout-container">
      <el-container style="height: 100%; border-top: 1px solid #eee">
        <el-aside width="auto">
          <el-menu :collapse="isCollapse" :collapse-transition="false" default-active="1-4-1" class="el-menu-vertical-demo">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location" />
                <span slot="title">导航一</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2" style="padding-left: 5px">
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

        <el-container style="height: 100%; border-left: 1px solid #eee">
          <el-header style="font-size: 12px">
            <el-radio-group v-model="isCollapse" style="">
              <el-radio-button :label="false">展开</el-radio-button>
              <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>Header</span>
          </el-header>
          <el-main>
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
      isCollapse: true
    }
  },
  computed: {
    sideBarWidth: function() {
      if (this.isCollapse) {
        return '64px'
      } else {
        return '150px'
      }
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.layout-wrapper {
  width: 100%;
  display: flex;
}
.layout-container {
  flex: 1 0 auto;
}
.title {
  font-weight: 400;
  color: $title-color;
}
.p-text {
  font-weight: 400;
  color: $blue-light;
  font-size: $font-size-base;
}
</style>
