<template>
  <div id="app">
    status:{{ status }}
  </div>
</template>

<script>

import MessageQueue from "@/utils/MessageQueue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Client',
  props: ['config'],
  data() {
    return {
      status: null,
      mq: new MessageQueue(),
    }
  },
  methods: {
    async connect() {
      await this.mq.conn({
        host: this.config.host,
        port: this.config.port,
        connectionListener: this.connectionListener,
        errorListener: this.errorListener
      })
    },
    connectionListener(status) {
      this.status = status;
    },
    errorListener(err) {
      console.log(err)
    },
  },
  mounted() {

  },
  beforeDestroy() {
    this.mq.close();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
