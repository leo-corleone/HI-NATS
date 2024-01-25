<template>
 <div class="ctrl-panel-wrap">
   <div class="ctrl-panel-left">
     <Connection/>
   </div>
   <div class="ctrl-panel-right">
     <router-view></router-view>
   </div>
 </div>
</template>

<script>
import Connection from "@/components/main/panel/control/Connection.vue";
export default {
  name: "ControlPanel",
  components:{
    Connection
  }
}
</script>

<style scoped>
  .ctrl-panel-wrap{
    background-color: #fff;
    width: auto;
    height: 100%;
  }

  .ctrl-panel-wrap div{
    float: left;
  }

  .ctrl-panel-left{
    width: 20%;
    height: 100%;
    background-color: #f5d922;
  }

  .ctrl-panel-right{
    width: 80%;
    height: 100%;
    background-color: aqua;
  }
</style>