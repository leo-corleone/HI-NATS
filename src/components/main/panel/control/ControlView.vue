<template>
 <div>
   {{config.id}}
 </div>
</template>

<script>
export default {
  name: "ControlView",
  props:['config' , 'mq'],
  data(){
    return {
      cacheSubscription:  JSON.parse(localStorage.getItem(this.config.id)) || [],
    }
  },
  methods:{
    updateView(){
      this.mq.sub('$report.$data.wjzq.v1.ovgc.app.service.status' , (data)=>{
        console.log(data)
      })
    },
  },
  beforeDestroy() {

  },
  watch:{
    config:{
      deep:true,
      immediate: true,
      handler(newValue , oldValue){
        // 先取消订阅,再订阅新的
        this.updateView();
      }
    },
    cacheSubscription:{
      deep: true,
      handler(value){
        localStorage.setItem(this.config.id ,JSON.stringify(value))
      }
    }
  }
}
</script>

<style scoped>

</style>