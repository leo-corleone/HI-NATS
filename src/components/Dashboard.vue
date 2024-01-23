<template>
  <div class="dashboard">
    <Navigation/>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
export default {
  name: "Dashboard",
  components:{
   Navigation
  },
  data(){
    return {
      host: null,
      port: null,
      configs:[]
    }
  },
  methods:{
  }
}
</script>

<style scoped>
  .dashboard{
    width: 80%;
    height: 90%;
    margin: 5px auto 0 auto;
  }
</style>