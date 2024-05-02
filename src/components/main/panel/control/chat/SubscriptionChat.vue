<template>
  <div class="ctrl-subscription-record-warp" >
    <div class="ctrl-subscription-record-content" >
     <span style="max-width: 70%" :style="{'background-color': `${record.color}1a` ,'color': record.color}">
        <div class="ctrl-subscription-inner">
          <span class="el-icon-collection-tag" :style="{'background-color': `${record.color}1a`}">
            <span class="ctrl-subscription-topic" :style="{'background-color': `${record.color}1a`}">{{record.topic}}</span>
          </span>
          <div class="ctrl-subscription-content">
            {{record.data}}
          </div>
        </div>
        <el-divider></el-divider>
        <div class="ctrl-subscription-record-bottom" :style="{'background-color': `${record.color}1a` ,'color': record.color}">
          <div class="ctrl-subscription-bottom-time">{{record.time}}</div>
          <div @click="copy" class="ctrl-subscription-bottom-copy el-icon-copy-document"></div>
        </div>
     </span>

    </div>
  </div>
</template>

<script>


export default {
  name: "SubscriptionChat",
  props:['record'],
  methods:{
    copy(){
      this.$copyText(JSON.stringify(this.getCopyData())).then(() => {
        this.$notify.success('复制成功');
      } , (e) => {
        this.$notify.error('复制失败');
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
  },
  mounted() {
    // console.log(this.record)
  }
}
</script>

<style scoped>
  .ctrl-subscription-record-warp{
    width: 100%;
    height: auto;
  }
  .ctrl-subscription-record-content{
    width: auto;
    height: auto;
    padding: 2px;
    color: #1f1f1f;
  }

  .ctrl-subscription-record-content span{
    display: inline-block;
    background-color: #fff;
    border-radius: 0 10px 10px 10px;
    padding: 5px;
  }

  /*.el-icon-collection-tag{*/
  /*  width: 70%;*/
  /*}*/

  .ctrl-subscription-topic{
    font-size: 12px;
    padding: 2px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .ctrl-subscription-record-bottom{
    font-size: 12px;
    color: #382828;
  }

  /deep/ .el-divider--horizontal{
    margin: 2px 0;
    background-color: #fdfdfd;
  }

  .ctrl-subscription-record-bottom div{
    float: left;
  }

  .ctrl-subscription-bottom-time{
    font-size: 12px;
  }

  .ctrl-subscription-bottom-copy{
    padding: 2px;
  }

  .ctrl-subscription-content{
    height: 100%;
    word-wrap: break-word;
    font-size: 15px;
  }
</style>