<template>
  <div class="verify">
    <div class="container">
      <div class="container-search clearfix top10">
        <div class="search-left">
          <isearch class="bottom10"
                   :name="typeName"
                   :flag="outFlag"
                   @checkIn="checkIn">
          </isearch>
        </div>
        <div class="search-center">
          <div class="search">
            <div class="demo-input-suffix">
              {{vatName}}:
              <el-input v-model="vatInput" placeholder="请输入缸号"></el-input>
              <el-button type="green" icon="el-icon-search" @click='vatOut' :disabled="vatFlag">搜索</el-button>
            </div>
          </div>
          <el-button type="primary" @click="ckeckList" class="checkIn" >出库信息</el-button>
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
    <!--查看校验信息-->
    <out-dialog :form="form"
                :tableData="verifyData"
                :colunms="col"
                :selectShow="verifyShow"
                :page="page"
                :index="index"
                :operations="operation">
    </out-dialog>
    <!--缸号查询后的出库单-->
    <vatout :verifyData="verifyData" :vatNo="vatNo" @vatCheck="vatCheck" @cancelShow="cancelShow"></vatout>
  </div>
</template>

<script>
  import isearch from '../isearch.vue';
  import itable from '../itable.vue';
  import wheader from '../Wheader.vue';
  import outDialog from './out_dialog.vue';
  import vatout from './vat_out.vue';
  import {openVerify,closeCheck,outCheck,postVerify,outVerify} from '../../common/js/axios/getData';
  export default {
    name: "outVerify",
    data(){
      return {
        selectShow:false, /*是否显示多选框*/
        tableData: [],    /*数据源*/
        typeName:"校验单号",
        vatName:"缸号",
        colunms:[
          {
            prop:"product_no",
            label:"布号",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"sel_color",
            label:"销售色号",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"color_name",
            label:"颜色",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"prod_name",
            label:"布种名称",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"vat_no",
            label:"缸号",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"fab_roll",
            label:"布票号",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"weight_out",
            label:"出库重量",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"exception",
            label:"异常单号",
            width:'',
            align:"center",
            sortable:false
          }
        ],    /*表头*/
        option: {
          index: true, //序号
          loading: false, // 表格loading加载动画控制
        },  /*table 序号的参数*/
        Pagination:{
          pageShow:false,/*是否显示分页*/
          currentPage:0,/*当前第几页*/
          total:0,/*总共多小条*/
        },/*分页配置*/
        operations:{
          btnShow:false,/*显示操作按钮*/
        },
        user:"admin",   /*MQ账号*/
        pass:"admin",   /*MQ密码*/
        topic:"event/validate", /*订阅主题*/
        isPost:false,     /*控制提交按钮*/
        vatFlag:false,    /*控制缸号按钮*/
        flag:false,       /*控制查看信息按钮*/
        form:{
        },
        /*主表数据信息*/
        verifyShow:false,
        verifyData:[],
        col:[
          {
            prop:"product_no",
            label:"布号",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"sel_color",
            label:"色号",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"color_name",
            label:"颜色",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"yard_out",
            label:"米长",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"l_price",
            label:"单价(米)",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"qty_kg",
            label:"重量",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"p_ps",
            label:"条数",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"f_price",
            label:"单价",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"vat_no",
            label:"缸号",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"weight_kj",
            label:"空加",
            width:"",
            align:"center",
            sortable:false
          },
          {
            prop:"weight_zg",
            label:"纸管",
            width:"",
            align:"center",
            sortable:false
          }
        ],
        page:{
          pageShow:false,/*是否显示分页*/
          currentPage:0,/*当前第几页*/
          total:0,/*总共多小条*/
        },
        index: {
          index: true, //序号
          loading: false, // 表格loading加载动画控制
        },
        operation:{
          btnShow:false,/*显示操作按钮*/
        },
        outFlag:false,   /*控制查询出库按钮*/
        vatInput:"",     /*缸号*/
        vatNo:"",       /*传入缸号*/
      }
    },
    created(){
      this.client=new Messaging.Client("localhost",61614,"myclientid_" + parseInt(Math.random() * 100, 10));
    },
    components:{
      itable,
      wheader,
      isearch,
      outDialog,
      vatout
    },
    mounted(){
      this.client.onConnectionLost = this.onConnectionLost;//注册连接断开处理事件
      this.client.onMessageArrived = this.onMessageArrived;//注册消息接收处理事件
      let str = window.location.hash.split('=')[1];
      this.$store.state.historyId = str;
    },
    methods:{
      /*  校验出库单 */
      checkIn(val){
        //出库单号禁止
        this.outFlag = true;
        //开始校验
        this. starCheck();
        outCheck(val).then(res=>{
          let data = JSON.parse(res.data);
          this.form = data;
          this.verifyData = data.productoutPList;
          this.tableData = data.productoutDList;
          //显示出库单的信息
          this.$store.state.show = true;
          //提交信息按钮
          this.isPost = true;
          //查看出库信息按钮
          this.flag = true;
          //恢复校验单号的按钮
          this.outFlag = false;
        }).catch(err=>{
          //恢复校验单号的按钮
          this.outFlag = false;

          this.$message({
            message:err.data,
            type: 'danger'
          })
        })
      },
      /*  提交校验后的结果  */
      checkVerify(){
        //提交数据
        if(this.isPost){
          let data=this.$store.state.historyId;
          this.isPost = false;
          //停止校验
          this.stopCheck();
          postVerify(data).then(res=>{
            this.$message({
              message:'保存成功',
              type: 'success'
            })
          }).catch(err=>{
            this.$message({
              message:err.data,
              type: 'danger'
            })
          })
        } else {
          this.$message({
            message: '校验完才能提交',
            type: 'warning'
          });
        }
      },
      /*  跳转到历史校验页面 */
      historyVerify(){
        this.$router.push('/historyVerify')
      },
      /*  显示出库单信息 */
      ckeckList(){
        if(this.flag) {
          //显示出库信息
          this.$store.state.show = true;
        } else {
          this.$message({
            message: '查询入库单号后查看信息',
            type: 'warning'
          });
        }
      },
      /*  缸号查询入库单 */
      vatOut(){
        //缸号按钮控制
        this.vatFlag = true;
        //查看出库信息
        this.flag = true;
        //缸号信息(特殊符号的处理)
        this.vatNo = encodeURIComponent(this.vatInput);
        //缸号查询
        outVerify(this.vatNo).then(res=>{
          //出库单号
          this.verifyData = res.data;
          //显示出库单号下拉
          this.$store.state.inShow = true;
        }).catch(err=>{
          this.$message({
            message: err.message,
            type: 'warning'
          });
        })
      },
      /*  提交下拉选择出库单号的数据返回 */
      vatCheck(val){
        this.form = val;
        this.verifyData = val.productoutPList;
        this.tableData = val.productoutDList;
        //出库信息显示
        this.$store.state.show = true;
        //恢复缸号搜索按钮
        this.vatFlag = false;
        //可提交
        this.isPost = true;
        //可查询出库信息
        this.flag = true;
        //开始校验
        this. starCheck();
      },
      onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log("onConnectionLost:"+responseObject.errorMessage);
          console.log("连接已断开");
        }
      },
      onMessageArrived(message) {
        let res = JSON.parse(message.payloadString);
        console.log(res)
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
      starCheck(){
        openVerify().then(res=>{
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
          this.isPost = true;
          this.disconnect();
        }).catch(err=>{
          console.log(err)
        })
      },
      /*  清除表格信息  */
      clearData(){
        this.tableData = [];
      },
      /*  恢复缸号搜索按钮  */
      cancelShow(val){
        this.vatFlag = val;
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
  .search-center{
    float: left;
  }
</style>

