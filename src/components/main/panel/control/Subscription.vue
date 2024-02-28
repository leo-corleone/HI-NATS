<template>
 <div class="subscription-warp">
   <span class="ellipsis subscription-ident" :style="'background-color:' + subscription.color"></span>
   <span class="ellipsis subscription-content" :style=" 'color:' + subscription.color">{{subscription.topic}}</span>
   <span class="subscription-delete el-icon-circle-close" @click="removeSubscription"></span>
 </div>
</template>

<script>
export default {
  name: "Subscription",
  props:['subscription' , 'unsub'],
  methods:{
    removeSubscription(){
      this.unsub(this.subscription);
    }
  }
}
</script>

<style scoped>
  .subscription-warp{
    width: calc(100% - 2px);
    height: 30px;
    line-height: 30px;
    margin-bottom: 1px;
    border-radius: 10px;
    border: 1px #837e7e solid;
  }

  .subscription-warp span{
    display: inline-block;
    float: left;
  }

  .subscription-ident{
    line-height: 30px;
    width: 3px;
    height: calc(80% - 10px);
    margin: 6px;
  }

  .subscription-warp .subscription-content{
    opacity: 1;
    font-size: small;
    width: 70%;
    height: 100%;
  }

  .subscription-delete{
    color: #ee0d0d;
    font-size: large;
    width: 20px;
    margin-top: 5px;
    margin-left: 5px;
  }
</style>