<template>
  <el-dialog title="新增连接" width="30%" custom-class="connection-dialog" :close-on-click-modal="false" center
             :visible.sync="isPop">
    <el-form :model="connection" ref="newForm" :rules="rules" label-width="80px" style="height: 330px; text-align: center">
      <el-form-item label="连接名" required prop="name">
        <el-input clearable
                  size="mini" prefix-icon="el-icon-user" placeholder="请输入连接名"
                  v-model.trim="connection.name"></el-input>
      </el-form-item>
      <el-form-item label="连接地址" required>
        <el-col :span="17">
          <el-form-item prop="host" required>
            <el-input clearable
                      size="mini" v-model="connection.host" placeholder="请输入地址" style="width: 100%;">
              <template slot="prefix">ws</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">:</el-col>
        <el-col :span="6">
          <el-form-item prop="port" required>
            <el-input clearable
                      size="mini" v-model.number="connection.port" style="width: 100%;"
                      placeholder="请输入端口"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="监控地址">
        <el-col :span="17">
          <el-form-item prop="monitorHost">
            <el-input clearable
                      size="mini" v-model="connection.monitorHost" placeholder="请输入地址" style="width: 100%;">
              <template slot="prefix">http</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">:</el-col>
        <el-col :span="6">
          <el-form-item prop="monitorPort">
            <el-input clearable
                      size="mini" v-model.number="connection.monitorPort" style="width: 100%;"
                      placeholder="请输入端口"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input clearable
                  size="mini" prefix-icon="el-icon-user-solid" v-model="connection.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input clearable
                  size="mini" prefix-icon="el-icon-key" type="password" v-model="connection.password"></el-input>
      </el-form-item>
      <el-form-item label="token" prop="token">
        <el-input clearable
                  size="mini" prefix-icon="el-icon-price-tag" v-model="connection.token"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="reset" type="danger" size="small" round>重 置</el-button>
    <el-button @click="submitForm" type="primary" size="small" round>确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {isMonitorPort, isPort, validateIP, validateMonitorIP} from "@/utils/Validator";
import {nanoid} from "nanoid";

export default {
  name: "NewConnectionDialog",
  props:['addConnection'],
  data() {
    return {
      connection: {
        id: null,
        name: null,
        host: null,
        port: null,
        monitorHost: null,
        monitorPort: null,
        username: null,
        password: null,
        token: null,
      },
      isPop: false,
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
    submitForm() {
      this.validateForm(() => {
        console.log(this)
        this.connection.id = nanoid();
        this.addConnection(JSON.parse(JSON.stringify(this.connection)));
        this.isPop = false;
      })
    },
    reset() {
      this.$refs.newForm?.resetFields();
    },
    validateForm(fn) {
      this.$refs['newForm'].validate((valid) => {
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
        this.reset();
      }
    }
  }
}
</script>

<style scoped>

/deep/ .connection-dialog {
  border-radius: 22px;
}

</style>