<template>
  <div>
    <el-container>
      <!--头部导航栏 -->
      <el-header>
        <HeaderNav />
      </el-header>
      <el-container >
        <!-- 侧边菜单 -->
        <el-aside width="200px" >
          <Menu />
        </el-aside>
        <!-- 主要内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderNav from "../components/HeaderNav";
import Menu from "../components/Menu";
export default {
  name: "Index",
  components: {
    HeaderNav,
    Menu
  }
};
</script>


<style scoped>


</style>