<template>
  <div style="height:100%">
        <el-menu
          background-color="#2b4b6b"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router='true'
          :default-active="$router.path"
          style="height:100%"
        >
          <el-menu-item index="/home">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- 一级菜单 -->
          <el-submenu :index="item.path+''" v-for='item in menuList' :key="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+item2.path" v-for='item2 in item.children' :key="item2.path">
                <template slot="title">
                  <span>{{item2.name}}</span>
                </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
    
  </div>
</template>

<script>
export default {
  name: "Menu",
  data(){
      return {
         menuList:[
             {path:'fund',icon:'el-icon-money',name:'资金管理',children:[{name:'资金流水',path:'fundlist'}]},
             {path:'infos',icon:'el-icon-s-custom',name:'信息管理',children:[{name:'个人信息',path:'info'}]}
         ]
      }
  }
};
</script>

<style scoped>

</style>