<template>
  <el-dialog
    title="确认打印信息"
    :visible.sync="$store.state.printShow"
    width="30%"
    :before-close="handleClose">
    <div class="print-table">确定要打印</div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$store.state.printShow = false">取 消</el-button>
      <el-button type="primary" @click="printing">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {printAll,saveInbound} from '../../common/js/axios/getData';
  import itable from '../itable.vue';
  export default {
    name: "print",
    props:{
      form:{
        type:Object,
        default:{}
      },
      arrList:{
        type:Array,
        default:[]
      },
      list:{
        type:Array,
        default:[]
      }
    },
    date(){
      return{
        selectShow:true,
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
      }
    },
    components:{itable},
    methods:{
      printing(){
        this.form.productInDList = this.list;
        let date = this.form.in_date;
        let  time = new Date(date);
        let  time1 = time.getTime();
        this.form.in_date = time1;
        let data={};
        data.key = this.$store.state.historyId;
        data.form = this.form;
        printAll(this.arrList)
          .then(res=>{
            if(res == '打印成功') {
              saveInbound(data).then(res=>{
                this.$message({
                  message: '保存成功' ,
                  type: 'success'
                })}).catch(err=>{console.log(err)});
              this.$store.state.printShow = false;
            }
          }).catch(err=>{
          console.log(err)
        })

        /* //打印加载效果
      const loading = this.$loading({
        lock: true,
        text: '打印中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });*/
      }
    }

  }
</script>

<style>
  .print-table{
    text-align: center;
  }
</style>
