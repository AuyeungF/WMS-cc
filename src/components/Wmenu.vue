<template>
    <div class="menu-body">
      <ul class="menu-container">
        <li
          v-for="(val,index) in menuList"
          :key="index" class="menu-list"
          :class="index == num ? 'active' : ''"
          v-if="val.isShow || val.defaultShow == true">
          <span>
            <template v-if="index == num">
              <img :src="val.img1"alt="">
            </template>
            <template v-else="index == !num">
              <img :src="val.img"alt="">
            </template>
          </span>
            <a :href="val.link">{{val.name}} {{transition}}</a>
        </li>
      </ul>
    </div>
</template>
<script>
  import 'common/css/reset.css';
  import store from '../common/js/Vuex'
    export default {
        name: "Wmenu",
      data(){
          return{
            menuList:[
              {
                link:"index.html",
                img: require('../common/img/report-default.png'),
                img1: require('../common/img/report-selected.png'),
                name:"报表",
                defaultShow:true,
                isShow:false
              },
              {
                link:"inbound.html",
                img: require('../common/img/inbound-default.png'),
                img1: require('../common/img/inbound-selected.png'),
                name:"入库管理",
                isShow:true
              },
              {
                link:"outbound.html",
                img: require('../common/img/outbound-default.png'),
                img1: require('../common/img/outbound-selected.png'),
                name:"出库管理",
                isShow:true
              },
              {
                link:"login.html",
                img: require('../common/img/inventory-default.png'),
                img1: require('../common/img/inventory-selected.png'),
                name:"登录",
                isShow:true
              }
            ],
            num:0,
          }
      },

      mounted(){
        this.autoChange()
    },
  computed:{

  },
  methods:{
        autoChange(){
          let url = window.location.pathname;
          switch (url) {
            case "/module/index.html":
              this.num = 0;
              break;
            case "/module/inbound.html":
              this.num = 1;
              break;
            case "/module/outbound.html":
              this.num = 2;
              break;
          }

        }
      }
    }
</script>

<style scoped>
  .menu-body{
    background: #252a2f;
    width:50px;
    position: absolute;
    top:0px;
    bottom:0px;
    left: 0px;
    z-index:1000;
    overflow: hidden;
    transition: all .2s ease-out 0s;
  }
  .menu-body:hover,.menu-body:hover .menu-container>li{
    width:210px;
  }
  .menu-container{
    padding:0;
  }
  .menu-container>li>a {
    color: #FFF;
    display: inline-block;
    width:105px;
    line-height:40px;
    font-size:14px;
  }
  .menu-container>li>span {
    width: 50px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    position: relative;
  }
  .menu-container>li>div{
    display: inline-block;

  }
  .menu-container>li{
    height:40px;
    overflow: hidden;
  }
  .menu-container>li:hover{
    background: #1b1f23;
  }
  .menu-container>li>span>img{
    width:20px;
    height:20px;
    display: block;
    position: absolute;
    top:25%;
    left:25%;
  }
  .menu-container .active {
    background: #00C1DE !important;
  }
</style>
