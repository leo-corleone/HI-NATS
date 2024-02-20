<template>
  <div class="dashboard-wrap">
    <div class="dashboard-wrap-inner">
      <Navigation/>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/main/Navigation.vue";
export default {
  name: "Dashboard",
  components:{
   Navigation
  }
}
</script>

<style scoped>
  .dashboard-wrap{
    width: 100%;
    height: 94.5%;
  }

  .dashboard-wrap-inner{
    width: 90%;
    height: 100%;
    margin: 0 auto;
  }
</style>