<template>
  <div>
    <nav class="headerNav">
      <el-row type="flex" justify="space-between">
        <el-col :span="6">
          <h1 class="nav-title">HT后台管理系统</h1>
        </el-col>
        <el-col :span="6">
          <div class="navUser">
            <img :src="user.avatar" alt />
            <div>
              <div class="nav-hint">欢迎您</div>
              <div class="nav-userName">{{user.name}}</div>
            </div>
            <div>
              <el-dropdown @command="handleCommand">
                <i class="el-icon-arrow-down el-icon--right"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="info">个人信息</el-dropdown-item>
                  <el-dropdown-item command="exit">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-col>
      </el-row>
    </nav>
  </div>
</template>

<script>
export default {
  name: "headerNav",
  data() {
    return {};
  },
  computed: {
    user() {
      //从vuex中获取到用户信息,姓名,头像
      return this.$store.getters.user;
    }
  },
  methods: {
    handleCommand(command) {
      if (command == "info") {
        this.$router.push('/info')
      } else {
        this.$store.dispatch("clearCurrentState"); //清除vuex中的token,用户信息,登录状态
        localStorage.removeItem("token"); //清除本地缓存中的token
        this.$router.push("/login"); //跳转页面
      }
    }
  }
};
</script>


<style scoped>
.headerNav {
  width: 100%;
  height:100%;
  background: #2b4b6b;
}
.nav-title {
  color: #fff;
  margin-left: 20px;
}
.navUser {
  height:100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
}
.navUser img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px;
}
.nav-hint {
  color: #fff;
  font-size: 14px;
}
.nav-userName {
  color: #f56c6c;
  font-weight: bolder;
  font-size: 16px;
}
.el-icon-arrow-down {
  color: #fff;
}
</style>