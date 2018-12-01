<template>
  <el-container class="layout-body">
    <el-header>
      <wheader></wheader>
    </el-header>
    <el-container class="container-body">
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
  import Wheader from 'components/Wheader';
  import Wmenu from 'components/Wmenu';
  import Wrouter from 'components/Router';
  import 'common/css/reset.css';
  export default {
    name: 'Layout',
    components:{ Wheader,Wmenu,Wrouter},
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.el-header{
  padding:0;
  border-bottom:1px solid #CCC;
}
</style>
