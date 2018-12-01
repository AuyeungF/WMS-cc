<template>
    <div class="search">
      <div class="demo-input-suffix">
        {{name}}:
        <el-input v-model="input" placeholder="请输入单号"></el-input>
        <el-button type="green" icon="el-icon-search" @click='checkIn' :disabled="flag">搜索</el-button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "search",
      props:{
        name:{
          type:String,
          default:null
        },
        flag:{
          type:Boolean,
          default:false
        }
      },
      data(){
          return {
            input:'',
          }
      },
      mounted(){
      },
      methods:{
        checkIn(){
          //生成查询条件
          if(this.input != '') {
            this.$emit('checkIn',this.input);
          }
        },
      }
    }
</script>
