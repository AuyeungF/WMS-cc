<template>
    <div class="historyPrint">
      <div class="container">
        <itable :tableData="tableData"
                :colunms="colunms"
                :option="option"
                :Pagination="Pagination"
                :operations="operations"
                class="top10"
                @pageChange="pageChange"
                >
        </itable>
        <div class="btn-return top10">
          <el-button type="primary" @click="btnRetun">返回</el-button>
        </div>
      </div>
    </div>
</template>

<script>
    import itable from '../itable.vue';
    import {printItem} from '../../common/js/axios/getData';
    import {filetime} from '../../common/js/filterData'
    export default {
        name: "historyPrint",
      components:{itable},
      data(){
          return{
            tableData:[],
            selectShow:true,
            colunms:[
              {
                prop:"fab_roll",
                label:"布票号",
                width:"120",
                align:"center",
                sortable:false
              },
              {
                prop:"in_no",
                label:"单号",
                width:"120",
                align:"center",
                sortable:false
              },
              {
                prop:"in_type",
                label:"入库类型",
                width:"120",
                align:"center",
                sortable:false
              },
              {
                prop:"in_date",
                label:"入库日期",
                width:"200",
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
                prop:"product_no",
                label:"布号",
                width:"120",
                align:"center",
                sortable:false
              },
              {
                prop:"prod_name",
                label:"布种名称",
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
                prop:"sel_color",
                label:"销售色号",
                width:"120",
                align:"center",
                sortable:false
              },
              {
                prop:"color_code",
                label:"染厂色号",
                width:"130",
                align:"center",
                sortable:false
              },
              {
                prop:"weight_in",
                label:"重量",
                width:"120",
                align:"center",
                sortable:false
              },
              {
                prop:"cnt",
                label:"打印次数",
                width:"120",
                align:"center",
                sortable:false
              },
              {
                prop:"userName",
                label:"打印人",
                width:"120",
                align:"center",
                sortable:false
              },
              {
                prop:"createTime",
                label:"打印时间",
                width:"200",
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
              currentPage:1,/*当前第几页*/
              total:20,/*总共多小条*/
            },/*分页配置*/
            operations:{
              btnShow:false,/*显示操作按钮*/
            },
          }
      },
      mounted(){
        let data = this.$store.state.historyId;
        printItem(data).then(res=>{
         let str = JSON.parse(res.data);
         let length = str.list.length;
        for(var i=0;i<length;i++){
          let item  = str.list[i];
          item.in_date = filetime(new Date(item.createTime));
          item.createTime = filetime(new Date(item.createTime));
          this.tableData.push(item)
        }
        }).catch(err=>{
          console.log(err)
        })
      },
      methods:{
        btnRetun(){
          this.$router.push('/print');
        },
        //分页查询
        pageChange(val){

        }
      }
    }
</script>

<style>
.btn-return{
  text-align: right;
  margin-right:20px;
}
</style>
