<template>
  <div class="dashboard">
    host:<input type="text" v-model="host"> <br/>
    port:<input type="text" v-model="port"> <br/><br/>
    <button @click="addClient">点击添加客户端</button>
    <Client v-for="config in configs" :config="config" :key="config.id"/>
  </div>
</template>

<script>
import Client from "@/components/Client.vue";
import {nanoid} from "nanoid";

export default {
  name: "Dashboard",
  components:{
    Client
  },
  data(){
    return {
      host: null,
      port: null,
      configs:[]
    }
  },
  methods:{
    addClient(){
      if (this.host == null || this.port == null){
        return
      }
      let config = {
        id:nanoid(),
        host:this.host,
        port:this.port,
      }
      this.configs.push(config);
    }
  }
}
</script>

<style scoped>
  .dashboard{
    text-align: center;
  }
</style>