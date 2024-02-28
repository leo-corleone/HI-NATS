<template>
 <div class="ctrl-panel-wrap">
   <NewConnectionDialog ref="connectDialog" :addConnection="addConnection"></NewConnectionDialog>
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
           :disabled="inputDisabled">
       </el-input>
       <el-button @click="openConnectionDialog" size="mini" icon="el-icon-plus" type="primary" round></el-button>
     </div>
     <div class="ctrl-panel-left-bottom">
       <Connection :ref="conn.id"  v-for="conn in connections"
                   :removeConnection="removeConnection"
                   :editConnection="editConnection"
                   :returnToTab="returnToTab"
                   :connection="conn"
                   :selectedConnection="tabName"
                   :tabsMap="tabsMap"
                   :key="conn.id"/>
     </div>
   </div>
   <div class="ctrl-panel-right">
     <el-tabs  v-model="tabName" type="card" closable @edit="handleTabsEdit" style="width:100%;height: 100%">
       <el-tab-pane :key="item.name" v-for="item in connectionTabs" :label="item.title" :name="item.name" style="width: 100%;height: 100%">
         <span slot="label"><i class="el-icon-menu"></i> {{item.title}}</span>
         <ControlDashboard :connection="item.connection"/>
       </el-tab-pane>
     </el-tabs>
   </div>
 </div>
</template>

<script>
import NewConnectionDialog from "@/components/dialog/NewConnectionDialog.vue";
import Connection from "@/components/main/panel/control/Connection.vue";
import ControlDashboard from "@/components/main/panel/control/ControlDashboard.vue";

export default {
  name: "ControlPanel",
  components:{
    Connection,
    NewConnectionDialog,
    ControlDashboard
  },
  data(){
    return {
      searchKey:'',
      connections:[],
      cacheConnections:JSON.parse(localStorage.getItem('connections')) || [],
      tabName:"",
      connectionTabs:[],
      tabsMap: new Map(),
    }
  },
  methods:{
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
    removeConnection(connection){
      this.deleteConnection(connection.id);
      this.removeTab(connection.id);
      this.tabsMap.delete(connection.id);
    },
    returnToTab(connection){
        if (!this.tabsMap.has(connection.id)){
          this.connectionTabs.push({
            title: connection.name,
            name: connection.id,
            connection,
          });
          this.tabsMap.set(connection.id , connection);
        }
        this.tabName = connection.id;
    },
    removeTab(connectionId){
      if (this.tabsMap.has(connectionId)){
        this.connectionTabs = this.connectionTabs.filter(tab => tab.name !== connectionId);
        this.tabsMap.delete(connectionId);
        if (connectionId === this.tabName && this.tabsMap.size > 0){
          this.tabName = this.connectionTabs[0].name;
        }
        if (connectionId === this.tabName && this.tabsMap.size === 0){
          this.tabName = "";
        }
      }
    },
    handleTabsEdit(target , action){
      if (action === 'remove'){
        this.removeTab(target)
      }
    }
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
    box-shadow: 1px 0 5px #d7d3d3;
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

  /deep/ .el-tabs__content {
    height: calc(100% - 41px);
    width: 100%;
  }

  /deep/ .el-tabs__header {
    margin: 0;
  }
</style>