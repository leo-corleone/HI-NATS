<template>

    <el-menu active-text-color="rgb(6 223 82)" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-menu-item  index="0">
        <i><img width="30px" src="../assets/logo.png"></i>
      </el-menu-item>
      <el-menu-item index="1" @click="handleOpen">
        <i class="el-icon-connection"></i>
        <span slot="title">连接</span>
      </el-menu-item>
      <el-menu-item index="2" @click="handleOpen">
        <i class="el-icon-monitor"></i>
        <span slot="title">监控</span>
      </el-menu-item>
      <el-menu-item index="3" @click="handleOpen">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">日志</span>
      </el-menu-item>
    </el-menu>

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
    handleOpen() {
      this.$notify.success('HI')
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    console.log(this)
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100px;
  min-height: 400px;
}

.el-menu{
  border-right: rgb(6 223 82);
  height: 100%;
}

.el-menu-item{
  line-height: 80px;
  height: 80px;
}
</style>