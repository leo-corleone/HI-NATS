<template>
  <div class="ctrl-request-record-warp">
    <span class="ctrl-request-record-content">
     <div class="ctrl-request-content-outer">
       <span style="max-width: 70%" :style="{'background-color': `${record.color}1a` ,'color': record.color}">
         <div class="ctrl-request-content-topic" :style="{'background-color': `${record.color}1a` ,'color': record.color}" >
           <div class="el-icon-s-promotion">
             <span class="ctrl-request-record-topic">{{record.topic}}</span>
           </div>
           <div class="ctrl-request-content-main">
             {{record.data}}
           </div>
         </div>
         <el-divider></el-divider>
         <div class="ctrl-request-record-bottom">
          <div class="ctrl-request-bottom-time">{{record.time}}</div>
          <div @click="copy" class="ctrl-request-bottom-copy el-icon-copy-document"></div>
        </div>
       </span>
     </div>
    </span>
  </div>
</template>

<script>
export default {
  name: "requestChat",
  props: ['record'],
  methods:{
    copy(){
      this.$copyText(JSON.stringify(this.getCopyData())).then(() => {
        this.$notify.success('复制成功');
      } , (e) => {
        this.$notify.success('复制失败');
        console.log(e);
      });
    },
    getCopyData(){
      return  {
        topic: this.record.topic,
        data: this.record.data,
        time: this.record.time
      };
    }
  }
}
</script>

<style scoped>
.ctrl-request-record-warp {
  width: 100%;
  height: auto;
}

.ctrl-request-record-warp::after{
  /*border: 1px solid ;*/
  content: "";
  display: block;
  clear: both;
}

.ctrl-request-record-content {
  color: #1f1f1f;
}

.ctrl-request-content-outer{
  height: border-box;
}

.ctrl-request-content-outer > span{
  display: block;
  float: right;
  background-color: #80e979;
  border-radius: 5px 0 5px 5px;
  padding: 5px;
  margin: 4px 0;
}

.ctrl-request-content-main{
  padding: 5px;
  height: 100%;
  font-size: 15px;
  word-wrap: break-word;
}

/deep/ .el-divider--horizontal{
  margin: 2px 0;
}

.ctrl-request-record-topic{
  font-size: 12px;
}

.ctrl-request-record-bottom div{
  float: left;
}

.ctrl-request-bottom-time{
  font-size: 12px;
}

.ctrl-request-bottom-copy{
  padding: 2px;
  font-size: 12px;
}

</style>