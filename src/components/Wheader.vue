<template>
  <div class="header">
      <div class="head-left">
        <div class="header-center"><span>智能仓储管理系统</span></div>
      </div>
      <div class="head-right">
        <div class="header-search">
          <input type="text" class="changeSearch" placeholder="搜索">
          <span class="searchIcon">
            <img class="searchImg" :src="search" @mouseenter="searchIn()" @mouseleave="searchOut()" alt="">
          </span>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    name:"",
    data() {
      return {
        search:require("../common/img/search-default.png"),
        username:"",
        applyNo: 0,
      }
    },
    methods:{
      // 用户名下拉菜单选择事件
      searchIn() {
        this.search = require("../common/img/search-selected.png");

      },
      searchOut() {
        this.search = require("../common/img/search-default.png");
      },
    }
  }
</script>
<style scoped>
  .header {
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    font-size: 22px;
    color: #000;
    background: #252A2F;
    top:0;
    z-index:2000;
  }
  .header .logo{
    width:150px;
    height: 55px;
  }
  .header .logo > img{
    max-width:120px;
    display: block;
    margin:0 auto;
    margin-top:5px;
  }
  .header-center{
    height: 60px;
  }
  .header-center span{
    text-indent: 20px;
    display: block;
    line-height:56px;
    color: #7d7d7d;
  }
  .header-user-con{
    display: flex;
    height: 56px;
    align-items: center;
  }
  .user-avator img{
    display: block;
    width:40px;
    height:40px;
    border-radius: 50%;
  }
  .header-search {
    width:100%;
    height: 60px;
    position: relative;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
  .changeSearch {
    width:100%;
    height: 26px!important;
    background: inherit!important;
    border-radius: inherit;
    position: absolute;
    right: 0;
    padding:4px 12px;
    color: #ccc;
    font-size: 12px;
    transition: 1s;
    -webkit-transition: 1s;
    border: none;
    background: #3F4448!important;
  }
  .searchIcon {
    width: 30px;
    height:20px;
    /*background: #f56c6c;*/
    border-left: 1px solid #5C6063;
    position: absolute;
    right: 0;
    top: 20px;
  }
  .searchImg {
    width: 16px;
    height: 16px;
    display: inline-block;
    background-size: cover;
    position: absolute;
    right: 7px;
    top: 2px;
  }
  .messageImg {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-size: cover;
    margin-top: 20px;
  }
  .Handle a {
    width: 15px;
    height: 15px;
    line-height: 15px;
    border-radius: 100%;
    background: red;
    position: absolute;
    top: 14px;
    right: 25px;
    color: #fff;
    font-size: 12px;
    text-align: center;
  }
  .signImg {
    width: 40px;
    height: 40px;
    display: inline-block;
    background-size: cover;
    margin: 0 auto;
  }
  .takelist {
    width: 100%;
    float: right;
  }
  .takechange {
    width: 30%;
    height: 60px;
    float: right;
    text-align: center;
  }
  .head-left{
    float: left;
  }
  .head-right{
    float: right;
    width:250px;
    margin-right:20px;
  }

</style>
