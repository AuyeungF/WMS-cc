import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/print'
    },
    {
      path: '/home',
      name:"home",
      menuName:"出库",
      menuShow:true,
      hasChild:true,
      component: resolve => require(['components/Home.vue'], resolve),
      children:[
        {
          path: '/print',
          name:"print",
          menuName:"出库主表",
          component: resolve => require(['components/Outbound/print.vue'], resolve)
        },
        {
          path: '/verify',
          name:"verify",
          menuName:"出库从表",
          component: resolve => require(['components/Outbound/verify.vue'], resolve)
        },
        {
          path: '/historyPrint',
          name:"historyPrint",
          menuName:"出库从表",
          component: resolve => require(['components/Outbound/historyPrint.vue'], resolve)
        },
        {
          path: '/historyVerify',
          name:"historyVerify",
          menuName:"出库从表",
          component: resolve => require(['components/Outbound/historyVerify.vue'], resolve)
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
