<template>
 <div class="ctrl-panel-wrap">
   <el-dialog title="新增连接" width="30%" :fullscreen="false" custom-class="ctrl-panel-dialog" :close-on-click-modal="false" center :visible.sync="popConnectDialog">
     <el-form :model="connection" label-width="100px" style="height: 200px; text-align: center" :rules="rules">
       <el-form-item label="连接名称" prop="name">
         <el-input clearable
                   size="mini" prefix-icon="el-icon-user" placeholder="请输入...." v-model="connection.name"></el-input>
       </el-form-item>
       <el-form-item label="连接名称" prop="name">
         <el-input clearable
                   size="mini" v-model="connection.host"></el-input>
       </el-form-item>
       <el-form-item label="连接名称" prop="name">
         <el-input clearable
                   size="mini" v-model="connection.port"></el-input>
       </el-form-item>
     </el-form>
   </el-dialog>

   <div class="ctrl-panel-left">
     <div class="ctrl-panel-tool">
       <el-input
           placeholder="请输入内容"
           v-model="searchKey"
           clearable
           size="mini"
           class="ctrl-panel-tool-input"
           :disabled="inputDisabled"
       >
       </el-input>
       <el-button @click="popConnectDialog = true" size="mini" icon="el-icon-plus" type="primary" circle></el-button>
     </div>
   </div>
   <div class="ctrl-panel-right">
     <router-view></router-view>
   </div>
 </div>
</template>

<script>
// import Connection from "@/components/main/panel/control/Connection.vue";
export default {
  name: "ControlPanel",
  components:{
    // Connection
  },
  data(){
    return {
      searchKey:'',
      connections:[],
      connection:{
        id: null,
        connectionName: null,
        host: null,
        port: null,
      },
      rules:{

      },
      formLabelWidth: '120px',
      popConnectDialog: false,
    }
  },
  methods:{
  },
  computed: {
    inputDisabled(){
      return this.connections.length === 0
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
    width: 75%;
    margin: auto;
    padding: 0 10px;
  }

  /deep/ .ctrl-panel-dialog{
    border-radius: 22px;
  }

</style>