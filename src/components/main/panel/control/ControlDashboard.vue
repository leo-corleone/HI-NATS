<template>
  <div class="ctrl-view-wrap">
    <AddSubscriptionDialog ref="addSub" :subscribe="subscribe" :connectionId="connection.id"/>
    <div class="ctrl-view-left">
      <div class="ctrl-view-left-title">
        <div class="ctrl-view-left-title-btn">
          <el-button class="el-icon-collection-tag" @click="openSubscriptionDialog" type="warning" size="mini"
                     plain> 订阅
          </el-button>
          <el-button class="el-icon-switch-button"
                     :loading="loading"
                     @click="switchConnect"
                     type="success"
                     size="mini"
                     plain> 连接
          </el-button>
        </div>
      </div>
      <div class="ctrl-view-left-subs infinite-list" style="overflow-y:auto">
        <Subscription v-for="sub in cacheSubscription" :key="sub.id" :unsub="unSubscribe" :subscription="sub"/>
      </div>
    </div>
    <div class="ctrl-view-right">
      <div class="ctrl-view-right-wrap">
        <div ref="chatWindow" class="ctrl-view-right-wrap-chat">
          <template v-for="record in chatRecords">
            <SubscriptionChat :key="record.id" :record="record" v-if="record.type === 'sub'"/>
            <PublishChat :key="record.id" :record="record" v-if="record.type === 'pub'"/>
            <RequestChat :key="record.id" :record="record" v-if="record.type === 'req' "/>
          </template>
        </div>
        <el-divider class="ctrl-view-right-drag-bar"/>
        <div class="ctrl-view-right-wrap-input">
          <TextInputChat :publish-data="publishData" :request-data="requestData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Subscription from "@/components/main/panel/control/Subscription.vue";
import {EventConstant} from "@/busEvent/EventConstant";
import AddSubscriptionDialog from "@/components/dialog/AddSubscriptionDialog.vue";
import {nanoid} from "nanoid";
import PublishChat from "@/components/main/panel/control/chat/PublishChat.vue";
import SubscriptionChat from "@/components/main/panel/control/chat/SubscriptionChat.vue";
import moment from "moment";
import TextInputChat from "@/components/main/panel/control/chat/TextInputChat.vue";
import RequestChat from "@/components/main/panel/control/chat/RequestChat.vue";
import MessageQueue from "@/utils/MessageQueue";

export default {
  name: "ControlDashboard",
  props: ['connection'],
  components: {
    Subscription,
    AddSubscriptionDialog,
    PublishChat,
    SubscriptionChat,
    TextInputChat,
    RequestChat
  },
  data() {
    return {
      cacheSubscription: [],
      chatRecords: [],
      mq: new MessageQueue(),
      loading: false,
    }
  },
  methods: {
    changeLoadingState(bool = false) {
      this.loading = bool;
    },
    async switchConnect() {
      this.changeLoadingState(true);
      if (!this.mq.isActive()) {
        await this.connect();
      } else {
        await this.disconnect();
      }
      this.changeLoadingState();
    },
    async connect() {
      const nc = await this.mq.conn({
        name: this.connection.name,
        host: this.connection.host,
        port: this.connection.port,
        username: this.connection.username,
        password: this.connection.password,
        token: this.connection.token
      });
      if (nc instanceof Error) {
        this.$notify.error({title: nc.message, message: '连接失败!!!'});
        return;
      }
      this.subscription();
    },
    async disconnect() {
      await this.mq.close();
    },
    querySubjects() {
      this.cacheSubscription = JSON.parse(localStorage.getItem(this.connection.id)) || [];
      return this.cacheSubscription;
    },
    subscription(){
      let subscriptions = this.querySubjects();
      subscriptions.forEach(subscription => {
        this.mq.sub(subscription.topic , (data ,msg) => {
          console.log(data , msg ,msg.subject);
        })
      })

      this.mq.sub('>' , (data ,msg) => {
        this.renderChatWindow(msg.subject , 'sub' , data)
      })
    },
    publishData(publication, cb) {
      this.$bus.$emit(EventConstant.PUBLICATION + this.connection.id, publication, () => {
        cb && cb();
        this.renderChatWindow(publication.topic, publication.type, publication.data);
      })
    },
    requestData(request, cb) {
      this.$bus.$emit(EventConstant.REQUEST + this.connection.id, request, (data) => {
        cb && cb();
        if (data instanceof Error) {
          this.$notify.error(data.message);
          return null;
        }
        this.renderChatWindow(request.topic, request.type, data);
      })
    },
    renderChatWindow(topic, type, data) {
      let chatRecord = {
        id: nanoid(),
        data: data,
        type: type,
        topic: topic,
        time: this.getCurrentTime(),
      }
      this.pushRecord(chatRecord);
      this.refreshScrollView();
    },
    pushRecord(record) {
      this.chatRecords.push(record);
    },
    refreshScrollView() {
      this.$nextTick(() => {
        this.$refs.chatWindow.scrollTop = this.$refs.chatWindow.scrollHeight
      })
    },

    openSubscriptionDialog() {
      this.$refs.addSub.isPop = true;
    },
    getCurrentTime() {
      return moment().format('HH:mm:ss');
    }
  },
  watch: {
    cacheSubscription: {
      deep: true,
      immediate: true,
      handler(value) {
        localStorage.setItem(this.connection.id, JSON.stringify(value))
      }
    }
  }
}
</script>

<style scoped>
.ctrl-view-wrap {
  width: 100%;
  height: 100%;
}

.ctrl-view-wrap > .ctrl-view-right, .ctrl-view-wrap > .ctrl-view-left {
  float: left;
}

.ctrl-view-right-wrap {
  height: 100%;
  width: 100%;
}

.ctrl-view-wrap .ctrl-view-right {
  background-color: #ededed;
  width: 77%;
  height: 100%;
}

.ctrl-view-right-wrap-chat {
  padding: 10px;
  width: calc(100% - 20px);
  height: 65%;
  overflow-y: auto;
}

.ctrl-view-right-wrap-input {
  height: calc(35% - 26px);
  width: 100%;
}


/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 10px; /* 设置滚动条宽度 */
  border-radius: 5px;
}

::-webkit-scrollbar-track {
  background-color: #f5f5f5; /* 设置滚动条背景色 */
}

::-webkit-scrollbar-thumb {
  background-color: #888; /* 设置滚动条颜色 */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 当鼠标悬停在滚动条上时的颜色 */
}

.ctrl-view-left {
  width: calc(23% - 1px);
  height: 100%;
  border-radius: 10px 10px 0 0;
  border-right: #ecebeb 1px solid;
}

.ctrl-view-left-title {
  width: 100%;
  height: 45px;
  line-height: 45px;
  /*background-color: rgba(238, 234, 228, 0.97);*/
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #d7d3d3;
}

.ctrl-view-left-subs {
  width: 100%;
  height: calc(100% - 45px);
  overflow: auto;
  overflow-x: hidden;
}

.ctrl-view-left-title span {
  display: inline-block;
}

.ctrl-view-left-title-info {
  width: calc(85% - 20px);
  padding: 0 10px;
}

.ctrl-view-left-title-btn {
  width: calc(100% - 10px);
  height: 100%;
  padding: 0 5px;
}

/deep/ .el-divider--horizontal {
  margin: 2px 0;
  height: 1px;
}

.ctrl-view-right-drag-bar:hover {
  background-color: #0d6e5b;
  height: 2px;
  cursor: pointer;
}
</style>