<template>
  <div class="monitor-memory-chart-wrap" id="memory-chart">
  </div>
</template>

<script>
export default {
  name: "MemoryChart",
  data(){
    return {
      time:[],
      total:[],
      title: 'Memory (KB)',
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
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
            data: this.total,
            type: 'line',
          }
        ]
      });
    },
    freshChartData(time , total){
      this.time = time;
      this.total = total;
      this.initCharts();
    }
  },
  mounted() {
    this.chart = this.$echarts.init(document.getElementById("memory-chart"));
    this.initCharts();
  }
}
</script>

<style scoped>
 .monitor-memory-chart-wrap{
   width: 100%;
   height: 100%;
   background-color: white;
   border-radius: 10px;
 }
</style>