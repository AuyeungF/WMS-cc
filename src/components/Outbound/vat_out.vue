<template>
  <div class="vatIn">
    <el-dialog title="入库单号" :visible.sync="$store.state.inShow" width="500px" :before-close="handleDialogClose">
      <el-form :model="form">
        <el-form-item label="入库单号" :label-width="formLabelWidth">
          <el-select v-model="form.outNo" placeholder="请选择单号">
            <el-option v-for="item in verifyData"
                       :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelNo">取 消</el-button>
        <el-button type="primary" @click="inCheck">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {vatOut} from '../../common/js/axios/getData';
  export default {
    name: "vatIn",
    props:{
      verifyData:{
        type:Array,
        default:()=>[]
      },
      vatNo:{
        type:String,
        default:null
      }
    },
    data(){
      return{
        formLabelWidth: '80px',
        form:{
          outNo:"",
        }
      }
    },
    mounted(){
    },
    methods:{
      /* 根据缸号查出的出库单的查询*/
      inCheck(){
        let data = {};
        //出库单
        let str = this.form.outNo;
        //去掉所有空格
        str=str.replace(/^\s+|\s+$/g,"");
        //入库单
        data.outNo =str;
        //缸号
        data.vatNo = this.vatNo;
        vatOut(data).then(res=>{
          //请求成功清除拉下信息
          this.form.outNo = '';
          //数据转成JSON对象
          let data = JSON.parse(res.data);
          //隐藏出库单下拉框
          this.$store.state.inShow = false;
          //向父级提交请求回来的数据
          this.$emit('vatCheck',data);
        }).catch(err=>{
          this.$message({
            message: err.message,
            type: 'warning'
          });
        })


      },
      cancelNo(){
        //隐藏出库单
        this.$store.state.inShow = false;
        //请求成功清除拉下信息
        this.form.outNo = '';
        //取消禁止缸号搜索按钮
        this.$emit('cancelShow',false);
      },
      handleDialogClose(){
        this.cancelNo();
      }
    }
  }
</script>

<style scoped>

</style>
