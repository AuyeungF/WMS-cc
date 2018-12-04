import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex);

export default new vuex.Store({
  state:{
    show:false,//入库单信息显示隐藏
    printShow:false,//确认打印信息显示隐藏
    isVerify:false,//校验
    clothNo:"",//入库单
    historyId:"",//sessionId
    inShow:false,//缸号查询后的入库单框显示隐藏
  }
})
