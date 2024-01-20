<template>
  <div id="app">
     <Header/>
     <Dashboard/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Dashboard from "@/components/Dashboard.vue";
export default {
  name: 'App',
  components: {
     Header,
     Dashboard
  }
}
</script>

<style>
#app {

}

</style>
