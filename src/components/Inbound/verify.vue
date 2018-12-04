<template>
   <div class="verify">
     <div class="container">
       <div class="container-search clearfix top10">
         <div class="search-left">
           <isearch class="bottom10"
                    :name="typeName"
                    :flag="inFlag"
                    @checkIn="checkIn">
           </isearch>
         </div>
         <div class="search-right">
           <div class="btn-show">
             <el-button type="primary" @click="historyVerify">校验历史记录</el-button>
             <el-button type="warning" @click="clearData">清空信息</el-button>
           </div>
         </div>
       </div>
        <itable :tableData="tableData"
                :colunms="colunms"
                :option="option"
                :Pagination="Pagination"
                :operations="operations"
                :mutiSelect="selectShow"
                ref="table">
        </itable>
     </div>
     <div class="btn-verify top10">
       <el-button type="primary" @click="checkVerify">提交</el-button>
     </div>
   </div>
</template>

<script>
  import isearch from '../isearch.vue';
  import itable from '../itable.vue';
  import wheader from '../Wheader.vue';
  import {checkVerify,addList,openCheck,closeCheck,postList} from '../../common/js/axios/getData'
  export default {
      name: "Inbound",
      data(){
          return {
            selectShow:false,
            tableData: [],
            typeName:"校验单号",
            colunms:[
              {
                prop:"fab_roll",
                label:"布票号",
                width:"",
                align:"center",
                sortable:false
              },
              {
                prop:"weight_in",
                label:"入库重量",
                width:"",
                align:"center",
                sortable:false
              },
              {
                prop:"exception",
                label:"异常单号",
                width:"",
                align:"center",
                sortable:false
              }
            ],
            option: {
              index: true, //序号
              loading: false, // 表格loading加载动画控制
            }, // table 序号的参数
            Pagination:{
              pageShow:false,/*是否显示分页*/
              currentPage:0,/*当前第几页*/
              total:0,/*总共多小条*/
            },/*分页配置*/
            operations:{
              btnShow:false,/*显示操作按钮*/
            },
            user:"admin",
            pass:"admin",
            topic:"event/validate",
            isPost:false,
            inFlag:false
          }
        },
      created(){
          this.client=new Messaging.Client("localhost",61614,"myclientid_" + parseInt(Math.random() * 100, 10));
      },
      components:{
          itable,
          wheader,
          isearch,
      },
      mounted(){
        this.client.onConnectionLost = this.onConnectionLost;//注册连接断开处理事件
        this.client.onMessageArrived = this.onMessageArrived;//注册消息接收处理事件
        let str = window.location.hash.split('=')[1];
        this.$store.state.historyId = str;
      },
      methods:{
        /*  校验入库单 */
        checkIn(val){
          this.inFlag = true;
          checkVerify(val).then(res=>{
            //返回的数据
            this.tableData = res;
            //是否能提交数据
            this.isPost = true;
            //恢复搜索按钮
            this.inFlag = false;
            //开始校验
            this.starCheck();
          }).catch(err=>{
            //恢复搜索按钮
            this.inFlag = false;
            this.$message({
              message: err.data,
              type: 'warning'
            });
          })
        },
        /*  提交数据接口  */
        checkVerify(){
          //关闭校验
         this.stopCheck();
          //提交数据
          if(this.isPost){
            let data=this.$store.state.historyId;
            postList(data).then(res=>{
              //取消提交状态
              this.isPost = false;
              this.$message({
                message:res,
                type: 'success'
              })
            }).catch(err=>{
              this.$message({
              message:err.data,
                type: 'waring'
              })
            })
          } else {
            this.$message({
              message: '校验完才能提交',
              type: 'warning'
            });
          }
        },
        /*  跳转到历史校验页面*/
        historyVerify(){
          this.$router.push('/historyVerify')
        },
        starCheck(){
          openCheck().then(res=>{
            //开始校验
            this.client.connect({
              userName:this.user,
              password:this.pass,
              onSuccess:this.onConnect
            });//连接服务器并注册连接成功处理事件
          }).catch(err=>{
            console.log(err)
          })
        },
        stopCheck(){
          closeCheck().then(res=>{
            //停止校验
            this.disconnect();
          }).catch(err=>{
            console.log(err)
          })
        },
        onConnectionLost(responseObject) {
          if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:"+responseObject.errorMessage);
            console.log("连接已断开");
          }
        },
        onMessageArrived(message) {
          let res = JSON.parse(message.payloadString);
          console.log(res);
          this.tableData = [];
          this.tableData = res;

        },
        onConnect() {
          console.log('连接成功');
          this.client.subscribe(this.topic);//订阅主题
        },
        disconnect(){
          this.client.disconnect();
        },
        clearData(){
          this.tableData = [];
        }
      }
    }
</script>

<style>
  .btn-verify{
    text-align: right;
    margin-right:20px;
  }
  .search-left{
    float: left;
    margin-left:20px;
  }
  .container-search{
    width:100%;
  }
  .search-right{
    float: right;
    margin-right:20px;
  }
</style>

