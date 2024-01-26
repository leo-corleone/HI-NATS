<template>
  <el-dialog title="新增连接" width="30%" custom-class="connection-dialog" :close-on-click-modal="false" center
             :visible.sync="isPop">
    <el-form :model="connection" label-width="100px" style="height: 200px; text-align: center">
      <el-form-item label="连接名称" prop="name">
        <el-input clearable
                  size="mini" prefix-icon="el-icon-user" placeholder="请输入...."
                  v-model="connection.name"></el-input>
      </el-form-item>
      <el-form-item label="连接名称" prop="host">
        <el-input clearable
                  size="mini" v-model="connection.host"></el-input>
      </el-form-item>
      <el-form-item label="连接名称" prop="port">
        <el-input clearable
                  size="mini" v-model="connection.port"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="isPop = false">取 消</el-button>
    <el-button type="primary" @click="isPop = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>

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
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

/deep/ .connection-dialog {
  border-radius: 22px;
}

</style>