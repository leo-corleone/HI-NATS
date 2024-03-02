<template>
  <div>
    <el-dialog title="编辑连接" width="25%" custom-class="connection-dialog" :close-on-click-modal="false" center
               :visible.sync="isPop">
      <el-form :model="editConfig" ref="editForm" :rules="rules" label-width="80px"
               style="height: 330px; text-align: center">
        <el-form-item label="连接名" required prop="name">
          <el-input clearable
                    size="mini" prefix-icon="el-icon-user" placeholder="请输入连接名"
                    v-model.trim="editConfig.name"></el-input>
        </el-form-item>
        <el-form-item label="连接地址" required>
          <el-col :span="14">
            <el-form-item prop="host" required>
              <el-input clearable
                        size="mini" v-model="editConfig.host" placeholder="请输入地址" style="width: 100%;">
                <template slot="prefix">ws</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">:</el-col>
          <el-col :span="9">
            <el-form-item prop="port" required>
              <el-input clearable
                        size="mini" v-model.number="editConfig.port" style="width: 100%;"
                        placeholder="请输入端口"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="监控地址">
          <el-col :span="14">
            <el-form-item prop="monitorHost">
              <el-input clearable
                        size="mini" v-model="editConfig.monitorHost" placeholder="请输入地址" style="width: 100%;">
                <template slot="prefix">http</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">:</el-col>
          <el-col :span="9">
            <el-form-item prop="monitorPort">
              <el-input clearable
                        size="mini" v-model.number="editConfig.monitorPort" style="width: 100%;"
                        placeholder="请输入端口"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input clearable
                    size="mini" prefix-icon="el-icon-user-solid" v-model="editConfig.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input clearable
                    size="mini" prefix-icon="el-icon-key" type="password" v-model="editConfig.password"></el-input>
        </el-form-item>
        <el-form-item label="token" prop="token">
          <el-input clearable
                    size="mini" prefix-icon="el-icon-price-tag" v-model="editConfig.token"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="submitEdit" type="primary" size="small" round>确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {isMonitorPort, isPort, validateIP, validateMonitorIP} from "@/utils/Validator";

export default {
  name: "EditConnectionDialog",
  props: ['config' ,'editConnection'],
  data() {
    return {
      isPop: false,
      editConfig: JSON.parse(JSON.stringify(this.config)),
      loading: false,
      rules: {
        name: [
          {required: true, message: '请输入连接名', trigger: ['blur', 'change']},
          {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: ['blur', 'change']}
        ],
        host: [
          {validator: validateIP, trigger: ['blur', 'change']},
        ],
        port: [
          {validator: isPort, trigger: ['blur', 'change']},
        ],
        monitorHost: [
          {validator: validateMonitorIP, trigger: ['blur', 'change']},
        ],
        monitorPort: [
          {validator: isMonitorPort, trigger: ['blur', 'change']},
        ]
      }
    }
  },
  methods: {
    submitEdit() {
      this.validateForm(() => {
        this.editConnection(JSON.parse(JSON.stringify(this.editConfig)))
        this.isPop = false;
      })
    },
    validateForm(fn) {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          fn();
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    isPop(newValue) {
      if (newValue) {
        this.editConfig = JSON.parse(JSON.stringify(this.config))
      }
    }
  }
}
</script>

<style scoped>

</style>