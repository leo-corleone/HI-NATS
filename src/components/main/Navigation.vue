<template>
  <div class="navigation-wrap">
    <el-container class="navigation-wrap">
      <el-aside class="navigation-wrap-aside" style="width: auto">
        <el-menu active-text-color="rgb(6 223 82)"
                 background-color="#545c64"
                 text-color="#fff" class="el-menu-vertical-demo"
                 :collapse="isCollapse">
          <el-menu-item index="0" @click="switchCollapse">
            <i><img width="30px" src="../../assets/logo.png"></i>
          </el-menu-item>
          <el-menu-item index="1" @click="switchCtrlPanel('controlPanel')">
            <i class="el-icon-connection"></i>
            <span slot="title">连接</span>
          </el-menu-item>
          <el-menu-item index="2" @click="switchCtrlPanel('monitorPanel')">
            <i class="el-icon-data-line"></i>
            <span slot="title">监控</span>
          </el-menu-item>
<!--          <el-menu-item index="3" @click="switchCtrlPanel('logPanel')">-->
<!--            <i class="el-icon-notebook-2"></i>-->
<!--            <span slot="title">日志</span>-->
<!--          </el-menu-item>-->
        </el-menu>
      </el-aside>
      <el-main class="navigation-wrap-main">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    switchCtrlPanel(name) {
      this.$router.push({name})
    },
    switchCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100px;
  min-height: 400px;
}

.navigation-wrap{
  height: 100%;
  width: 100%;
}

.navigation-wrap-aside{
  height: 100%;
}

.navigation-wrap-main{
  display: inline-block;
  padding: 0;
  margin: 0;
  width: auto;
}
.el-menu {
  border-right: #f5d922 1px solid;
  height: 100%;
  line-height: 94%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}

</style>