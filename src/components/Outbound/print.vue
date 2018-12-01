<template>
  <div class="outbound">
    <div class="container">
      <div class="container-search clearfix top10">
        <div class="search-left">
          <isearch class="bottom10"
                   :name="typeName"
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
                 @selectedList="selectedList"
        >
        </itable>
        <div class="in_btn btn-show top10">
          <el-button type="primary" @click="printing" class="btn-print" >打印标签</el-button>
          <el-button type="warning" @click="checkOut" class="btn-check">返回菜单页</el-button>
        </div>
      </div>
      <!--查看主入库信息-->
      <out-dialog :form="form"></out-dialog>
      <!--确认打印-->
      <p-dialog :form="form"
                :arrList="arrList"
                :list="list">
      </p-dialog>

    </div>
  </div>
</template>

<script>
  import isearch from '../isearch.vue';
  import itable from '../itable.vue';
  import wheader from '../Wheader.vue';
  import outDialog from '../Outbound/out_dialog.vue';
  import pDialog from '../Outbound/print_dialog.vue';
  import {outbound} from '../../common/js/axios/getData';
  import 'common/css/reset.css';
  export default {
    name: 'outPrint',
    components:{
      isearch,
      itable,
      wheader,
      outDialog,
      pDialog,
    },
    data () {
      return {
        selectShow:true,
        isShow:true,
        typeName:"出库单号",
        vatName:"缸号",
        tableData: [],
        colunms:[
          {
            prop:"outp_id",
            label:"配货单号",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"prod_name",
            label:"产品名称",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"product_no",
            label:"布号",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"color_name",
            label:"颜色",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"out_no",
            label:"入库单号",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"row",
            label:"序号",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"fab_roll",
            label:"布票号",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"out_qty",
            label:"重量",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"weight_long",
            label:"米长",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"j_man",
            label:"出库人",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"j_date",
            label:"出库时间",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"weight_out",
            label:"出库重量",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"weight_print",
            label:"原始重量",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"vat_no",
            label:"缸号",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"outp_id",
            label:"配货信息编号",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"in_no",
            label:"入库单号",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"out_qty1",
            label:"对入调整",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"out_qty2",
            label:"对内调整",
            width:"120",
            align:"center",
            sortable:false
          },
          {
            prop:"out_qty",
            label:"销售重量",
            width:"120",
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
        form:{},
        flag:false,
        arrList:[],
        list:[]
      }
    },
    mounted(){
      let str = window.location.hash.split('=')[1];
      this.$store.state.historyId = str;
    },
    methods:{
      checkIn(data){
        outbound(data).then(res=>{
         let str = JSON.parse(JSON.parse(res.data));
          this.$store.state.clothNo = data;
          this.tableData = str.productInDList;
          str.date = new Date(str.out_date);
          str.recordDate = new Date(str.record_date);
          str.printDate = new Date(str.print_date);
          str.sq_approveDate = new Date(str.sq_approve_date);
          this.form = str;
          this.flag = true;
          this.$store.state.show = true;
        }).catch(err=>{
          console.log(err)
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
        //返回菜单页
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
          str.weight = val.arr[i].weight_in;
          str.epc =  val.arr[i].epc;
          str.vatDye = val.arr[i].vat_no;
          jqArr.push(str)
        }
        this.arrList = jqArr;
      },
      historyPrint(){
        this.$router.push('/historyPrint')
      },
      vatIn(){

      }
    },
  }
</script>

<style>
  .search-center {
    float: left;
  }
</style>
