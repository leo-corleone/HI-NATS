<template>
  <div class="monitor-connection-chart-wrap" id="connection-chart">
    connections
  </div>
</template>

<script>
export default {
  name: "ConnectionsChart",
  props:['time' , 'count'],
  data(){
    return {
      title: 'Connections',
    }
  },
  methods:{
    initCharts(){
      const chart = this.$echarts.init(document.getElementById("connection-chart"));
      chart.setOption({
        title: {
          text: this.title,
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.time
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.count,
            type: 'line',
            smooth: true
          }
        ]
      });
    },
  },
  mounted() {
    this.initCharts();
  }
}
</script>

<style scoped>
 .monitor-connection-chart-wrap{
   width: 100%;
   height: 100%;
   background-color: white;
   border-radius: 10px;
 }
</style>