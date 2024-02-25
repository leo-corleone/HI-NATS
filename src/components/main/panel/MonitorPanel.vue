<template>
 <div class="monitor-panel-wrap">
   <el-empty description="敬请期待"></el-empty>
 </div>
</template>

<script>
export default {
  name: "MonitorPanel",
  props:['admin','isUser']
}
</script>

<style scoped>
 .monitor-panel-wrap{
   width: auto;
   height: 100%;
 }
</style>