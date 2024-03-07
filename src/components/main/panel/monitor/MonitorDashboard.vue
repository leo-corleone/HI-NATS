<template>
  <div class="monitor-dashboard-wrap">
    <div class="monitor-dashboard-left">
      <div class="monitor-dashboard-module">
        <div class="monitor-left-title">
          Version
        </div>
        <div class="monitor-left-content">
          {{ version }}
        </div>
      </div>
      <div class="monitor-dashboard-module">
        <div class="monitor-left-title">
          Uptime
        </div>
        <div class="monitor-left-content">{{ uptime }}</div>
      </div>
      <div class="monitor-dashboard-module">
        <div class="monitor-left-title">
          Status
        </div>
        <div class="monitor-left-content">{{ status }}</div>
      </div>
      <div class="monitor-dashboard-module">
        <div class="monitor-left-title">
          Server Name
        </div>
        <div class="monitor-left-content">{{ serverName }}</div>
      </div>
      <div class="monitor-dashboard-module">
        <div class="monitor-left-title">
          Port
        </div>
        <div class="monitor-left-content">{{ port }}</div>
      </div>
      <div class="monitor-dashboard-module">
        <div class="monitor-left-title">
          Connections
        </div>
        <div class="monitor-left-content">{{ connections }}</div>
      </div>
      <div class="monitor-dashboard-module">
        <div class="monitor-left-title">
          Total Connections
        </div>
        <div class="monitor-left-content">{{ totalConnections }}</div>
      </div>
    </div>
    <div class="monitor-dashboard-right">
      <div class="monitor-dashboard-dynamic">
        <ConnectionsChart ref="connectionsChart"/>
      </div>
      <div class="monitor-dashboard-dynamic">
        <MemoryChart ref="memoryChart"/>
      </div>
      <div class="monitor-dashboard-dynamic">
        <ByteChart ref="byteChart"/>
      </div>
      <div class="monitor-dashboard-dynamic">
        <MessagesChart ref="msgChart"/>
      </div>
    </div>
  </div>
</template>

<script>
import {Api} from "@/utils/Api";
import ConnectionsChart from "@/components/main/panel/monitor/charts/ConnectionsChart.vue";
import MemoryChart from "@/components/main/panel/monitor/charts/MemoryChart.vue";
import ByteChart from "@/components/main/panel/monitor/charts/ByteChart.vue";
import MessagesChart from "@/components/main/panel/monitor/charts/MessagesChart.vue";
import moment from "moment";

