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
  name: "Header"
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
     top: 10px;
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
    font-family: "华文仿宋";
    font-weight: bold;
    line-height: 25px;
    height: 25px;
  }
</style>