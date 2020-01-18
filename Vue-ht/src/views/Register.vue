<template>
  <div id="register">
    <div class="overall">
      <section class="register-box">
        <h2 class="register-title">ht管理系统-注册</h2>
        <el-form
          :model="registerForm"
          :rules="registerRules"
          ref="registerRef"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="registerForm.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input  v-model="registerForm.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="registerForm.password2"></el-input>
          </el-form-item>
          <el-form-item label="选择身份">
            <el-select placeholder="请选择身份" v-model="registerForm.identity">
              <el-option label="管理员" value="administrator"></el-option>
              <el-option label="普通员工" value="common"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="register-but">
            <el-button type="success" @click='submitForm()'>注册</el-button>
              <el-link type="primary" :underline="false" href='/login'>返回登录</el-link>
          </el-form-item>
        </el-form>
      </section>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    var chenkPassword2 = (rule, value, callback) => {
    if(value!==this.registerForm.password){
        callback(new Error('两次输入密码不一致'))
      }else{
        callback()
      }
    
    };
    return {
      registerForm: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: ""
      },
      registerRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入正确的邮箱", trigger: "blur" ,type:'email'},
        ],
        password:[
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度最少6位数", trigger: "blur" }
        ],
        password2:[
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度最少6位数", trigger: "blur" },
          { validator: chenkPassword2 }
        ]
      }
    };
  },
  methods: {
    submitForm(){
      this.$refs.registerRef.validate((valid)=>{
        if(!valid){
         return  this.$message.error('请填写完整的注册信息')
        }
        this.$axios.post('/api/users/register',this.registerForm)
           .then(()=>{
             this.$message.success('账号注册成功')
             this.$router.push('/login')
           })
           
      })
    }
  }
};
</script>

<style scoped>
.overall {
  height: 100vh;
  background: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
}
.register-box {
  width: 400px;
  background: #fff;
  padding: 0 20px;
  border-radius: 4px;
}
.register-title {
  text-align: center;
}
.register-but {
  text-align: right;
}
.el-select {
  width: 100%;
}
.tiparea{
  color:#409eff
  }
</style>