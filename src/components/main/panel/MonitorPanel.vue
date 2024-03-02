<template>
 <div class="monitor-panel-wrap">
   <MonitorHeader/>
   <MonitorDashboard/>
 </div>
</template>

<script>

import MonitorHeader from "@/components/main/panel/monitor/MonitorHeader.vue";
import MonitorDashboard from "@/components/main/panel/monitor/MonitorDashboard.vue";
export default {
  name: "MonitorPanel",
  components:{
    MonitorHeader,
    MonitorDashboard
  }
}
</script>

<style scoped>
 .monitor-panel-wrap{
   width: auto;
   height: 100%;
 }
</style>