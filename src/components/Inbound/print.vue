<template>
 <div class="inbound">
   <div class="container">
       <div class="container-search clearfix top10">
         <div class="search-left">
           <isearch class="bottom10"
                    :name="typeName"
                    :flag="inFlag"
                    @checkIn="checkIn">
           </isearch>
         </div>
         <div class="search-center">
           <div class="search">
             <div class="demo-input-suffix">
               {{vatName}}:
               <el-input v-model="vatInput" placeholder="请输入单号"></el-input>
               <el-button type="green" icon="el-icon-search" @click='vatIn' :disabled="vatFlag">搜索</el-button>
             </div>
           </div>
           <el-button type="primary" @click="ckeckList" class="checkIn" >入库信息</el-button>
         </div>
         <div class="search-right">
           <el-button type="primary" @click="historyPrint">打印历史记录</el-button>
           <!--<el-button type="primary" @click="historyVerify">校验历史记录</el-button>-->
         </div>
       </div>
       <div class="container-table">
         <itable  :tableData="tableData"
                  :colunms="colunms"
                  :option="option"
                  :Pagination="Pagination"
                  :operations="operations"
                  :mutiSelect="selectShow"
                  v-on:selectedList="selectedList"
         >
         </itable>
         <div class="in_btn btn-show top10">
           <el-button type="primary" @click="printing" class="btn-print">打印标签</el-button>
           <el-button type="warning" @click="checkOut" class="btn-check">校验布匹</el-button>
         </div>
       </div>
       <!--查看主入库信息-->
       <in-dialog :form="form"></in-dialog>
       <!--入库单号-->
        <vatin :inData="inList" @vatCheck="vatCheck"></vatin>
       <!--确认打印-->
       <p-dialog :form="form" :arrList="arrList" :list="list"></p-dialog>
     </div>
 </div>
</template>

<script>
  import isearch from '../isearch.vue';
  import itable from '../itable.vue';
  import wheader from '../Wheader.vue';
  import inDialog from './in_dialog.vue';
  import vatin  from './vat_in.vue';
  import pDialog from './print_dialog.vue';
  import {inbound,incheck,vatAll,vatInNo} from '../../common/js/axios/getData';
  import 'common/css/reset.css';
  export default {
    name: 'Layout',
    components:{
      isearch,
      itable,
      wheader,
      inDialog,
      pDialog,
      vatin
    },
    data () {
      return {
        selectShow:true,
        isShow:true,
        typeName:"入库单号",
        vatName:"缸号",
        tableData: [],
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
            prop:"weight_s",
            label:"库存重量",
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
        flag:false,
        form:{},
        arrList:[],
        list:[],
        vatInput:"",
        inFlag:false,
        vatFlag:false,
        inList:[],
      }
    },
    mounted(){
      let str = window.location.hash.split('=')[1];
      this.$store.state.historyId = str;
    },
    methods:{
      checkIn(data){
        this.inFlag=true;
        incheck(data).then(res=>{
          this.$store.state.clothNo = data;
          let str = JSON.parse(JSON.parse(res.data));
          if(str.hasOwnProperty("message")) {
            this.tableData = [];
            this.$message({
              message: str.message,
              type: 'warning'
            });
          } else {
            this.tableData = str.productInDList;
            this.$store.state.show = true;
            str.date = new Date(str.in_date);
            this.form = str;
            this.flag = true;
          }
          this.inFlag=false;
        })
          .catch(err=>{
          console.log(err)
          this.inFlag=false;
        })
      },
      vatIn() {
        let data =  encodeURIComponent(this.vatInput);
        this.vatFlag=true;
        vatAll(data)
          .then(res=>{

            if(res.code == 1){
              this.inList = res.data;
              this.$store.state.inShow = true;
            } else if(res.code == 0) {
              this.$message({
                message: res.message,
                type: 'warning'
              });
            }
            /*this.$store.state.clothNo = data;
            let str = JSON.parse(JSON.parse(res.data));
            if(str.productInDList != '') {
              this.tableData = str.productInDList;
            }
            str.date = new Date(str.in_date);
            this.form = str;*/
//            this.$store.state.show = true;
            this.vatFlag=false;
          })
          .catch(err=>{
            console.log(err)
            this.vatFlag=false;
          })
      },
      ckeckList(){
        if(this.flag) {
          this.$store.state.show = true;
        } else {
          this.$message({
            message: '查询入库单号后查看信息',
            type: 'warning'
          });
        }
      },
      printing(){
        if(this.flag) {
          this.$store.state.printShow = true;
        } else {
          this.$message({
            message: '查询入库单号后打印信息',
            type: 'warning'
          });
        }
      },
      checkOut(){
        this.$router.push('/verify')
      },
      selectedList(val){
        this.list = val.arr;
        let obj = this.form;
        let jqArr = [];
        let length = val.arr.length;
        for(var i=0;i<length;i++) {
          let str = {
            clothName:obj.prod_name,
            colorName:obj.color_name,
            colorNo:obj.sel_color,
            clothType:obj.product_no
          };
          str.ticketNo = val.arr[i].fab_roll;
          str.weight = val.arr[i].weight_s;
          str.epc =  val.arr[i].epc;
          str.vatDye = val.arr[i].vat_no;
          jqArr.push(str)
        }
        this.arrList = jqArr;
      },
      historyPrint(){
        this.$router.push('/historyPrint')
      },
      vatCheck(val){
        let list = val.data;
        this.$store.state.show = true;
        list.date = new Date(list.in_date);
        this.form = list;
        this.tableData = list.productInDList;
        this.flag = true;
      }
    },
  }
</script>

<style>
  .search-center {
    float: left;
  }
</style>
