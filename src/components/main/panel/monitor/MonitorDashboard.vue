<template>
  <div class="monitor-dashboard-wrap">
    <div class="monitor-dashboard-version">
      <div class="monitor-title">
        Version
      </div>
      <div class="monitor-content">{{ version }}</div>
    </div>
    <div class="monitor-dashboard-uptime">
      <div class="monitor-title">
        Uptime
      </div>
      <div class="monitor-content">{{ uptime }}</div>
    </div>
    <div class="monitor-dashboard-status">
      <div class="monitor-title">
        Status
      </div>
      <div class="monitor-content">{{ status }}</div>
    </div>
    <div class="monitor-dashboard-server">
      <div class="monitor-title">
        Server Name
      </div>
      <div class="monitor-content">{{ serverName }}</div>
    </div>
  </div>
</template>

<script>
import {Api} from "@/utils/Api";

export default {
  name: "MonitorDashboard",
  data() {
    return {
      api: new Api('http', '110.41.3.32:8222'),
      version: null,
      uptime: null,
      status: null,
      serverName: null,
    }
  },
  mounted() {
    setInterval(async ()=>{
      let result = await this.api.queryHealthProbe();
      this.status = result.status;
      result = await this.api.queryGeneral();
      this.version = result.version;
      this.uptime = result.uptime;
      this.serverName = result.server_name;
    }, 5000);
    console.log(this);
  }
}
</script>

<style scoped>
.monitor-dashboard-wrap {
  background-color: #f1f3f1;
  width: calc(11% - 10px);
  height: calc(100% - 75px);
  border-radius: 10px;
  padding: 5px;
}

.monitor-dashboard-wrap > div {
  float: left;
}

.monitor-dashboard-version,
.monitor-dashboard-uptime,
.monitor-dashboard-status,
.monitor-dashboard-server {
  width: 100%;
  height: 12%;
  padding: 3px;
  border-radius: 10px;
  background-color: #fdfdfd;
  margin-left: 5px;
  margin-bottom: 10px;
}

.monitor-dashboard-version {
  margin-left: 0;
}

.monitor-title {
  width: 100%;
  height: 25%;
  border-bottom: 1px solid #f1f3f1;
  background-color: burlywood;
  color: white;
  text-align: center;
  align-items: center;
  margin: auto;
  border-radius: 10px;
}

.monitor-content {
  width: 100%;
  height: calc(75% - 5px);
  margin-top: 5px;
  text-align: center;
  align-items: center;
  background-color: #0d6e5b;
  border-radius: 10px;
  font-size: 20px;
  color: #f1f3f1;
}
</style>