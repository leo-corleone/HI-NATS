<template>
   <div class="monitor-form-warp">
     <el-form :inline="true" class="monitor-form">
       <el-form-item label="选择连接">
         <el-select v-model="monitorId" placeholder="选择连接" size="mini">
           <el-option v-for="item in connections" :key="item.id" :label="item.name" :value="item.id" :disabled="item | disableOption"></el-option>
         </el-select>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="onSubmit" size="mini">确认</el-button>
       </el-form-item>
     </el-form>
     <el-divider class="monitor-header-divider" />
   </div>
</template>

<script>
export default {
  name: "MonitorHeader",
  data() {
    return {
      connections: JSON.parse(localStorage.getItem('connections')) || [],
      monitorId: ''
    }
  },
  methods: {
    onSubmit() {
      console.log(this.monitorId);
    }
  },
  filters:{
    disableOption(connection){
      return  connection.monitorHost == null && connection.monitorPort == null
    }
  }
}
</script>

<style scoped>
.monitor-form-warp{
  padding: 10px 0;
  height: 45px;
  width: calc(100%);
  /*background-color: #d7d3d3;*/
}

.monitor-form{
  margin-left: 10px;
  height: 45px;
  margin-bottom: 5px;
}

.monitor-header-divider{
  margin: 1px 0;
}

</style>