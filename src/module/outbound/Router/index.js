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
      menuName:"出库",
      menuShow:true,
      hasChild:true,
      component: resolve => require(['components/Home.vue'], resolve),
      children:[
        {
          path: '/verify',
          name:"verify",
          menuName:"出库校验",
          component: resolve => require(['components/Outbound/verify.vue'], resolve)
        },
        {
          path: '/historyVerify',
          name:"historyVerify",
          menuName:"出库校验历史纪录",
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
