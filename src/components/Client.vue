<template>
  <div id="app">
  </div>
</template>

<script>

import MessageQueue from "@/utils/MessageQueue";

export default {
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

</style>
