<template>
  <el-dialog
    title="确认打印信息"
    :visible.sync="$store.state.printShow"
    width="30%"
    :before-close="handleClose">
    <div class="print-table">确定要打印</div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closePrint">取 消</el-button>
      <el-button type="primary" @click="printing" :disabled="isShow">确 定</el-button>
    </div>
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
      data(){
          return{
            isShow:false
          }
      },
      components:{itable},
      methods:{
        printing(){
          //接收需要打印的信息
          this.form.productInDList = this.list;
          //时间格式的转换
          let date = this.form.in_date;
          let  time = new Date(date);
          let  time1 = time.getTime();
          this.form.in_date = time1;
          //创建一个对象存储提交的信息
          let data={};
          data.key = this.$store.state.historyId;
          data.form = this.form;
          this.isShow = true;
          if(this.arrList.length != 0){
            saveInbound(data).then(res=>{
              this.isShow = false;
              this.$store.state.printShow = false;
              this.arrList = [];
              this.$emit('clearList',true);
              var msg = new SpeechSynthesisUtterance("保 存 成 功");
              window.speechSynthesis.speak(msg);
              this.$message({
                message: '保存成功' ,
                type: 'success'
              });
              printAll(this.arrList).then(res=>{}).catch(err=>{
                this.$message({
                  message: err.data ,
                  type: 'danger'
                })
              })
            }).catch(err=>{
              this.$store.state.printShow = false;
              this.isShow = false;
              this.$message({
                message: err.data ,
                type: 'danger'
              })
            });



          } else {
            this.$message({
              message: '请选择要打印的单号' ,
              type: 'warning'
            })
          }
        },
        closePrint(){
          this.$store.state.printShow = false;
          this.isShow = false;
        },
        handleClose(){
         this.closePrint();
        }
      }

    }
</script>

<style>
  .print-table{
    text-align: center;
  }
</style>
