<template>
    <div class="home">
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: ""
    }
</script>

<style scoped>
  .home{
    width:100%;
    overflow-y: auto;
  }
/*  .home{
    position: absolute;
    top: 0;
    left:160px;
    bottom:0;
    right:0;
    transition: all .5s ease;
    width:calc(100% - 210px);
  }*/
</style>
