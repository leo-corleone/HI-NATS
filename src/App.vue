<template>
  <div id="app">
    <Header/>
    <Navigation/>
    <el-button type="text" @click="show">点击打开 Message Box</el-button>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Navigation from "@/components/Navigation.vue";

export default {
  name: 'App',
  components: {
    Header,
    Navigation
  },
  methods:{
    show(){
      this.$notify({
        title: '警告',
        message: '这是一条警告的提示消息',
        type: 'warning'
      });
    }
  },
  mounted() {
    console.log(this)
  }
}
</script>

<style>
#app {

}

</style>
