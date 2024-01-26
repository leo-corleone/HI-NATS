<template>
 <div class="ctrl-panel-wrap">
   <ConnectionDialog ref="connectDialog"></ConnectionDialog>
   <div class="ctrl-panel-left">
     <div class="ctrl-panel-tool">
       <el-input
           prefix-icon="el-icon-search"
           placeholder="请输入内容"
           v-model="searchKey"
           clearable
           size="mini"
           class="ctrl-panel-tool-input"
           :disabled="inputDisabled"
       >
       </el-input>
       <el-button @click="openConnectionDialog" size="mini" icon="el-icon-plus" type="primary" circle></el-button>
     </div>
   </div>
   <div class="ctrl-panel-right">
     <router-view></router-view>
   </div>
 </div>
</template>

<script>
import ConnectionDialog from "@/components/dialog/ConnectionDialog.vue";
import {EventConstant} from "@/busEvent/EventConstant";
import MessageQueue from "@/utils/MessageQueue";

export default {
  name: "ControlPanel",
  components:{
    ConnectionDialog
  },
  data(){
    return {
      searchKey:'',
      connections:[],
    }
  },
  methods:{
    openConnectionDialog() {
      this.$refs.connectDialog.isPop = true;
    },
    addConnectionClient(config){
      console.log(config);
    },
    testConnect(config){
       const mq = new MessageQueue();
       mq.conn(config).then(nc => {
         if (nc instanceof Error){
           this.$notify.error({title:'连接失败' , message:nc.message})
         }else {
           this.$notify.success('连接成功')
           nc.close();
         }
       });
    }
  },
  mounted() {
    this.$bus.$on(EventConstant.ADD_CONNECTION_CLIENT , this.addConnectionClient)
    this.$bus.$on(EventConstant.TEST_CONNECTION_CLIENT , this.testConnect)
  },
  computed: {
    inputDisabled(){
      return false
    }
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
    box-shadow: 1px 0 1px #d7d3d3;
  }

  .ctrl-panel-right{
    width: 80%;
    height: 100%;
  }

  .ctrl-panel-tool{
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px #d7d3d3 solid;
  }

  .ctrl-panel-tool .ctrl-panel-tool-input{
    width: 70%;
    margin: 0 10px;
    /*padding: 0 10px;*/
  }

</style>