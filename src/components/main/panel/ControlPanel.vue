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
       <el-button @click="toggleConnectionDialog" size="mini" icon="el-icon-plus" type="primary" circle></el-button>
     </div>
   </div>
   <div class="ctrl-panel-right">
     <router-view></router-view>
   </div>
 </div>
</template>

<script>
import ConnectionDialog from "@/components/dialog/ConnectionDialog.vue";

export default {
  name: "ControlPanel",
  components:{
    ConnectionDialog
  },
  data(){
    return {
      searchKey:'',
      connections:[],
      isPop: false,
    }
  },
  methods:{
    toggleConnectionDialog() {
      this.$refs.connectDialog.isPop = !this.$refs.connectDialog.isPop;
    },
    addConnectionClient(connection){
      console.log(connection);
    }
  },
  mounted() {
    console.log(this)
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