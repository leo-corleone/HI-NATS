<template>
  <div class="connect-warp">
    <div>
      <EditConnectionDialog :config="connection" ref="editConnection"/>
    </div>
    <div class="connect-warp-outer">
      <el-tooltip class="item" effect="dark" :content="state === 1 ? '已连接' : '未连接'" placement="left-end">
        <div class="connect-warp-icon" :style="state === 1 ? 'color:green': 'color:red'">
          <i class="el-icon-cloudy"></i>
        </div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="contentToolTip" placement="left-end">
        <div class="connect-warp-content ellipsis el-badge" @click="toControlDashboard">
          {{ connection.name }}@{{ connection.host }}:{{ connection.port }}
        </div>
      </el-tooltip>
      <div class="connect-warp-ctrl">
        <el-tooltip class="item" effect="dark" :content="state === 1 ? '点击断开' : '点击连接'" placement="top-start">
          <div :style="state === 1 ? 'color:red':'color:green'" :class="isLoading ? 'el-icon-loading' : 'el-icon-switch-button'" @click.stop="connect"></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="编辑连接" placement="top-start">
          <div class="el-icon-setting" @click.stop="editConnection"></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="点击删除" placement="top-start">
          <div class="el-icon-delete" @click.stop="deleteConnection"></div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import MessageQueue from "@/utils/MessageQueue";
import EditConnectionDialog from "@/components/dialog/EditConnectionDialog.vue";
import {EventConstant} from "@/busEvent/EventConstant";

export default {
  name: "Connection",
  props: ['connection','switchControlDashboard' ,'disconnection'],
  components:{
    EditConnectionDialog
  },
  data() {
    return {
      // -1: 未连接 , 0:正在重连 , 1:已连接
      state: -1,
      client: new MessageQueue(),
      isLoading: false,
      status: null,
      cacheSubscription:JSON.parse(localStorage.getItem(this.connection.id)) || [],
      subscription:{
        id:null,
        color: null,
        topic:null
      }
    }
  },
  methods: {
    async connect() {
      if (this.isLoading) {
        if (this.state === 0){
          this.$notify.warning('正在重连!!!');
        }else {
          this.$notify.warning('正在连接!!!');
        }
        return;
      }
      if (this.isActive()) {
        this.disconnection(this.connection.id);
        this.close();
        return;
      }
      this.isLoading = true;
      const nc = await this.client.conn({
        name: this.connection.name,
        token: this.connection.token,
        user: this.connection.username,
        pass: this.connection.password,
        host: this.connection.host,
        port: this.connection.port,
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
    async editConnection() {
      if (this.isActive()){
        let result = await this.$confirm('此操作将会断开连接, 是否继续?' , '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err);
        if (result === 'confirm'){
          this.close();
        }else {
          return;
        }
      }
      this.$refs.editConnection.isPop = true;
    },
    async deleteConnection() {
      let result = await this.$confirm(`是否删除:${this.connection.name}?` , '删除' ,{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).catch(err => err);
      if (result === 'confirm'){
        this.$bus.$emit(EventConstant.DELETE_CONNECTION , this.connection.id);
      }
    },
    connectionListener(status) {
      this.status = status;
    },
    isActive(){
      return this.client.isActive();
    },
    close(){
      this.client.close().then(()=>{
        this.state = -1
      });
    },
    toControlDashboard(){
      if (!this.isActive()){
        this.$notify.error('请先连接');
        return;
      }
      this.switchControlDashboard(this.connection , this.client);
    },
    unsubscribeAllTopic() {
      if (!this.client.isActive()){
        return;
      }
      this.cacheSubscription = JSON.parse(localStorage.getItem(this.connection.id)) || [];
      this.cacheSubscription.forEach(subscription => {
        this.client.unsub(subscription.topic);
      });
    },
    subscribeAllTopic(fn){
      if (!this.client.isActive()){
        return;
      }
      this.cacheSubscription = JSON.parse(localStorage.getItem(this.connection.id)) || [];
      this.cacheSubscription.forEach(subscription => {
        this.client.sub(subscription.topic , (data)=>{
           fn(subscription , data);
        });
      })
    },
    subscribe(subscription ,fn){
      if (!this.isActive()){
        this.$notify.error("未连接,无法订阅");
        return;
      }
      this.client.sub(subscription.topic , (data)=>{
        fn(subscription , data);
      });
    },
    unSubscribe(subscription){
      this.client.unsub(subscription.topic);
    },
    publish(publication , cb){
      if (!this.isActive()){
        this.$notify.error('服务未连接');
        return
      }
      this.client.pub(publication.topic , publication.data)
      cb && cb();
    },
    request(request , cb){
      if (!this.isActive()){
        this.$notify.error('服务未连接');
        return
      }
      let re = this.client.req(request.topic , request.data)
      cb && cb();
      if (re instanceof Error){
        this.$notify.error(re.message);
        return null;
      }
      return re;
    }
  },
  mounted() {
    this.$bus.$on(EventConstant.UNSUBSCRIBE_ALL  + this.connection.id , this.unsubscribeAllTopic);
    this.$bus.$on(EventConstant.UNSUBSCRIBE  + this.connection.id , this.unSubscribe);
    this.$bus.$on(EventConstant.SUBSCRIBE_ALL  + this.connection.id , this.subscribeAllTopic);
    this.$bus.$on(EventConstant.SUBSCRIBE  + this.connection.id , this.subscribe);
    this.$bus.$on(EventConstant.REQUEST + this.connection.id , this.request);
    this.$bus.$on(EventConstant.PUBLICATION + this.connection.id , this.publish);
  },
  beforeDestroy() {
    this.close();
  },
  computed: {
    contentToolTip() {
      return this.connection.name + "@" + this.connection.host + ":" + this.connection.port;
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
      }
    },
    state:{
      handler(s){
        this.isLoading = s === 0;
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