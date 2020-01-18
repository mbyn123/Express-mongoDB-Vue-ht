<template>
  <div>
    <el-dialog :title="dialog.title" :visible.sync="dialog.Visible" width="40%">
      <el-form :model="addFundForm" ref="addFundForm" :rules="addFundRules" label-width="80px">
        <el-form-item label="收支类型" prop="region">
          <el-select v-model="addFundForm.type" placeholder="请选择">
            <el-option v-for="(item,index) in options" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支描述" prop="describe">
          <el-input v-model="addFundForm.describe"></el-input>
        </el-form-item>
        <el-form-item label="收入" prop="income">
          <el-input type="number" v-model.number="addFundForm.income"></el-input>
        </el-form-item>
        <el-form-item label="支出" prop="expend">
          <el-input type="number" v-model.number="addFundForm.expend"></el-input>
        </el-form-item>
        <el-form-item label="账户现金" prop="cach">
          <el-input type="number" v-model.number="addFundForm.cach"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="addFundForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.Visible = false">取 消</el-button>
        <el-button type="primary" @click="Submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Menu",
  //父传子
  props: {
    dialog: Object,
    addFundForm: Object
  },
  data() {
    return {
      addFundRules: {
        describe: [
          { required: true, message: "请输入收支描述", trigger: "blur" }
        ],
        income: [
          { required: true, message: "请输入收入金额", trigger: "blur" },
          { type: "number", min: 0, message: "金额不能小于0" }
        ],
        expend: [
          { required: true, message: "请输入支出金额", trigger: "blur" },
          { type: "number", min: 0, message: "金额不能小于0" }
        ],
        cach: [
          { required: true, message: "请输入账户现金", trigger: "blur" },
          { type: "number", min: 0, message: "金额不能小于0" }
        ]
      },
      options: ["提现", "提现手续费", "充值", "优惠券", "优惠礼券", "转账"]
    };
  },
  methods: {
    //发送请求 添加/修改
    Submit() {
      this.$refs.addFundForm.validate(valid => {
        if (!valid) {
          return this.$message.error("信息未填写完整");
        }
        //根据父级组件的传值，来决定，请求的api路径 和 请求方法
        const url =this.dialog.option == "add" ? "add" : `edit/${this.dialog.id}`;
        const method = this.dialog.option == "add" ? "post" : "put";
        if (method == "post") {
          this.$axios
            .post(`/api/profiles/${url}`, this.addFundForm)
            .then(() => {
              this.$message.success("数据添加成功");
              this.dialog.Visible = false;
              this.$emit("updata"); //子级向父级组件，传递事件，刷新页面
            });
        }else{
           this.$axios
            .put(`/api/profiles/${url}`, this.addFundForm)
            .then(() => {
              this.$message.success("数据更新成功");
              this.dialog.Visible = false;
              this.$emit("updata"); //子级向父级组件，传递事件，刷新页面
            });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>