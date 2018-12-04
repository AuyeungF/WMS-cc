import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  made:'hash',
  routes: [
    {
      path: '/',
      redirect: '/print'
    },
    {
      path: '/home',
      name:"home",
      menuName:"入库",
      menuShow:true,
      hasChild:true,
      component: resolve => require(['components/Home.vue'], resolve),
      children:[
        {
          path: '/print',
          name:"print",
          menuName:"入库打印",
          component: resolve => require(['components/Inbound/print.vue'], resolve)
        },
        {
          path: '/verify',
          name:"verify",
          menuName:"入库校验",
          component: resolve => require(['components/Inbound/verify.vue'], resolve)
        },
        {
          path: '/historyPrint',
          name:"historyPrint",
          menuName:"入库打印历史记录",
          component: resolve => require(['components/Inbound/historyPrint.vue'], resolve)
        },
        {
          path: '/historyVerify',
          name:"historyVerify",
          menuName:"入库校验历史记录",
          component: resolve => require(['components/Inbound/historyVerify.vue'], resolve)
        }]
    },
    {
      path: '/404',
      menuShow:true,
      menuName:"404",
      component: resolve => require(['components/404.vue'], resolve)
    },
    {
      path: '/403',
      menuShow:true,
      menuName:"403",
      component: resolve => require(['components/403.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
