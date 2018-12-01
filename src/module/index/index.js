import Vue from 'vue';
import App from './App';
import router from './Router/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import store from '../../common/js/Vuex'
//设置favicon
import logoicon from 'common/img/logo.png';
 // document.getElementById("J_logo").href = 'logoicon';

Vue.prototype.$axios = axios;
Vue.use(ElementUI);

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
