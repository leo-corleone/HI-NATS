<template>
  <div>
    Client
  </div>
</template>

<script>

import MessageQueue from "@/utils/MessageQueue";

export default {
  name: 'Client',
  data() {
    return {
      status: null,
      mq: new MessageQueue(),
    }
  },
  methods: {
    connectionListener() {
    },
    errorListener() {
    },
  }
}
</script>

<style>

</style>
