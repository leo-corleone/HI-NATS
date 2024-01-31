<template>
 <div class="ctrl-view-wrap">
   <AddSubscriptionDialog ref="addSub" :connectionId = "config.id" />
   <div class="ctrl-view-left">
     <div class="ctrl-view-left-title">
       <span class="el-icon-user-solid ellipsis ctrl-view-left-title-info">{{ config.name }}@{{ config.host }}:{{ config.port }}</span>
       <span class="ctrl-view-left-title-btn">
         <el-tooltip class="item" effect="light" content="点击订阅" placement="top-start">
           <el-button class="el-icon-collection-tag" @click="openSubscriptionDialog" type="success" size="mini" circle></el-button>
         </el-tooltip>
       </span>
     </div>
     <div class="ctrl-view-left-subs">
       <Subscription v-for="sub in cacheSubscription" :key = "sub.id" :config="config" :client="client"/>
     </div>
   </div>
   <div class="ctrl-view-right"></div>
 </div>
</template>

<script>
import Subscription from "@/components/main/panel/control/Subscription.vue";
import {EventConstant} from "@/busEvent/EventConstant";
import AddSubscriptionDialog from "@/components/dialog/AddSubscriptionDialog.vue";
import {nanoid} from "nanoid";

export default {
  name: "ControlView",
  props:['config' , 'client'],
  components:{
    Subscription,
    AddSubscriptionDialog
  },
  data(){
    return {
      cacheSubscription: [],
      subscription:{
        id: null,
        color: '',
        topic: '',
      }
    }
  },
  methods: {
    renderSubscription(data) {
      console.log(data);
    },
    refreshCurrentSubscription() {
      this.cacheSubscription = JSON.parse(localStorage.getItem(this.config.id)) || [];
    },
    openSubscriptionDialog() {
      this.$refs.addSub.isPop = true;
    },
    unsubscribe(uid, topics) {
      this.$bus.$emit(EventConstant.UNSUBSCRIBE + "_" + uid, uid, topics)
      this.$bus.$off(EventConstant.UNSUBSCRIBE + "_" + uid)
    },
    topicSubscribe(subscription){
      this.subscription.id = nanoid();
      this.subscription.topic = subscription.topic;
      this.subscription.color = subscription.color;
      this.cacheSubscription.push(JSON.parse(JSON.stringify(this.subscription)));
    },
    subscribe() {
      this.$bus.$on(EventConstant.SUBSCRIBE + "_" + this.config.id , this.topicSubscribe)
      this.cacheSubscription.forEach(subscription => {
        this.client.sub(subscription.topic, this.renderSubscription)
      })
    }
  },
  watch:{
    config:{
      deep:true,
      immediate: true,
      handler(newValue , oldValue){
        this.refreshCurrentSubscription();
        if (newValue){
          this.subscribe(newValue.id);
        }
        if (oldValue){
          this.unsubscribe(oldValue.id);
        }
      }
    },
    cacheSubscription:{
      deep: true,
      immediate: true,
      handler(value){
        localStorage.setItem(this.config.id ,JSON.stringify(value))
      }
    }
  }
}
</script>

<style scoped>
  .ctrl-view-wrap{
    width: 100%;
    height: 100%;
  }

  .ctrl-view-left{
    width: 23%;
    height: 100%;
    border-radius: 10px 10px 0 0;
    border-right: #ecebeb 1px solid;
  }

  .ctrl-view-left-title{
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: rgba(238, 234, 228, 0.97);
    border-radius: 10px 10px 0 0;
  }

  .ctrl-view-left-subs{
    width: 100%;
    height: calc(100% - 45px);
    background-color: #d7d3d3;
  }

  .ctrl-view-left-title span{
    display: inline-block;
  }

  .ctrl-view-left-title-info{
    width: calc(85% - 20px);
    padding: 0 10px;
  }

  .ctrl-view-left-title-btn{
    width: calc(15% - 10px);
    height: 100%;
    padding: 0 5px;
  }
</style>