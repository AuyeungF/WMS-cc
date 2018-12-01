<template>
    <div class="router-container" :class=" flag ? 'is-active' : ''">
      <div class="menu-box">
        <el-menu router
                 :default-active="routerName"
                 :default-openeds="openList"
                 background-color="#f2f2f2"
                 text-color="#333"
                 active-text-color="#00c1de">
          <template  v-for="(item,index) in  routerList" v-if="item.menuShow">
            　　 <el-submenu :index="item.path"  v-if="item.hasChild">
            <template slot="title">{{item.menuName}}</template>
            <template v-for="(itemChildren,index) in item.children">
              <el-submenu :index="itemChildren.path" v-if="itemChildren.hasChild">
                <template slot="title">{{itemChildren.menuName}}</template>
                <el-menu-item v-for="(itemChilds,index) in itemChildren.childs" :index="itemChilds.path" :key="index">
                  {{itemChilds.menuName}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="itemChildren.path" :key="index">
                {{itemChildren.menuName}}
              </el-menu-item>
            </template>
          </el-submenu>
            <el-menu-item :index="item.path" v-else>
              {{item.menuName}}
            </el-menu-item>
          </template>
        </el-menu>
        <div class="menu-show">
          <div class="menu-btn" @click="moveTo">
            <i :class="flag ? 'el-icon-arrow-right':'el-icon-arrow-left'"></i>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "routers",
      data(){
          return {
            //全部展开
            openList:[],
            //获取当前页面的路径
            routerName:"",
            routerList:[],
            flag:false,
          }
      },
      watch:{
        $route(to,from){
          this.routerName = this.$route.path;
        }
      },
      mounted(){
        this.routerList = this.$router.options.routes;
      },
      methods:{
        moveTo(){
          this.flag = !this.flag
        }
      }
    }
</script>

<style scoped>
.router-container{
  position: absolute;
  top: 0;
  left:0;
  bottom:0;
  width:160px;
  background: #f2f2f2;
  transition: all .5s ease;
}
.router-container ul {
  width:100%;
  border:none;
}
.menu-show{
  position: relative;
}
.menu-btn{
  background: #FFF;
  position: absolute;
  top: 0;
  right:0;
  font-size:25px;
  display: inline-block;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.router-container.is-active{
    left:-160px;
    transition: all .5s ease;
    z-index:3;
  }
.router-container.is-active .menu-btn{
  right: -25px;
  background: #CCC;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
