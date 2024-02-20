<template>
  <div>
    <el-dialog title="新增订阅" width="25%" :close-on-click-modal="false" center
               :visible.sync="isPop">
      <el-form :model="subscription" :rules="rules" ref="editSubForm" label-width="80px"
               style="height: 150px; text-align: center">
        <el-form-item label="主题" required prop="topic">
          <el-input clearable
                    size="mini" prefix-icon="el-icon-star-off" placeholder="请输入主题"
                    v-model.trim="subscription.topic"></el-input>
        </el-form-item>
        <el-form-item label="颜色" required prop="color" style="text-align: left">
          <el-col :span="3">
            <el-form-item prop="color" required style="padding-top: 6px">
              <el-color-picker size="mini" v-model="subscription.color"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">:</el-col>
          <el-col :span="9">
            <el-form-item prop="color" required>
              <el-input clearable
                        size="mini" v-model="subscription.color" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="danger" size="small" @click="isPop = false" round>取 消</el-button>
    <el-button type="primary" size="small" @click="submitSubscribe" :loading="loading" round>确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {validateTopic} from "@/utils/Validator";

export default {
  name: "AddSubscriptionDialog",
  props: ['connectionId' ,'subscribe'],
  data() {
    return {
      isPop: false,
      loading: false,
      subscription: {
        id: '',
        color: '#409EFF',
        topic: '',
      },
      rules: {
        topic: [
          {required: true, message: '请输入主题', trigger: ['blur', 'change']},
          {validator: validateTopic, trigger: ['blur', 'change']},
        ],
        color: [
          {required: true, message: '请选择颜色', trigger: ['blur', 'change']},
        ]
      }
    }
  },
  methods: {
    changeLoadingState(bool = true) {
      this.loading = bool
    },
    submitSubscribe() {
      this.validateForm(() => {
        this.changeLoadingState()
        let re = this.subscribe(JSON.parse(JSON.stringify(this.subscription)));
        if (re){
          this.isPop = false;
        }
        this.changeLoadingState(false);
      });
    },
    validateForm(fn) {
      this.$refs.editSubForm.validate((valid) => {
        if (valid) {
          fn();
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>