export default {
  name: "MonitorDashboard",
  components: {
    ConnectionsChart,
    MemoryChart,
    ByteChart,
    MessagesChart
  },
  data() {
    return {
      connectionId:'',
      api: new Api('http', '110.41.3.32:8222'),
      timer: null,
      interval: 5 * 1000,
      version: null,
      uptime: null,
      status: null,
      serverName: null,
      port: null,
      connections: null,
      totalConnections: null,
      memory: null,
      inByte:null,
      outByte:null,
      inMsg: null,
      outMsg:null,
      connectionChartData: {
        time: [],
        count: []
      },
      memoryChartData: {
        time: [],
        total: []
      },
      byteChartData: {
        inByte: [],
        outByte: [],
        time:[],
      },
      messageChartData: {
        inMsg:[],
        outMsg:[],
        time:[]
      }
    }
  },
  methods: {
    getCurrentTime() {
      return moment().format('HH:mm:ss');
    },
    async freshData() {
      let result = await this.api.queryHealthProbe();
      this.status = result.status;
      result = await this.api.queryGeneral();
      this.version = result.version;
      this.uptime = result.uptime;
      this.serverName = result.server_name;
      this.port = result.port;
      this.connections = result.connections;
      this.totalConnections = result.total_connections;
      this.memory = result.mem / (1024);
      this.inByte = result.in_bytes;
      this.outByte = result.out_bytes;
      this.inMsg = result.in_msgs;
      this.outMsg = result.out_msgs;
      this.$nextTick(()=>{
        this.freshConnectionChart();
        this.freshMemoryChart();
        this.freshByteChart();
        this.freshMessageChart();
      })
    },
    async initData() {
      this.destroyTimer();
      setTimeout(async ()=>{
        await this.freshData();
      } , 500)
      this.timer = setInterval(async () => {
        await this.freshData();
      }, this.interval);
    },
    freshConnectionChart() {
      this.connectionChartData.time.push(this.getCurrentTime());
      this.connectionChartData.count.push(this.connections);
      if (this.connectionChartData.time > 360) {
        this.connectionChartData.time.shift();
        this.connectionChartData.count.shift();
      }
      this.$refs.connectionsChart.freshChartData(this.connectionChartData.time, this.connectionChartData.count);
    },
    freshMemoryChart(){
      this.memoryChartData.time.push(this.getCurrentTime());
      this.memoryChartData.total.push(this.memory);
      if (this.memoryChartData.time > 360) {
        this.memoryChartData.time.shift();
        this.memoryChartData.total.shift();
      }
      this.$refs.memoryChart.freshChartData(this.memoryChartData.time, this.memoryChartData.total);
    },
    freshByteChart(){
      this.byteChartData.time.push(this.getCurrentTime());
      this.byteChartData.inByte.push(this.inByte);
      this.byteChartData.outByte.push(this.outByte);
      if (this.byteChartData.time > 360) {
        this.byteChartData.time.shift();
        this.byteChartData.inByte.shift();
        this.byteChartData.outByte.shift();
      }
      this.$refs.byteChart.freshChartData(this.byteChartData.time, this.byteChartData.inByte , this.byteChartData.outByte);
    },
    freshMessageChart(){
      this.messageChartData.time.push(this.getCurrentTime());
      this.messageChartData.inMsg.push(this.inMsg);
      this.messageChartData.outMsg.push(this.outMsg);
      if (this.messageChartData.time > 360) {
        this.messageChartData.time.shift();
        this.messageChartData.inMsg.shift();
        this.messageChartData.outMsg.shift();
      }
      this.$refs.msgChart.freshChartData(this.messageChartData.time, this.messageChartData.inMsg , this.messageChartData.outMsg);
    },
    destroyTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    switchConnection(connection) {
      if (connection.id !== this.connectionId){
        this.api = new Api('http', `${connection.monitorHost}:${connection.monitorPort}`)
        this.initData();
        this.connectionId = connection.id;
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {
    this.destroyTimer();
  }
}
</script>

<style scoped>
.monitor-dashboard-wrap {
  background-color: #f1f3f1;
  width: calc(100% - 10px);
  height: calc(100% - 75px);
  border-radius: 10px;
  padding: 5px;
}

.monitor-dashboard-left {
  width: 12%;
  height: 100%;
}

.monitor-dashboard-wrap > div {
  float: left;
}

.monitor-dashboard-module {
  width: calc(100% - 6px);
  height: calc(12% - 6px);
  padding: 3px;
  border-radius: 10px;
  background-color: #fdfdfd;
  margin-bottom: 5px;
}


.monitor-left-title {
  width: 100%;
  height: 25%;
  border-bottom: 1px solid #f1f3f1;
  background-color: burlywood;
  color: white;
  text-align: center;
  align-items: center;
  font-size: 13px;
  margin: auto;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: center;
}

.monitor-left-content {
  width: 100%;
  height: calc(75% - 5px);
  margin-top: 1px;
  background-color: #0d6e5b;
  border-radius: 0 0 10px 10px;
  font-size: 20px;
  color: #f1f3f1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.monitor-dashboard-right {
  width: calc(88% - 10px);
  height: 100%;
  margin-left: 10px;
  border-radius: 10px;
}

.monitor-dashboard-dynamic {
  float: left;
  width: calc(50% - 10px);
  height: calc(50% - 10px);
  padding: 5px;
  border-radius: 10px;
}
</style>