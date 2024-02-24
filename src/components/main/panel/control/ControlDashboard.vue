<template>
  <div class="ctrl-view-wrap">
    <AddSubscriptionDialog ref="addSub" :subscribe="subscribe" :connectionId="connection.id"/>
    <div class="ctrl-view-left">
      <div class="ctrl-view-left-title">
        <span class="el-icon-user-solid ellipsis ctrl-view-left-title-info">{{ connection.name }}@{{
            connection.host
          }}:{{ connection.port }}</span>
        <span class="ctrl-view-left-title-btn">
         <el-tooltip class="item" effect="light" content="点击订阅" placement="top-start">
           <el-button class="el-icon-collection-tag" @click="openSubscriptionDialog" type="success" size="mini"
                      circle></el-button>
         </el-tooltip>
       </span>
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
          </template>
        </div>
        <el-divider @mousedown="down" class="ctrl-view-right-drag-bar"/>
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


export default {
  name: "ControlDashboard",
  props: ['connection', 'client'],
  components: {
    Subscription,
    AddSubscriptionDialog,
    PublishChat,
    SubscriptionChat,
    TextInputChat,
  },
  data() {
    return {
      cacheSubscription: [],
      chatRecords: []
    }
  },
  methods: {
    down(data){

    },
    publishData(publication,cb){
      this.$bus.$emit(EventConstant.PUBLICATION + this.connection.id , publication , ()=>{
         cb && cb();
         this.renderPublication(publication);
      })
    },
    requestData(request ,cb) {
      this.$bus.$emit(EventConstant.REQUEST + this.connection.id , request , (data)=>{
        cb && cb();
        this.renderPublication(request);
      })
    },
    renderPublication(publication){
      let chatRecord = {
        id: nanoid(),
        data : publication.data,
        type: 'pub',
        topic: publication.topic,
        time: this.getCurrentTime(),
      }
      this.pushRecord(chatRecord);
      this.refreshScrollView();
    },
    renderSubscription(subscription ,data) {
      let chatRecord = {
        id: nanoid(),
        data: data,
        type: 'sub',
        topic: subscription.topic,
        time: this.getCurrentTime(),
      }
      this.pushRecord(chatRecord);
      this.refreshScrollView();
    },
    pushRecord(record){
      this.chatRecords.push(record);
    },
    refreshScrollView(){
      this.$nextTick(()=>{
        this.$refs.chatWindow.scrollTop = this.$refs.chatWindow.scrollHeight
      })
    },
    refreshCurrentSubscription() {
      this.cacheSubscription = JSON.parse(localStorage.getItem(this.connection.id)) || [];
    },
    openSubscriptionDialog() {
      this.$refs.addSub.isPop = true;
    },
    unSubscribeAllTopic(uid) {
      this.$bus.$emit(EventConstant.UNSUBSCRIBE_ALL + uid);
    },
    subscribeAllTopic(uid) {
      this.$bus.$emit(EventConstant.SUBSCRIBE_ALL + uid, this.renderSubscription);
    },
    subscribe(subscription) {
      this.refreshCurrentSubscription();
      let re = this.cacheSubscription.filter(sub => sub.topic === subscription.topic);
      if (re && re.length > 0) {
        this.$notify.error('当前主题已订阅!!!')
        return false;
      }
      if (!this.client?.isActive()) {
        this.$notify.error("未连接,无法订阅!!!");
        return false;
      }
      subscription.id = nanoid();
      this.$bus.$emit(EventConstant.SUBSCRIBE + this.connection.id, subscription, this.renderSubscription);
      this.cacheSubscription.push(subscription);
      return true;
    },
    unSubscribe(subscription) {
      this.refreshCurrentSubscription();
      if (!this.client?.isActive()) {
        this.$notify.error("未连接无法取消订阅");
        return;
      }
      this.$bus.$emit(EventConstant.UNSUBSCRIBE + this.connection.id, subscription);
      this.cacheSubscription = this.cacheSubscription.filter(sub => sub.topic !== subscription.topic);
    },
    getCurrentTime(){
      return moment().format('HH:mm:ss');
    }
  },
  watch: {
    connection: {
      deep: true,
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.refreshCurrentSubscription();
        }
      }
    },
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

.ctrl-view-wrap .ctrl-view-right, .ctrl-view-wrap .ctrl-view-left {
  float: left;
}

.ctrl-view-right-wrap{
  height: 100%;
  width: 100%;
}

.ctrl-view-wrap .ctrl-view-right {
  background-color: #ededed;
  width: 77%;
  height: 100%;
}

.ctrl-view-right-wrap-chat{
  padding: 10px;
  width: calc(100% - 20px);
  height: 65%;
  overflow-y: auto;
}

.ctrl-view-right-wrap-input{
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
  background-color: rgba(238, 234, 228, 0.97);
  border-radius: 10px 10px 0 0;
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
  width: calc(15% - 10px);
  height: 100%;
  padding: 0 5px;
}

/deep/ .el-divider--horizontal{
  margin: 2px 0;
  height: 1px;
}

.ctrl-view-right-drag-bar:hover{
  background-color: #0d6e5b;
  height: 2px;
  cursor: pointer;
}
</style>