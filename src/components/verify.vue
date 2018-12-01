<template>
    <div class="verify">
      <itable :tableData="tableData"
              :colunms="colunms"
              :option="option"
              :Pagination="Pagination"
              :operations="operations"
              :mutiSelect="selectShow">
      </itable>
    </div>
</template>

<script>
  import itable from 'itable.vue';
    export default {
        name: "verify",
      data(){
          return {
          }
      },
      components:{
        itable
      },
      mounted(){

      },
      methods:{

      }
    }
</script>

<style>

</style>
