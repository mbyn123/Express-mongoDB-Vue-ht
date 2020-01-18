<template>
  <div class="info">
    <el-row class='el-row' >
      <el-col :span="8" class='el-col' >
        <div class="avatar">
          <img :src="user.avatar" alt />
        </div>
      </el-col>
      <el-col :span="16" class='el-col'>
        <div class="userInfo">
          <div class="name">
            <i class="el-icon-user-solid"></i>
            {{user.name}}
          </div>
          <div>
            <i class="el-icon-s-tools"></i>
            {{user.identity=='common'?'普通员工':'管理员'}}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Info",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style scoped>
.info {
  height: 100%;
}
.el-row{
  height:100%;
}
.el-col{
  height: 100%;
}
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.avatar img{
  border-radius: 50%
}
.userInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ccc;
  padding-left: 10%;
  font-size: 28px;
  height:100%;

}
.name {
  margin-bottom: 30px;
}
</style>