<template>
  <div class="detail-box">
    <div class="Det-header">
      <el-row>
        <el-col :span="8"><h5>入库明细</h5></el-col>
        <el-col :offset="8" :span="8"> <span class="new-right out-go"></span></el-col>
      </el-row>
    </div>
    <div class="Det-body">
      <div class="Det-form">
        <el-row :span="24">
          <el-col>
            <el-row class="form-list">
              <el-form ref="form" :model="form" label-width="90px">
                <div class="form-one bottom10 top10">
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="进仓单号:">
                      <el-input v-model="form.inNo" :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item Det-Date" >
                    <el-form-item label="进仓日期:">
                      <el-date-picker
                        v-model="form.createDate"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        :disabled="isShow">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="入库类型:">
                      <el-input
                        v-model="form.inboundType"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="生产单号:">
                      <el-input
                        v-model="form.purchaseId"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="总条数:">
                      <el-input v-model="form.inboundNo" :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item Det-Date" >
                    <el-form-item label="总胚重:">
                      <el-input v-model="form.inboundNo" :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <div class="form-two bottom10">
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="客户 Po:">
                      <el-input
                        v-model="form.sendNo"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="客户名称:">
                      <el-autocomplete
                        v-model="form.company"
                        :disabled="isShow"
                        :fetch-suggestions="querySearchAsync"
                        @focus="changeList('company')">
                      </el-autocomplete>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="染厂名称:">
                      <el-autocomplete
                        v-model="form.supplier"
                        :disabled="isShow"
                        :fetch-suggestions="querySearchAsync"
                        @focus="changeList('supplier')">
                      </el-autocomplete>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="染厂色号:">
                      <el-autocomplete
                        v-model="form.textileFactory"
                        :disabled="isShow"
                        :fetch-suggestions="querySearchAsync"
                        @focus="changeList('textileFactory')">
                      </el-autocomplete>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="总毛重:">
                      <el-input
                        v-model="form.inboundType"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="空加值:">
                      <el-input
                        v-model="form.purchaseId"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <div class="form-three bottom10">
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="缸号:">
                      <el-input
                        v-model="form.processNumber"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="布号:">
                      <el-input
                        v-model="form.processNumber"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="名称:">
                      <el-input
                        v-model="form.processNumber"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="销售色号:">
                      <el-input
                        v-model="form.processNumber"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="纸管重:">
                      <el-input
                        v-model="form.inboundType"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="总实重:">
                      <el-input
                        v-model="form.purchaseId"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <div class="form-four bottom10">
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="颜色:">
                      <el-input
                        v-model="form.processNumber"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="克重:">
                      <el-input
                        v-model="form.processNumber"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="封度:">
                      <el-input
                        v-model="form.processNumber"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="至边封度:">
                      <el-input
                        v-model="form.processNumber"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="净重:">
                      <el-input
                        v-model="form.inboundType"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item" >
                    <el-form-item label="类型:">
                      <el-input
                        v-model="form.purchaseId"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
                <div class="form-five bottom10">
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="送货单号:">
                      <el-input
                        v-model="form.processNumber"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="业务:">
                      <el-input
                        v-model="form.processNumber"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="仓位:">
                      <el-input
                        v-model="form.processNumber"
                        :disabled="isShow"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="Det-form-item">
                    <el-form-item label="备注:">
                      <el-input
                        v-model="form.processNumber"
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
</template>

<script>
  import itable from './itable.vue';
    export default {
        name: "detail",
        components:{itable},
        data(){
          return {
            form:{},
            isShow:false,
            tabHeight:500,
            Pagination:{

            },
            option: {
              index: true, //序号
              loading: false, // 表格loading加载动画控制
            }, // table 序号的参数
            operations:{
              btnShow:false,/*显示操作按钮*/
            }
          }
        },

      mounted(){
      },
      methods:{
      }
    }
</script>

<style >
  .el-dialog{
    width:80%;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
  .form-list{
    padding:0 10px;
    border:1px solid #CCC;
  }
</style>
