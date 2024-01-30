<template>
 <div class="ctrl-panel-wrap">
   <NewConnectionDialog ref="connectDialog"></NewConnectionDialog>
   <div class="ctrl-panel-left">
     <div class="ctrl-panel-tool">
       <el-input
           prefix-icon="el-icon-search"
           placeholder="请输入内容"
           v-model="searchKey"
           @input="searchConnection"
           clearable
           size="mini"
           class="ctrl-panel-tool-input"
           :disabled="inputDisabled"
       >
       </el-input>
       <el-button @click="openConnectionDialog" size="mini" icon="el-icon-plus" type="primary" round></el-button>
     </div>
     <div class="ctrl-panel-left-bottom">
       <Connection :ref="connection.id"  v-for="connection in connections" :config="connection" :key="connection.id"/>
     </div>
   </div>
   <div class="ctrl-panel-right">
    <ControlView v-if="config != null" :config="config" :mq="mq" />
   </div>
 </div>
</template>

<script>
import NewConnectionDialog from "@/components/dialog/NewConnectionDialog.vue";
import {EventConstant} from "@/busEvent/EventConstant";
import MessageQueue from "@/utils/MessageQueue";
import Connection from "@/components/main/panel/control/Connection.vue";
import ControlView from "@/components/main/panel/control/ControlView.vue";

export default {
  name: "ControlPanel",
  components:{
    ControlView,
    Connection,
    NewConnectionDialog,
  },
  data(){
    return {
      searchKey:'',
      connections:[],
      cacheConnections:JSON.parse(localStorage.getItem('connections')) || [],
      config: null,
      mq: null,
    }
  },
  methods:{
    testConnection(config , callback){
      const mq = new MessageQueue();
      mq.conn(config).then(nc => {
        if (nc instanceof Error){
          this.$notify.error({title:'连接失败' , message:nc.message})
        }else {
          this.$notify.success('连接成功')
          nc.close();
        }
        callback();
      });
    },
    openConnectionDialog() {
      this.$refs.connectDialog.isPop = true;
    },
    addConnection(config){
      this.cacheConnections.push(config);
    },
    editConnection(config) {
      this.cacheConnections.filter(connection =>{
        if (connection.id === config.id){
          connection.name = config.name;
          connection.host = config.host;
          connection.port = config.port;
          connection.username = config.username;
          connection.password = config.password;
          connection.token = config.token;
        }
      });
    },
    deleteConnection(uid){
       this.cacheConnections = this.cacheConnections.filter(con => con.id !== uid);
       localStorage.removeItem(uid)
    },
    searchConnection(){
      if (this.searchKey === null || this.searchKey === ''){
        this.connections = this.cacheConnections;
      }else {
        this.connections = this.cacheConnections.filter(connection => {
          return connection.name.indexOf(this.searchKey) !== -1 || connection.host.indexOf(this.searchKey) !== -1
        })
      }
    },
    gotoControlView(config , mq) {
       this.config = null;
       this.config = config;
       this.mq = mq;
    }
  },
  mounted() {
    this.$bus.$on(EventConstant.ADD_CONNECTION , this.addConnection);
    this.$bus.$on(EventConstant.TEST_CONNECTION , this.testConnection);
    this.$bus.$on(EventConstant.EDIT_CONNECTION , this.editConnection);
    this.$bus.$on(EventConstant.DELETE_CONNECTION , this.deleteConnection);
    this.$bus.$on(EventConstant.GOTO_CONTROL_VIEW , this.gotoControlView);
  },
  beforeDestroy() {
    this.$off([EventConstant.EDIT_CONNECTION , EventConstant.TEST_CONNECTION , EventConstant.ADD_CONNECTION , EventConstant.DELETE_CONNECTION]);
  },
  computed: {
    inputDisabled(){
      return this.cacheConnections.length === 0
    }
  },
  watch:{
    cacheConnections:{
      deep:true,
      immediate:true,
      handler(value){
        this.searchConnection();
        localStorage.setItem('connections' , JSON.stringify(value));
      }
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
    margin: 0 5px 0 2px;
    /*padding: 0 10px;*/
  }

  .ctrl-panel-left-bottom{
    width: 100%;
    height: auto;
    padding: 5px 0;
  }

  .ctrl-panel-left-bottom > div{
    margin-bottom: 1px;
  }
</style>