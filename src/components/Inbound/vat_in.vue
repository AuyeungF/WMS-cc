<template>
    <div class="vatIn">
      <el-dialog title="入库单号" :visible.sync="$store.state.inShow" width="500px" :before-close="handleDialogClose">
        <el-form :model="form">
          <el-form-item label="入库单号" :label-width="formLabelWidth">
            <el-select v-model="form.inNo" placeholder="请选择单号">
              <el-option v-for="item in inData"
                          :value="item"
                          :label="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="inCheck">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import {vatInNo} from '../../common/js/axios/getData';
  export default {
    name: "vatIn",
    props:{
      inData:{
        type:Array,
        default:()=>[]
      }
    },
    data(){
      return{
        formLabelWidth: '80px',
        form:{
          inNo:"",
        }
      }
    },
    mounted(){
    },
    methods:{
      inCheck(){
        //缸号查询出来入库单
        let inNo =this.form.inNo;
        vatInNo(inNo).then(res=>{
          //请求后清除下拉
          this.form.inNo = '';
          this.inList = [];
          //数据转换成JSON
          let data = JSON.parse(res.data);
          //隐藏入库单下拉
          this.$store.state.inShow = false;
          //给父级传参
          this.$emit('vatCheck',data);
        }).catch(err=>{
          console.log(err)
        })


      },
      closeDialog(){
        //隐藏入库单下拉
        this.$store.state.inShow = false;
        //请求后清除下拉
        this.form.inNo = '';
        //取消禁止缸号搜索按钮
        this.$emit('cancelShow',false);
      },
      handleDialogClose(){
        this.closeDialog();
      }
    }
  }
</script>

<style scoped>

</style>
