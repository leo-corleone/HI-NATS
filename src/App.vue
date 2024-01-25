<template>
  <div id="app">
    <Header/>
    <Dashboard/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Dashboard from "@/components/main/Dashboard.vue";

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
  width: 100%;
  height: 100%;
  min-height: 100%;
}

html ,body{
  height: 100%;
  margin: 0;
}
</style>
