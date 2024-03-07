<template>
  <div class="monitor-byte-chart-wrap" id="byte-chart">
    byte
  </div>
</template>

<script>
export default {
  name: "ByteChart",
  data(){
    return {
      inBytes:[],
      outBytes:[],
      time:[],
      title: 'Byte',
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
          data: ['InByte', 'OutByte']
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
            name: 'InByte',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.inBytes
          },
          {
            name: 'OutByte',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.outBytes
          }
        ]
      });
    },
    freshChartData(time , inBytes , outBytes){
      this.time = time;
      this.inBytes = inBytes;
      this.outBytes = outBytes;
      this.initCharts();
    }
  },
  mounted() {
    this.chart = this.$echarts.init(document.getElementById("byte-chart"));
    this.initCharts();
  }
}
</script>

<style scoped>
 .monitor-byte-chart-wrap{
   width: 100%;
   height: 100%;
   background-color: white;
   border-radius: 10px;
 }
</style>