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
        <ConnectionsChart :time="connection.time" :count="connection.count" />
      </div>
      <div class="monitor-dashboard-dynamic">
        <MemoryChart/>
      </div>
      <div class="monitor-dashboard-dynamic">
        <ByteChart/>
      </div>
      <div class="monitor-dashboard-dynamic">
        <MessagesChart/>
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
  components:{
    ConnectionsChart,
    MemoryChart,
    ByteChart,
    MessagesChart
  },
  data() {
    return {
      api: new Api('http', '110.41.3.32:8222'),
      version: null,
      uptime: null,
      status: null,
      serverName: null,
      port: null,
      connections: null,
      totalConnections: null,
      connection:{
        time:[],
        count:[]
      }
    }
  },
  methods:{
    getCurrentTime() {
      return moment().format('HH:mm:ss');
    }
  },
  mounted() {
    setInterval(async () => {
      let result = await this.api.queryHealthProbe();
      this.status = result.status;
      result = await this.api.queryGeneral();
      this.version = result.version;
      this.uptime = result.uptime;
      this.serverName = result.server_name;
      this.port = result.port;
      this.connections = result.connections;
      this.totalConnections = result.total_connections;
    }, 1000);
    console.log(this);
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

.monitor-dashboard-right{
  width: calc(88% - 10px);
  height: 100%;
  margin-left: 10px;
  border-radius: 10px;
}

.monitor-dashboard-dynamic{
  float: left;
  width: calc(50% - 10px);
  height: calc(50% - 10px);
  padding: 5px;
  border-radius: 10px;
}
</style>