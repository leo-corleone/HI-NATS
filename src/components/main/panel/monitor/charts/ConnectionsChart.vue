<template>
  <div class="monitor-connection-chart-wrap" id="connection-chart">
  </div>
</template>

<script>
export default {
  name: "ConnectionsChart",
  data(){
    return {
      time:[],
      count:[],
      title: 'Connections',
      chart: null,
    }
  },
  methods:{
    initCharts(){
      this.chart.setOption({
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
    freshChartData(time , count){
      this.time = time;
      this.count = count;
      this.initCharts();
    }
  },
  mounted() {
    this.chart = this.$echarts.init(document.getElementById("connection-chart"));
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