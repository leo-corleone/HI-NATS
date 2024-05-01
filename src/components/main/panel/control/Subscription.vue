<template>
    <div class="subscription-warp"
         @mouseover="hover = true"
         @mouseleave="hover = false"
         :style="{'border-radius': '10px','background-color':`${subscription.color}1a`}">
      <span class="ellipsis subscription-ident" :style="'background-color:' + subscription.color"></span>
      <span class="ellipsis subscription-content"
            :style=" 'color:' + subscription.color">{{ subscription.topic }}</span>
      <span>
        <el-checkbox :disabled="!isActive" type="success"  size="mini" circle :checked="subscription.isSub" @change="changeSubscribe(subscription.id ,!subscription.isSub)" ></el-checkbox>
      </span>
      <span class="subscription-remove el-icon-minus" v-if="hover" @click="removeSubscription"></span>
    </div>
</template>

<script>
export default {
  name: "Subscription",
  props: ['subscription', 'removeSubscribe', 'switchSubscribe' ,'isActive'],
  data(){
    return {
      hover: false
    }
  },
  methods: {
    removeSubscription() {
      this.removeSubscribe(this.subscription);
    },
    changeSubscribe(sId ,isSub){
      this.switchSubscribe(sId , isSub);
    }
  }
}
</script>

<style scoped>
.subscription-warp {
  width: calc(100% - 22px);
  height: 40px;
  line-height: 40px;
  margin: 3px auto 2px;
  border-radius: 10px;
}

.subscription-warp span {
  display: inline-block;
  float: left;
}

.subscription-ident {
  line-height: 30px;
  width: 3px;
  height: calc(80% - 10px);
  margin: 6px;
}

.subscription-warp .subscription-content {
  opacity: 1;
  font-size: small;
  width: 80%;
  height: 100%;
}

.subscription-remove {
  display: inline-block;
  position: relative;
  width: 15px;
  height: 15px;
  border-radius: 12px;
  background-color: #da4f49;
  font-size: 15px;
  color: #f1f3f1;
  line-height: 15px;
  top: 35%;
  right: -20px;
  z-index: 10;
}

/deep/
.el-checkbox__inner{
  border-radius: 10px;
}
</style>