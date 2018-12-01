import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex);

export default new vuex.Store({
  state:{
    show:true,
    printShow:false,
    isVerify:false,
    dept:"",
    clothNo:"",
    historyId:"",
    inShow:false
  }
})