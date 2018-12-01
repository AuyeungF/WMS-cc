<template>
  <div class="login-wrap">
    <div class="container">
      <el-row>
        <el-col :span="10" class="login-left">
          <div class="login-box">
            <div class="login-title">登录</div>
            <div class="login-logo bottom10">
              <img src="../common/img/logo.png" alt="login">
            </div>
            <div class="login-introduce bottom10">
              亿锋智能仓库管理系统
            </div>
            <div class="ms-login">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                  <div class="login-icon login-user"></div>
                  <el-input type="text" v-model="ruleForm.username" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <div class="login-icon login-password"></div>
                  <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="remember">
                  <el-checkbox-group v-model="ruleForm.rememberMe">
                    <el-checkbox label="记住我" name="remember"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <div class="login-btn">
                  <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
              </el-form>
            </div>
          </div>
        </el-col>
        <el-col :span="14" class="login-right">
          <div class="login-bg">
            <img src="../common/img/login-BG.png" alt="">
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {Login} from '../common/js/axios/getData';
  import store from '../common/js/Vuex'
  export default {
    data() {

      /*
      rule validator方法
     value password的值
     callback 回调函数提示信息
     */

      /* 账号验证*/
      let validatename = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };

      /* 密码验证 */
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          //初始化登录信息
          username: '',
          password: '',
          rememberMe: false
        },
        rules: {
          //验证提示信息
          username: [
            {validator: validatename, trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ]
        },

      }
    },
    methods:{
      //提交验证信息
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let str1 = {
              userName: this.ruleForm.username,
              userPass: this.ruleForm.password,
            };
            //localStorage.setItem('params', JSON.stringify(str1));
            //判断条件通过
            /*window.location.href = "./index.html";*/
            Login(str1).then(res=>{
              //window.location.href = "./index.html";
              store.state.dept = res.dept;
              console.log(res)
            }).catch(err=>{
              console.log(err)
            })

          } else {
            //提交不通过
            return false;
          }
        });
      },
      getItem() {
        let obj = JSON.parse(localStorage.getItem('params'));
        if(obj){
          this.ruleForm = obj;
        }else {
          return;
        }
      }
    },
    created() {
      this.getItem();
      let _this = this;
      document.onkeydown = (e) => {
        let code = e.keyCode;
        if(code == 13) {
          _this.submitForm('ruleForm');
        } else {
          return;
        }
      }
    }
  }
</script>

<style scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
    overflow: hidden;
  }
  .login-title{
    color: #0078FF;
    padding:10px;
  }
  .login-wrap .el-col-10{
    width: 40%;
  }
  .login-wrap .el-col-14{
    width: 60%;
  }
  .login-wrap>.container{
    padding:0;
    max-width:1000px;
    overflow: hidden;
    border:0;
    -webkit-box-shadow: 0px 0px 50px #c1daff;
    -moz-box-shadow: 0px 0px 50px #c1daff;
    box-shadow: 0px 0px 50px #c1daff;
    margin:100px auto;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }
  .login-logo{
    padding:20px;
  }
  .login-logo>img{
    display: block;
    margin:0 auto;
  }
  .login-introduce{
    text-align: center;
    text-indent: -30px;
    font-weight: 800;

  }
  .ms-login{
    border-radius: 5px;
    background: #fff;
    padding: 25px;
  }
  .login-btn{
    text-align: center;
    width:350px;
    margin:10px auto;
  }
  .login-bg>img{
    display: block;
  }
  .login-btn button{
    width:100%;
    height:36px;
  }
  .el-form-item{
    width: 350px;
    margin:25px auto;
  }
</style>
