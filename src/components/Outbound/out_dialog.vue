<template>
  <el-dialog title="出库信息" :visible.sync="$store.state.show" width="100%">
    <div class="detail-box">
      <div class="Det-body">
        <div class="Det-form">
          <el-row :span="24">
            <el-col>
              <el-row class="form-list">
                <el-form ref="form" :model="form" label-width="90px">
                  <div class="form-input bottom10 top10">
                    <el-col :span="4" class="Det-form-item">
                      <el-form-item label="出库单号:">
                        <el-input v-model="form.out_no" :disabled="isShow"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4" class="Det-form-item" >
                      <el-form-item label="出库类型:">
                        <el-input
                          v-model="form.out_type"
                          :disabled="isShow"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4" class="Det-form-item" >
                      <el-form-item label="调入公司:">
                        <el-input
                          v-model="form.company"
                          :disabled="isShow"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4" class="Det-form-item" >
                      <el-form-item label="发货公司:">
                        <el-input
                          v-model="form.company1"
                          :disabled="isShow"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4" class="Det-form-item Det-Date" >
                      <el-form-item label="开单时间:">
                        <el-date-picker
                          v-model="form.record_date"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd"
                          :disabled="isShow">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4" class="Det-form-item">
                      <el-form-item label="优先级别:">
                        <el-input
                          v-model="form.dengji"
                          :disabled="isShow"></el-input>
                      </el-form-item>
                    </el-col>
                  </div>
                  <div class="form-input bottom10">
                    <el-col :span="4" class="Det-form-item" >
                      <el-form-item label="收款类型:">
                        <el-input
                          v-model="form.acc_type"
                          :disabled="isShow"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4" class="Det-form-item" >
                      <el-form-item label="发货方式:">
                        <el-input v-model="form.is_type" :disabled="isShow"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4" class="Det-form-item">
                      <el-form-item label="客户电话:">
                        <el-input v-model="form.cust_phone" :disabled="isShow"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4" class="Det-form-item">
                      <el-form-item label="开单人员:">
                        <el-input v-model="form.record_by" :disabled="isShow"></el-input>
                      </el-form-item>
                    </el-col>
                  </div>
                </el-form>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="outpick-table top10">
          <itable :tableData="tableData"
                  :colunms="colunms"
                  :option="index"
                  :Pagination="page"
                  :operations="operations"
                  :mutiSelect="selectShow">
          </itable>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import itable from '../itable.vue';
  export default {
    name: "detail",
    props:{
      form:{
        type:Object,
        default:{}
      },
      selectShow:{
        type:Boolean,
        default:false,
      },
      tableData:{
        type:Array,
        default:()=>[]
      },
      colunms:{
        type:Array,
        default:()=>[]
      },
      page:{
        type:Object,
        default:{}
      },
      index:{
        type:Object,
        default:{}
      },
      operations:{
        type:Object,
        default:{}
      }
    },
    components:{
      itable
    },
    data(){
      return {
        isShow:false,
      }
    },
    mounted(){

    },
    methods:{

    }
  }
</script>

<style >
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
  .form-list{
    padding:0 10px;
    border:1px solid #CCC;
  }
</style>
