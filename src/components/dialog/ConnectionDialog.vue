<template>
  <el-dialog title="新增连接" width="25%" custom-class="connection-dialog" :close-on-click-modal="false" center
             :visible.sync="isPop">
    <el-form :model="connection" :rules="rules" label-width="80px" style="height: 300px; text-align: center">
      <el-form-item label="连接名" required prop="name">
        <el-input clearable
                  size="mini" prefix-icon="el-icon-user" placeholder="请输入连接名"
                  v-model.trim="connection.name"></el-input>
      </el-form-item>
      <el-form-item label="连接地址" required>
        <el-col :span="14">
          <el-form-item prop="host" required>
            <el-input clearable
                      size="mini" v-model="connection.host" placeholder="请输入地址" style="width: 100%;">
              <template slot="prefix">ws</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">:</el-col>
        <el-col :span="9">
          <el-form-item prop="port" required>
            <el-input clearable
                      size="mini" v-model.number="connection.port" style="width: 100%;"
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
    <el-button @click="isPop=false" type="danger" size="small" round>取 消</el-button>
    <el-button type="primary" round @click="isPop=false" size="small">确 定</el-button>
    <el-button type="success" round size="small" @click="testConnect">测 试 连 接</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {validateIP ,isPort} from "@/utils/Validator";
import {EventConstant} from "@/busEvent/EventConstant";

export default {
  name: "ConnectionDialog",
  data() {
    return {
      connection: {
        name: null,
        host: null,
        port: null,
        username: null,
        password: null,
        token: null,
      },
      isPop: false,
      rules: {
        name: [
          {required: true, message: '请输入连接名', trigger: 'blur'},
          {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ],
        host: [
          {validator:validateIP, trigger: 'blur'},
        ],
        port: [
          {validator:isPort, trigger: 'blur'},
        ]
      }
    }
  },
  methods:{
    testConnect() {
      this.$bus.$emit(EventConstant.TEST_CONNECTION_CLIENT , this.connection);
    }
  }
}
</script>

<style scoped>

/deep/ .connection-dialog {
  border-radius: 22px;
}

</style>