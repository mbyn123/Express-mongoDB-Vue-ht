<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
//引入jewt-decode 解析token中的用户信息
import jwt_decode from "jwt-decode";
export default {
  name: "app",
  //vuex刷新页面,数据就会清空,所以在vue每次加载刷新的的时候,将token存储到vuex中 
  created(){
    if(localStorage.token){
      const decoded=jwt_decode(localStorage.token)
      //将token中的用户信息存储到vuex中
        this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decoded)); //isEmpty判断token是否为存在,传递一个布尔值,表示用户是否登录/授权
        this.$store.dispatch("setUser", decoded); //用户信息
    }
  },
  methods: {
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

</style>
