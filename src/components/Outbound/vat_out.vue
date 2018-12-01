<template>
  <div class="vatIn">
    <el-dialog title="入库单号" :visible.sync="$store.state.inShow" width="500px">
      <el-form :model="form">
        <el-form-item label="入库单号" :label-width="formLabelWidth">
          <el-select v-model="form.inNo" placeholder="请选择单号">
            <el-option v-for="item in verifyData"
                       :value="item"
                       :label="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$store.state.inShow = false">取 消</el-button>
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
        let inNo =this.form.inNo;
        vatOut(inNo).then(res=>{
          this.form.inNo = '';
          let data = JSON.parse(res.data);
          this.$store.state.inShow = false;
          this.$emit('vatCheck',data);
        }).catch(err=>{
          console.log(err)
        })


      }
    }
  }
</script>

<style scoped>

</style>
