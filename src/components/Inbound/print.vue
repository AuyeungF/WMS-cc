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
               <el-input v-model="vatInput" placeholder="请输入缸号"></el-input>
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
           <el-button type="primary"
                      @click="printing"
                      class="btn-print"
                      style="margin-right: 20px;">打印标签</el-button>
         </div>
       </div>
       <!--查看主入库信息-->
       <in-dialog :form="form"></in-dialog>
       <!--入库单号-->
        <vatin :inData="inList"
               @vatCheck="vatCheck"
               @cancelShow="cancelShow">
        </vatin>
       <!--确认打印-->
       <p-dialog :form="form"
                 :arrList="arrList"
                 :list="list"
                  @clearList="clearList">
       </p-dialog>
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
      /*  入库单查询接口 */
      checkIn(data){
        //禁止入库单搜索按钮
        this.inFlag=true;
        incheck(data).then(res=>{
          //保存入库单号
          this.$store.state.clothNo = data;
          //数据转换JSON
          let str = JSON.parse(JSON.parse(res.data));
          //判断返回的数据对象中是否存在message
          if(str.hasOwnProperty("message")) {
            //清空信息
            this.tableData = [];
            //提示返回的信息
            this.$message({
              message: str.message,
              type: 'warning'
            });
          } else {
            //显示的信息
            this.tableData = str.productInDList;
            //入库信息弹出
            this.$store.state.show = true;
            //时间格式的转化
            str.date = new Date(str.in_date);
            //数据赋值回表单对象中
            this.form = str;
            //允许打印
            this.flag = true;
          }
          //入库按钮恢复使用
          this.inFlag=false;
        })
          .catch(err=>{
          console.log(err);
            //入库按钮恢复使用
          this.inFlag=false;
        })
      },
      /*  缸号的查询 */
      vatIn() {
        /*  判断缸号信息是否未空  */
        if(this.vatInput != '') {
          //转化特殊符号未base64位
          let data =  encodeURIComponent(this.vatInput);
          //禁止缸号搜索按钮再次点击
          this.vatFlag=true;
          //通过搜索缸号返回入库单的列表
          // 1 有数据 0  数据返回message
          vatAll(data)
            .then(res=>{
              //通过返回过来的code做条件
              if(res.code == 1){
                //接收入库单的数组
                this.inList = res.data;
                //下拉入库单号选择框显示
                this.$store.state.inShow = true;
              } else if(res.code == 0) {
                this.$message({
                  message: res.message,
                  type: 'warning'
                });
              };
              //恢复缸号搜索按钮
              this.vatFlag=false;
            })
            .catch(err=>{
              console.log(err);
              //恢复缸号搜索按钮
              this.vatFlag=false;
            })
        }
      },
      /*  查看入库信息  */
      ckeckList(){
        //判断信息是否显示
        if(this.flag) {
          this.$store.state.show = true;
        } else {
          this.$message({
            message: '查询入库单号后查看信息',
            type: 'warning'
          });
        }
      },
      /*  再次确认打印  */
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
      /*  多选框选择数据进行打印 */
      selectedList(val){
        //存储返回要打印的信息
        this.list = val.arr;
        let obj = this.form;
        //创建新得数组容器
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
        };
        this.arrList = jqArr;
      },
      /*  跳转到历史打印记录页面 */
      historyPrint(){
        this.$router.push('/historyPrint')
      },
      /*  缸号查询后的入库单的查询  */
      vatCheck(val){
        //数据存储
        let list = val.data;
        //显示入库信息
        this.$store.state.show = true;
        //时间格式的转换
        list.date = new Date(list.in_date);
        this.form = list;
        this.tableData = list.productInDList;
        this.flag = true;
      },
      /*  恢复缸号搜索按钮  */
      cancelShow(val){
        this.vatFlag = val;
      },
      clearList(val) {
        if(val) {
          this.tableData=[];
          this.arrList = [];
        }
      }
    },
  }
</script>

<style>
  .search-center {
    float: left;
  }
</style>
