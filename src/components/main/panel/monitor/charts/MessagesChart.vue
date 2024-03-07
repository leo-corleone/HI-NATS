<template>
  <div class="monitor-message-chart-wrap" id="msg-chart">
    message
  </div>
</template>

<script>
export default {
  name: "MessageChart",
  data(){
    return {
      inMsg:[],
      outMsg:[],
      time:[],
      title: 'Message',
      chart: null,
    }
  },
  methods:{
    initCharts(){
      this.chart.setOption({
        title: {
          text: ''
        },
        legend: {
          data: ['InMsg', 'OutMsg']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
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
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.time
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'InMsg',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.inMsg
          },
          {
            name: 'OutMsg',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.outMsg
          }
        ]
      });
    },
    freshChartData(time , inMsg , outMsg){
      this.time = time;
      this.inMsg = inMsg;
      this.outMsg = outMsg;
      this.initCharts();
    }
  },
  mounted() {
    this.chart = this.$echarts.init(document.getElementById("msg-chart"));
    this.initCharts();
  }
}
</script>

<style scoped>
.monitor-message-chart-wrap{
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
}
</style>