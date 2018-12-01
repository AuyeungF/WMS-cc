<template>
    <div class="tree">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        :data="data6"
        node-key="id"
        default-expand-all
        show-checkbox
        highlight-current
        :props="defaultProps"
        ref="itree"
        :filter-node-method="filterNode">
      </el-tree>
    </div>
</template>

<script>
    export default {
      name: "",
      props:{
          data6:{
            type:Array,
            default:()=>[]
          },
        defaultProps:{
            type:Object,
            default:null,
        }
      },
      data(){
          return{
            filterText:'',
          }
      },
      watch: {
        filterText(val) {
          this.$refs.itree.filter(val);
        }
      },
      methods:{
        getCheckedNodes(){
          let checkedNodes = this.$refs.itree.getCheckedNodes();
          let length = checkedNodes.length
          if(length != 0){
            this.$emit('getCheckedNodes',checkedNodes);
          }
        },
        getCheckedKeys(){
          let checkedKeys = this.$refs.itree.getCheckedKeys();
          let  length = checkedKeys.length
          if(length != 0) {
            this.$emit('getCheckedKeys',checkedKeys);
          }
        },
        filterNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
        }
      }
    }
</script>

<style scoped>

</style>
