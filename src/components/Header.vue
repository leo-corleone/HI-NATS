<template>
 <div class="header-warp">
    <div class="header-warp-outer">
      <div class="header-warp-logo">
        <img src="../assets/logo.png">
      </div>
      <div class="header-warp-title">HI-NATS</div>
    </div>
 </div>
</template>

<script>
export default {
  name: "Header",
  mounted() {
    this.$bus.$on('click' , (result)=>{
      console.log(result)
    })
  }
}
</script>

<style scoped>
  .header-warp{
    border-bottom: #d7d3d3 1px solid;
    height: 5%;
    box-shadow: 0 3px 2px -2px  #d7d3d3;
  }

  .header-warp-outer{
     position: relative;
     top: 15%;
  }

  .header-warp div{
    float: left;
    margin: 0 10px;
  }
  /*.header-warp-logo{*/
  /*  background-color: red;*/
  /*}*/

  .header-warp-logo img{
    height: 25px;
  }
  .header-warp-title{
    color: black;
    font-family: "Times New Roman";
    font-weight: bold;
    line-height: 25px;
    height: 25px;
  }
</style>