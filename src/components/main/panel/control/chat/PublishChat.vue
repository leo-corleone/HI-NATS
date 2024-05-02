<template>
  <div class="ctrl-publish-record-warp">
    <span class="ctrl-publish-record-content">
     <div class="ctrl-publish-content-outer">
       <span style="max-width: 70%" :style="{'background-color': `${record.color}1a` ,'color': record.color}">
         <div class="ctrl-publish-content-topic" >
           <div class="el-icon-position">
             <span class="ctrl-publish-record-topic">{{record.topic}}</span>
           </div>
           <div class="ctrl-publish-content-main">
             {{record.data}}
           </div>
         </div>
         <el-divider></el-divider>
         <div class="ctrl-publish-record-bottom">
          <div class="ctrl-publish-bottom-time">{{record.time}}</div>
          <div @click="copy" class="ctrl-publish-bottom-copy el-icon-copy-document"></div>
        </div>
       </span>
     </div>
    </span>
  </div>
</template>

<script>
export default {
  name: "PublishChat",
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
.ctrl-publish-record-warp {
  width: 100%;
  height: auto;
}

.ctrl-publish-record-warp::after{
  /*border: 1px solid ;*/
  content: "";
  display: block;
  clear: both;
}

.ctrl-publish-record-content {
  color: #1f1f1f;
}

.ctrl-publish-content-outer{
  height: border-box;
}

.ctrl-publish-content-outer > span{
  display: block;
  float: right;
  background-color: #a8e979;
  border-radius: 5px 0 5px 5px;
  padding: 5px;
  margin: 4px 0;
}

.ctrl-publish-content-main{
  padding: 5px;
  height: 100%;
  font-size: 15px;
  word-wrap: break-word;
}

/deep/ .el-divider--horizontal{
  margin: 2px 0;
  background-color: #fdfdfd;
}

.ctrl-publish-record-topic{
  font-size: 12px;
}

.ctrl-publish-record-bottom div{
  float: left;
}

.ctrl-publish-bottom-time{
  font-size: 12px;
}

.ctrl-publish-bottom-copy{
  padding: 2px;
  font-size: 12px;
}

</style>