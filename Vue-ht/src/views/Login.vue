<template>
  <div id="login">
    <div class="overall">
      <section class="login-box">
        <h2 class="login-title">ht管理系统</h2>
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginFormRef"
          label-width="70px"
          class="demo-ruleForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginForm.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item class="login-but">
            <el-button type="primary" @click="submitForm()">登陆</el-button>
            <el-button type="success" @click="goRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
    <router-view />
  </div>
</template>

<script>
//引入jewt-decode 解析token中的用户信息
import jwt_decode from "jwt-decode";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        email: "wangwu@qq.com",
        password: "123456"
      },
      loginRules: {
        email: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
            type: "email"
          },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在最少6位数 ", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    goRegister() {
      this.$router.push("/register");
    },
    submitForm() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) {
          return this.$message.error("登陆信息填写错误");
        }
        this.$axios
          .post("/api/users/login", {
            email: this.loginForm.email,
            password: this.loginForm.password
          })
          .then(res => {
            this.$message.success(res.data.msg);
            const { token } = res.data;
            localStorage.setItem("token", token); //存储token
            const decode = jwt_decode(token); //解析token,获取到用户信息
            //将token中的用户信息存储到vuex中
            this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode)); //isEmpty判断token是否为true,传递一个布尔值,表示用户是否登录/授权
            this.$store.dispatch("setUser", decode); //用户信息
            //跳转页面
            this.$router.push("/index");
          });
      });
    },
    //判断是否为空的方法，为空返回true
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
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
.login-box {
  width: 400px;
  background: #fff;
  padding: 0 20px;
  border-radius: 4px;
}
.login-title {
  text-align: center;
}
.login-but {
  text-align: right;
}
</style>