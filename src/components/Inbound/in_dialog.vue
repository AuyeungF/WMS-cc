<template>
  <el-dialog title="入库信息" :visible.sync="$store.state.show" width="100%">
    <div class="detail-box">
    <div class="Det-body">
      <div class="Det-form">
        <el-row :span="24">
          <el-col>
            <el-row class="form-list">
                <el-form ref="form" :model="form" label-width="90px">
                <div class="form-one bottom10 top10">
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="进仓单号:">
                      <el-input v-model="form.in_no" :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item Det-Date" >
                    <el-form-item label="进仓日期:">
                      <el-date-picker
                        v-model="form.date"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                        :disabled="isShow">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="入库类型:">
                      <el-input
                        v-model="form.in_type"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="生产单号:">
                      <el-input
                        v-model="form.job_no"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="总条数:">
                      <el-input v-model="form.b_ps" :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item Det-Date" >
                    <el-form-item label="总胚重:">
                      <el-input v-model="form.weight_f" :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <div class="form-two bottom10">
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="客户 Po:">
                      <el-input
                        v-model="form.cust_po"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="客户名称:">
                      <el-input v-model="cust_name" :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="染厂名称:">
                      <el-input v-model="fact_name" :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="染厂色号:">
                     <el-input v-model="color_code" :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="总毛重:">
                      <el-input
                        v-model="form.weight_m"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="空加值:">
                      <el-input
                        v-model="form.weight_kj"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <div class="form-three bottom10">
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="缸号:">
                      <el-input
                        v-model="form.vat_no"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="布号:">
                      <el-input
                        v-model="form.product_no"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="布类名称:">
                      <el-input
                        v-model="form.prod_name"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="销售色号:">
                      <el-input
                        v-model="form.sel_color"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="纸管重:">
                      <el-input
                        v-model="form.weight_zg"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="总实重:">
                      <el-input
                        v-model="form.weight_in"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <div class="form-four bottom10">
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="颜色:">
                      <el-input
                        v-model="form.color_name"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="克重:">
                      <el-input
                        v-model="form.gram"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="封度:">
                      <el-input
                        v-model="form.width"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="至边封度:">
                      <el-input
                        v-model="form.width_side"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <div class="form-five bottom10">
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="送货单号:">
                      <el-input
                        v-model="form.sh_no"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="业务员:">
                      <el-input
                        v-model="form.gd_name"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="仓位:">
                      <el-input
                        v-model="form.place_name"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="备注:">
                      <el-input
                        v-model="form.remark"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
              </el-form>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "detail",
    props:{
      form:{
        type:Object,
        default:{}
      }
    },
    data(){
      return {
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
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
