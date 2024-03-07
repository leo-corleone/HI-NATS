<template>
 <div class="monitor-panel-wrap">
   <MonitorHeader :switchConnection="switchConnection"/>
   <MonitorDashboard ref="monitorDashboard"/>
 </div>
</template>

<script>

import MonitorHeader from "@/components/main/panel/monitor/MonitorHeader.vue";
import MonitorDashboard from "@/components/main/panel/monitor/MonitorDashboard.vue";
export default {
  name: "MonitorPanel",
  components:{
    MonitorHeader,
    MonitorDashboard,
  },
  methods:{
    switchConnection(connection){
      this.$refs.monitorDashboard.switchConnection(connection);
    }
  }
}
</script>

<style scoped>
 .monitor-panel-wrap{
   width: auto;
   height: 100%;
 }
</style>