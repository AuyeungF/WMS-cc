<template>
    <div class="table">
        <!--table表格-->
        <el-table
          :data="tableData"
          stripe
          resizable
          highlight-current-row
          v-loading="loading"
          :height="tabHeight"
          style="width: 100%;cursor: pointer;"
          :header-cell-style="{background:'#0078FF',color:'#FFF',textAlign:'center',fontSize:'16px',padding:'5px 0'}"
          :row-style="{height:'50px',fontSize:'16px'}"
          @row-dblclick="showDialog"
          @selection-change="handleSelectionChange"
          :row-class-name="tableRowClassName"
          ref="table"
        >
          <!--多选框-->
          <el-table-column
            v-if="mutiSelect"
            type="selection"
            style="width: 100px;"
            align="center"
          >
          </el-table-column>
          <!--序号-->
          <el-table-column
            v-if="option.index"
            fixed="left"
            type="index"
            width="115"
            label="序号"
            align="center">
          </el-table-column>
          <!--数据列-->
          <template  v-for="(val,index) in this.colunms">
            <el-table-column
              :key="index"
              :prop="val.prop"
              :label="val.label"
              :width="val.width"
              :align="val.align"
              :sortable="val.sortable"
            >
              <template slot-scope="scope">
                <template v-if="!val.render">
                  <template v-if="val.formatter">
                    <span v-html="val.formatter(scope.row,val)"></span>
                  </template>
                  <template v-else>
                    <span>{{scope.row[val.prop]}}</span>
                  </template>
                </template>
                <!--render-->
                <template v-else>
                  <expand-dom :column="val" :row="scope.row" :render="val.render" :index="index"></expand-dom>
                </template>
              </template>
            </el-table-column>
          </template>
          <!--btn-->
          <el-table-column
            v-if="operations.btnShow"
            align="center"
            :prop="operations.prop"
            :label="operations.label"
            :fixed="operations.fixed"
            :width="operations.width">
            <template slot-scope="scope">
              <el-button
                v-for="(val,index) in operations.options"
                :key="index"
                :type="val.type"
                :icon="val.icon"
                @click="handleButton(val.methods,scope.row)">
                {{val.label}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--pagination分页-->
        <div class="block top10" v-if="Pagination.pageShow">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="Pagination.currentPage"
            layout="total, prev, pager, next, jumper"
            :total="Pagination.total">
          </el-pagination>
        </div>
    </div>
</template>

<script>
  export default {
      name: "Wtable",
      props:{
        tableData:{
          type:Array,
          default:()=>[]
        },
        colunms:{
          type:Array,
          default:()=>[]
        },
        mutiSelect:{
          type:Boolean,
          default:null
        },
        opera:{
          type:Boolean,
          default:null
        },
        Pagination:{
          type:Object,
          default:{}
        },
        option:{
          type:Object,
          default:{}
        },
        operations:{
          type:Object,
          default:{}
        },
      },
      components:{
        expandDom: {
          functional: true,
          props: {
            row: Object,
            render: Function,
            index: Number,
            column: {
              type: Object,
              default: null
            }
          },
          render: (h, ctx) => {
            const params = {
              row: ctx.props.row,
              index: ctx.props.index
            };
            if (ctx.props.column) params.column = ctx.props.column
            return ctx.props.render(h, params)
          }
        }
      },
      data(){
        return {
          /*加载*/
          loading: false,
          /*多选框数组*/
          multipleSelection:[],
        }
      },
    watch:{

    },
    mounted(){

      //加载处理
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.list = this.sortDate;
      }, 2000);
      this.tabHeight = window.innerHeight-200;
    },
    computed:{
      /*数据过滤
      *   时间的排序
      * */
      sortDate(){
        let newArr = this.tableData;
        newArr.sort(function (x,y) {
          return Date.parse(y.date) - Date.parse(x.date);
        })
        return newArr;
      }
    },
    methods:{
      tableRowClassName ({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
        if(this.tableData[rowIndex].result == 1) {
          return 'success';
        } else if(this.tableData[rowIndex].result == 2){
          return '';
        } else if(this.tableData[rowIndex].result == 3) {
          return  'danger'
        }
      },
      //双击事件
      showDialog(row){
        /*row获取当前的类*/
        this.$emit('showActionTableDialog',{"flag":true,"row":row.index});
      },
      //单击事件
      changeName(row, event, column){
        /* row.index获取当前的类*/
      },
      //多选框
      handleSelectionChange(val){
            this.multipleSelection = val;
          this.$emit('selectedList',{'arr':this.multipleSelection})
      },
      //按钮
      handleButton(methods,row){
            this.$emit("handleButton",{'methods':methods,'row':row});
      },
      //选中页数
      handleCurrentChange(val){
            let page = {
              total:5,
              currentPage:val
            }
            this.$emit('pageChange',page)
      },
      //status
      statusChange(){

      }
    }
  }
</script>

<style>
  .el-table__body tr.hover-row>td .el-tag--info{
    background-color: rgb(144, 147, 153);
    border-color: rgb(144, 147, 153);
    color: #FFF;
  }
  .el-table__body tr.hover-row>td .el-tag--success{
    background-color: rgba(103,194,58);
    border-color: rgba(103,194,58);
    color: #FFF;
  }
  .el-table__body tr.hover-row>td .el-tag--danger{
    background-color: rgba(245,108,108);
    border-color: rgba(245,108,108);
    color: #FFF;
  }
  .el-table tr.info, .el-table--striped .el-table__body tr.el-table__row--striped.info td{
    background-color: #CCC !important;
    color: #FFF;
  }
  .el-table tr.success, .el-table--striped .el-table__body tr.el-table__row--striped.success td{
    background-color: rgba(103,194,58) !important;
    color: #FFF;
  }
  .el-table tr.danger, .el-table--striped .el-table__body tr.el-table__row--striped.danger td{
    background-color: rgba(245,108,108) !important;
    color: #FFF;
  }
</style>
