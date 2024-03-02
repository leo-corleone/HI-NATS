<template>
 <div class="monitor-panel-wrap">
   <MonitorHeader/>
 </div>
</template>

<script>

import MonitorHeader from "@/components/main/panel/monitor/MonitorHeader.vue";
export default {
  name: "MonitorPanel",
  components:{
    MonitorHeader
  }
}
</script>

<style scoped>
 .monitor-panel-wrap{
   width: auto;
   height: 100%;
 }
</style>