<template>
  <div class="foundlist">
    <div>
      <!-- 筛选 时间 -->
      <el-form :inline="true" ref="search_data" :model="search_data">
        <el-form-item label="投标时间筛选:">
          <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
          <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-search"
            @click="onScreeoutMoney()"
          >筛选</el-button>
        </el-form-item>
        <el-form-item class="addBut">
          <el-button type="primary" size="medium" @click="AddFund()">添加</el-button>
        </el-form-item>
      </el-form>

      <!-- 添加按钮 -->
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="创建时间" width="240">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date | date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" width="120"></el-table-column>
        <el-table-column prop="describe" label="收支描述"></el-table-column>
        <el-table-column prop="income" label="收入" width="100">
          <template slot-scope="scope">
            <span style="color:#67C23A">{{'+'+ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" width="100">
          <template slot-scope="scope">
            <span style="color:#F56C6C">{{'-'+ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cach" label="账户现金" width="120">
          <template slot-scope="scope">
            <span style="color:#409EFF">{{ scope.row.cach }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editFund(scope.row)" v-if="user.identity=='administrator'">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteFund(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginations.page_index"
        :page-sizes="paginations.page_sizes"
        :page-size="paginations.page_size"
        :layout="paginations.layout"
        :total="paginations.total"
      ></el-pagination>
    </div>
    <!-- 对话框 向子组件传递数据-->
    <AddFund :dialog="dialog" :addFundForm="addFundForm" @updata="getFundList()" />
  </div>
</template>

<script>
import AddFund from "../components/AddFund";
export default {
  created() {
    this.getFundList();
  },
  components: {
    AddFund
  },
  computed: {
    user() {
      return this.$store.getters.user; //权限控制,登录用户是管理员身份,才显示编辑/删除功能
    }
  },
  data() {
    return {
      //子组件的数据
      dialog: {
        Visible: false,
        title: "",
        option: ""
      },
      //子组件的表单数据
      addFundForm: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cach: "",
        remark: ""
      },
      tableData: [], //表格数据容器
      allTableData: [], //分页数据容器
      filterTableData: [], //筛选数据容器
      //分页组件所需的信息数据
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      //筛选时间数据
      search_data: {
        startTime: "",
        endTime: ""
      }
    };
  },
  methods: {
    //1.发送请求，获取所有表格数据
    getFundList() {
      this.$axios.get("/api/profiles").then(res => {
        //1.1 将数据先复制给 分页数据容器 和 筛选数据容器
        this.allTableData = res.data;
        this.filterTableData = res.data;
        //1.2 设置分页数据
        this.setPaginations();
      });
    },

    //2 设置分页方法
    setPaginations() {
      //2.1 获取数据的总条数、当前页，当前页展示的条数
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      //2.2 设置默认分页数据（小于5页）,让表格数据容器等于分页数据容器,过滤后的数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },

    //3 切换page_size，分页事件方法
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      //3.1 表格数据容器等于分页数据容器,过滤后的数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },

    //4 页面的跳转，分页事件方法
    handleCurrentChange(page) {
      // 4.1 获取当前页
      let index = this.paginations.page_size * (page - 1);
      // 4.2 数据总数
      let nums = this.paginations.page_size * page;
      // 4.3 容器
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        //4.4 表格数据容器等于分页数据容器,过滤后的数据
        this.tableData = tables;
      }
    },

    // 5.筛选方法
    onScreeoutMoney() {
      // 5.1判断时间区间是否为空
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfile();
        return;
      }
      // 5.2获取开始时间、结束时间
      const stime = this.search_data.startTime.getTime();
      const etime = this.search_data.endTime.getTime();
      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= stime && time <= etime;
      });
      // 分页数据
      this.setPaginations();
    },

    //点击添加 修改子组件中的值
    AddFund() {
      this.dialog = {
        Visible: true,
        title: "添加资金",
        option: "add"
      };
      //将子组件对话框中表单的值清空,用于添加数据
      this.addFundForm = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cach: "",
        remark: ""
      };
    },
    //点击修改 修改子组件中的值
    editFund(row) {
      this.dialog = {
        Visible: true,
        title: "修改资金",
        option: "edit",
        id: row._id
      };
      console.log(row._id);
      //将当前表格数据赋值给子组件对话框的表单，用于编辑
      this.addFundForm = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cach: row.cach,
        remark: row.remark
      };
    },
    //点击删除
    async deleteFund(row) {
      const result = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (result === "confirm") {
        this.$axios.delete(`/api/profiles/delete/${row._id}`).then(() => {
          this.$message.success("删除成功");
          this.getFundList();
        });
      } else {
        this.$message.info("取消了删除");
      }
    }
  }
};
</script>

<style scoped>
.foundlist {
  padding: 20px;
}
.pagination {
  text-align: right;
}
</style>