<template>
  <div class="ctrl-text-input-warp">
    <div class="ctrl-text-input-tool">
      <el-form :inline="true" :model="publication">
        <el-form-item label="模式">
          <el-select size="mini" style="width: 75px" v-model="publication.type" placeholder="活动区域">
            <el-option label="发布" value="pub"></el-option>
            <el-option label="请求" value="req"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主题">
          <el-input size="mini" style="width: 400px" v-model="publication.topic" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="dispatcher" :loading="loading" :disabled="!isActive" icon="el-icon-position">确认</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="warning" icon="el-icon-refresh" @click="clearChatWindow">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="ctrl-text-field">
        <div class="ctrl-text-field-editor">
         <b-code-editor style="height: 100%; border:none; text-align: left" v-model="publication.data" :auto-format="true" theme="dracula" :indent-unit="4" :line-wrap="false" :lint="true" :show-number="true" :readonly="false"/>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "TextInputChat",
  props:['publish' ,'request' ,'isActive' ,'clearChatWindow'],
  data(){
    return {
      publication:{
        topic:'',
        type:'pub',
        data:'',
      },
      loading:false
    }
  },
  methods:{
    changeState(state = false){
      this.loading = state;
    },
    dispatcher(){
      if (this.publication.topic === null || this.publication.topic === ''){
        this.$notify.error('主题不能为空');
        return
      }
      this.changeState(true);
      if (this.publication.type === 'req'){
        this.request(this.publication , ()=>{
          this.changeState();
        })
      }else {
        this.publish(this.publication , ()=>{
          this.changeState();
        });
      }
    }
  }
}
</script>

<style scoped>

.ctrl-text-input-warp{
  height: 100%;
  width: 100%;
}

 .ctrl-text-input-tool{
   padding: 5px;
   border-bottom: 1px solid gray;
   height: 40px;
 }

 .ctrl-text-field{
   height: calc(100% - 51px);
   width: 100%;
   background-color: red;
 }

 .ctrl-text-field-editor{
   width: 100%;
   height: 100%;
 }

 .el-form-item{
   margin-bottom: 5px;
 }
</style>