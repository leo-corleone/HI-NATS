<template>
  <div class="connect-warp">
    <div>
      <EditConnectionDialog :config="connection" :editConnection="editConnection" ref="editConnection"/>
    </div>
    <div class="connect-warp-outer">
      <div class="connect-warp-icon" :style="this.connection.id === this.selectedConnection ? 'color:green' : 'color:red'">
          <i class="el-icon-cloudy"></i>
      </div>
      <el-tooltip class="item" effect="dark" :content="contentToolTip" placement="top">
        <div class="connect-warp-content ellipsis el-badge">
          {{ connection.name }}@{{ connection.host }}:{{ connection.port }}
        </div>
      </el-tooltip>
      <div class="connect-warp-ctrl">
        <el-tooltip class="item" effect="dark" content="打开控制台" placement="top-start">
          <div class="el-icon-data-board" style="color: #08a2d6" @click.stop="ctrlDashboard"></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="编辑连接" placement="top-start">
          <div class="el-icon-setting"  @click.stop="openEditConnection"></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="点击删除" placement="top-start">
          <div class="el-icon-delete" style="color: #e82323" @click.stop="deleteConnection"></div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import EditConnectionDialog from "@/components/dialog/EditConnectionDialog.vue";

export default {
  name: "Connection",
  props: ['connection','returnToTab' ,'removeConnection' ,'editConnection' ,'selectedConnection' , 'tabsMap'],
  components:{
    EditConnectionDialog
  },
  methods: {
    ctrlDashboard() {
      this.returnToTab(this.connection);
    },
    openEditConnection() {
      if (this.tabsMap.has(this.connection.id)){
        this.$notify.warning({ title: '警告' , message:'控制台打开时,无法编辑连接'})
        return;
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
        this.removeConnection(this.connection);
      }
    }
  },
  computed: {
    contentToolTip() {
      return this.connection.name + "@" + this.connection.host + ":" + this.connection.port;
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
  background-color: rgb(243 248 254);
}

.connect-warp-outer:hover {
  background-color: rgb(210 219 229 / 99%);
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
  margin: 0 auto 0 2px;
  overflow: hidden;
  font-size: small;
  color: #87c6af;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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

</style>