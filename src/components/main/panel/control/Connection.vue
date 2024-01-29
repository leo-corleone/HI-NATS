<template>
  <div class="connect-warp">
    <div class="connect-warp-outer">
      <el-tooltip class="item" effect="dark" :content="state === 1 ? '已连接' : '未连接'" placement="left-end">
        <div class="connect-warp-icon" :style="state === 1 ? 'color:green': 'color:red'">
          <i class="el-icon-cloudy"></i>
        </div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="contentToolTip" placement="left-end">
        <div class="connect-warp-content ellipsis">
          {{ config.name }}@{{ config.host }}:{{ config.port }}
        </div>
      </el-tooltip>
      <div class="connect-warp-ctrl">
        <el-tooltip class="item" effect="dark" content="点击连接" placement="top-start">
          <div :class="isLoading ? 'el-icon-loading' : 'el-icon-link'" @click="connect"></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="编辑连接" placement="top-start">
          <div class="el-icon-setting" @click="editConnection"></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="点击删除" placement="top-start">
          <div class="el-icon-delete" @click="deleteConnection"></div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import MessageQueue from "@/utils/MessageQueue";

export default {
  name: "Connection",
  props: ['config'],
  data() {
    return {
      // -1: 未连接 , 0:正在重连 , 1:已连接
      state: -1,
      client: new MessageQueue(),
      isLoading: false,
      status: null,
    }
  },
  methods: {
    async connect() {
      if (this.isLoading) {
        this.$notify.warning('正在重连!!!');
        return;
      }
      if (this.isActive()) {
        this.$notify.warning('已连接成功!!!');
        return;
      }
      this.isLoading = true;
      const nc = await this.client.conn({
        name: this.config.name,
        token: this.config.token,
        user: this.config.username,
        pass: this.config.password,
        host: this.config.host,
        port: this.config.port,
        noEcho: false,
        connectionListener: this.connectionListener,
      });
      if (nc instanceof Error) {
        this.state = -1;
        this.$notify.error({title: '连接失败', message: nc.message})
      } else {
        this.state = 1;
        this.$notify.success('连接成功')
      }
      this.isLoading = false;
    },
    editConnection() {
      console.log(this);
    },
    deleteConnection() {
      console.log(this);
    },
    connectionListener(status) {
      this.status = status;
    },
    isActive(){
      return this.client.isActive();
    }
  },
  beforeDestroy() {
    this.client.close().then();
  },
  computed: {
    contentToolTip() {
      return this.config.name + "@" + this.config.host + ":" + this.config.port;
    },
  },
  watch: {
    status: {
      handler(status) {
         switch (status.type){
           case 'pingTimer':
             this.state = 1;
             break;
           case 'reconnecting' :
             this.state = 0;
             break;
           case 'reconnect':
             this.state = 0;
             break;
           case  'disconnect':
             this.state = -1;
             break;
         }
         console.log(status.type)
      }
    }
  }
}
</script>

<style scoped>
.connect-warp {
  width: 100%;
  height: 45px;
  overflow: hidden;
}

.connect-warp-outer {
  width: calc(100% - 2px);
  margin: 0 auto;
  padding: 5px 0;
  height: 33px;
  line-height: 33px;
  border-radius: 10px;
  background-color: rgba(225, 214, 214, 0.5);
}

.connect-warp-outer:hover {
  background-color: rgba(225, 214, 214, 0.95);
}

.connect-warp-outer div {
  float: left;
}

.connect-warp-icon {
  color: white;
  height: 100%;
  width: calc(10% - 10px);
  margin: 0 5px;
  font-size: 20px;
}

.connect-warp-content {
  height: 100%;
  width: calc(50% - 10px);
  margin: 0 auto 0 10px;
  overflow: hidden;
}

.connect-warp-ctrl {
  height: 100%;
  width: calc(40% - 20px);
  padding: 0 10px;
}

.connect-warp-ctrl div {
  height: 100%;
  width: calc(100% / 3.5);
  line-height: 33px;
  font-size: 18px;
  display: flex;
  justify-content: center;
}

.connect-warp-ctrl div:hover {
  color: rgba(7, 239, 7, 0.66);
}

.connect-warp-ctrl div:last-child:hover {
  color: rgba(239, 15, 7, 0.66);
}
</style>