<template>
  <el-card>
    <div class="query-page-contain">
      <!-- 头部查询配置 -->
      <query-condition
        :conditionColumns="conditionColumns"
        @queryData="queryData"
        ref="queryCondition"
      ></query-condition>
      <!-- 头部按钮配置 -->
      <div
        class="query-operation is-right"
        v-show="Array.isArray(operBtn) && operBtn.length"
      >
        <el-button
          v-for="(item, index) in operBtn"
          :icon="btnIcon(item)"
          @click="btnfunc(item)"
          :key="index"
          >{{ item.name }}</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table
        max-height="800"
        v-if="showTable"
        border
        ref="table"
        :data="tableData"
        v-loading="loading"
        @selection-change="handleSelectChange"
        @sort-change="handleSortChange"
        :default-sort="{ prop: orderBy, order: 'descending' }"
      >
        <!-- 选择列 -->
        <el-table-column
          fixed
          v-if="hasCheckbox"
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <!-- 序号列 -->
        <el-table-column
          fixed
          type="index"
          width="80"
          align="center"
          :show-overflow-tooltip="true"
          :resizable="false"
          :index="indexMethod"
          label="序号"
        ></el-table-column>
        <!-- 数据列 -->
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :label="item.label"
          :align="item.align"
          :sortable="item.sortable"
          :prop="item.prop"
          :width="item.width"
          :min-width="item.minWidth"
          header-align="center"
          resizable
          show-overflow-tooltip
          :fixed="handlerFixed(item.columnLock)"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              v-show="item.funName"
              @click="linkJump(item.funName, scope.row)"
            >
              {{ scope.row[item.prop] | tableColumnFilter(item, scope.row) }}
            </el-button>
            <span v-show="!item.funName">
              <span>
                {{ scope.row[item.prop] | tableColumnFilter(item, scope.row) }}
              </span>
            </span>
          </template>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column
          fixed="right"
          :label="templateColumnData.chineseName"
          :width="templateColumnData.width"
          align="center"
          v-if="operColumn && operColumn.length > 0"
        >
          <template slot-scope="scope">
            <span v-for="(item, index) in btnFilter(scope.row)" :key="index">
              <el-button
                type="text"
                class="btnshow"
                @click="operColumnFunc(scope.$index, scope.row, index)"
                >{{ item.text }}</el-button
              >
            </span>
            <el-popover
              v-if="btnFilterHide(scope.row)"
              placement="right"
              width="150"
              trigger="hover"
            >
              <span
                class="hidebtnwrap"
                v-for="(item, index) in btnFilterHide(scope.row)"
                :key="index"
              >
                <el-button
                  type="text"
                  class="btnhide"
                  @click="operColumnFuncHide(scope.$index, scope.row, index)"
                  >{{ item.text }}</el-button
                >
              </span>
              <el-button slot="reference" style="margin-left: 10px" size="mini">
                更多
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-if="showTable"
        class="query-page-pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-size="pageSize"
        :page-sizes="[5, 10, 15, 20, 30]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="totalRecord"
      >
      </el-pagination>
      <!-- 动态组件，用于弹窗 -->
      <component
        :is="componentsData"
        :ref="dialogController"
        :tableData="tableData"
      ></component>
    </div>
  </el-card>
</template>
<script>
import queryCondition from "./queryCondition";
import queryPageCtrl from "./queryPageCtrl";
import queryPageFilter from "./queryPageFilter";
import commonMixins from "./commonMixins";

export default {
  name: "queryPage",
  mixins: [commonMixins],
  components: {
    queryCondition,
  },
  data() {
    return {
      showTable: false,
      loading: false,
      queryConfig: null, //查询框架所有配置数据
      pageKey: "", //页面Key
      pageController: "", //页面控制器
      dialogController: "",
      tableColumns: [], //表格表头信息及el-table-column其它参数
      templateColumnData: {}, //操作行配置
      operColumn: [], //操作行按钮
      operBtn: [],
      conditionColumns: [], //头部搜索配置

      orderBy: "",
      tableData: [], //表格数据

      hasCheckbox: false,
      selectRows: [],
      queryParams: {},
      pageNo: 1,
      pageSize: 10,
      pageWidth: 1200,
      totalRecord: 0,
    };
  },
  mounted() {
    this.pageKey = this.$route.params.pagekey;
    this.pageKey && this.initTableConfig();
  },
  methods: {
    //刷新，初始化所有数据
    refreshGridData() {
      this.initDefaultData();
      this.initTableConfig();
    },
    initDefaultData() {
      this.queryConfig = null;
      this.pageController = "";
      this.hasCheckbox = false;
      this.tableColumns = [];
      this.templateColumnData = {};
      this.operColumn = [];
      this.conditionColumns = [];
      this.showTable = false;
      this.tableData = [];
      this.operBtn = [];
      this.selectRows = [];
      this.totalRecord = 0;
      this.pageNo = 1;
      this.pageSize = 10;
      this.queryParams = {};
    },
    initTableConfig() {
      this.loading = true;
      //模拟请求
      this.axios.get("/api/queryPage/" + this.pageKey).then((res) => {
        //处理数据
        this.queryConfig = res.data.queryConfig;
        this.pageSize = this.queryConfig.pageSize;
        this.pageController = this.queryConfig.controller;
        this.dialogController = this.queryConfig.controller;

        //计算宽度
        let itemWidth = "";

        //表格表头信息及el-table-column其它参数
        let tableColumns = [];
        this.queryConfig.gridColumns.forEach((item) => {
          let item_align = "center";
          if (item.alignMode === 0) {
            item_align = "left";
          } else if (item.alignMode === 2) {
            item_align = "right";
          }
          tableColumns.push({
            prop: item.fieldName,
            label: item.chineseName,
            width: itemWidth,
            funName: item.funName,
            styleFilterName: item.styleFilterName,
            valueFilterName: item.valueFilterName,
            sortable: item.isTitle !== 0,
            align: item_align,
            columnLock: item.columnLock,
          });
        });
        this.tableColumns = tableColumns;

        //表格操作列
        if (
          Array.isArray(this.queryConfig.templateColumns) &&
          this.queryConfig.templateColumns.length
        ) {
          let templates = [],
            htmlElements = [],
            templateColumnData;
          this.queryConfig.templateColumns.forEach((item) => {
            if (item.type === "2") {
              this.hasCheckbox = true;
            }
            // 计算宽度
            let itemWidth = "";
            templateColumnData = item;
            templateColumnData.width = itemWidth;
          });
          //操作列配置
          if (templateColumnData) {
            htmlElements = JSON.parse(templateColumnData.htmlContent);
            this.templateColumnData = templateColumnData;
          }
          //操作列按钮
          if (Array.isArray(htmlElements) && htmlElements.length) {
            htmlElements.forEach((item) => {
              //暂不靠考虑权限控制authCode
              templates.push(item);
            });
            this.operColumn = templates;
          }
        }

        //头部按钮配置
        let buttons = [];
        this.queryConfig.buttons.forEach((item) => {
          //暂不靠考虑权限控制authCode
          buttons.push(item);
        });
        this.operBtn = buttons;

        //头部查询配置
        this.conditionColumns = this.queryConfig.conditionColumns;

        this.loading = false;
      });
    },
    //获取表格数据
    initTableData(queryParams) {
      let params = {};
      if (queryParams) {
        params = queryParams;
      } else {
        params = {
          pageNo: 1,
          pageSize: this.pageSize,
        };
      }
      this.loading = true;
      this.tableData = [];
      console.log("queryTableData params", params);
      //模拟数据请求
      this.axios.post("/api/queryTableData", params).then((res) => {
        this.showTable = true;
        this.tableData = res.data.data.list;
        this.loading = false;
      });
    },
    //头部搜索
    queryData(params, isReset, isHandleSearch) {
      //重置或手动搜索 设置页码为1
      if (isReset || isHandleSearch) {
        sessionStorage.setItem(this.pageKey + "-pageno", 1);
      }
      let queryParams = {
        pageNo: isReset
          ? 1
          : parseInt(sessionStorage.getItem(this.pageKey + "-pageno")) || 1,
        pageSize: this.pageSize,
        ...params,
      };
      this.initTableData(queryParams);
    },
    //分页序号展示
    indexMethod(index) {
      return (this.pageNo - 1) * this.pageSize + index + 1;
    },
    handleSelectChange(val) {
      this.selectRows = val;
    },
    handleSortChange() {},
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.initTableData(this.queryParams);
      sessionStorage.setItem(this.pageKey + "-pagesize", val);
    },
    handleCurrentChange(val) {
      this.queryParams.pageNo = val;
      this.initTableData(this.queryParams);
      sessionStorage.setItem(this.pageKey + "-pageno", val);
    },
    //固定列
    handlerFixed(val) {
      let data = false;
      if (val == 1) {
        data = true;
      }
      if (val == 2) {
        data = "right";
      }
      return data;
    },
    //一般为链接跳转用
    linkJump(funName, row) {
      queryPageCtrl[this.pageController][funName](row);
    },
    /***** 按钮过滤 start *****/
    handleButtonShow(row) {
      let list = [];
      this.operColumn.forEach((item) => {
        if (item.filterName && queryPageFilter[item.filterName]) {
          //return true按钮显示
          if (queryPageFilter[item.filterName](row)) {
            list.push(item);
          }
        } else {
          list.push(item);
        }
      });
      return list;
    },
    //按钮长度小于4
    btnFilter(row) {
      let list = this.handleButtonShow(row);

      if (list.length <= 4) {
        return list;
      } else {
        return list.splice(0, 3);
      }
    },
    //按钮长度大于4
    btnFilterHide(row) {
      let list = this.handleButtonShow(row);

      if (list.length <= 4) {
        return false;
      } else {
        list.splice(0, 3);
        return list;
      }
    },
    /***** 按钮过滤 end *****/
    //操作栏 操作函数
    operColumnFunc(index, row, typeIndex) {
      queryPageCtrl[this.pageController][
        this.btnFilter(row)[typeIndex].funName
      ].call(this, row, index, typeIndex);
    },
    operColumnFuncHide(index, row, typeIndex) {
      queryPageCtrl[this.pageController][
        this.btnFilterHide(row)[typeIndex].funName
      ].call(this, row, index, typeIndex);
    },
    //头部按钮图标
    btnIcon(item) {
      let iconClass = "";
      if (item.name.indexOf("导入") > -1) {
        iconClass = "el-icon-upload2";
      } else if (item.name.indexOf("导出") > -1) {
        iconClass = "el-icon-download";
      } else if (item.name.indexOf("新建") > -1) {
        iconClass = "el-icon-plus";
      }
      return iconClass;
    },
    //头部按钮函数
    btnfunc(btn) {
      if (btn.funName) {
        //checkbox
        if (btn.needCheckbox == 1) {
          queryPageCtrl[this.pageController][btn.funName].call(
            this,
            this.selectRows
          );
        }
        //导出公共函数，示例
        else if (btn.funName == "export") {
          let tag = this.$refs.queryCondition.queryData();
          let url = `api/export/${this.pageKey}`;
          this.$http({
            url: url,
            method: "post",
            data: tag,
            responseType: "arraybuffer",
          }).then((res) => {
            if (res) {
              let headers = res.headers;
              let content = headers["content-disposition"];
              let fileName = decodeURI(
                content.split(";")[1].split("fileName=")[1]
              );
              let blob = new Blob([res.data], {
                type: res.headers["content-type"],
              });
              let downloadElement = document.createElement("a");
              let href = URL.createObjectURL(blob);
              downloadElement.href = href;
              downloadElement.download = fileName;
              document.body.appendChild(downloadElement);
              downloadElement.click();
              document.body.removeChild(downloadElement);
              //释放掉blob对象
              URL.revokeObjectURL(href);
            }
          });
        } else {
          let funNameReg = /^([a-zA-Z_]|\$)([\w$]*)$/;
          if (funNameReg.test(btn.funName)) {
            queryPageCtrl[this.pageController][btn.funName].call(this);
          }
        }
      }
    },
  },
  filters: {
    tableColumnFilter(value, item, row) {
      let filterValue = null;
      if (item.valueFilterName && queryPageFilter[item.valueFilterName]) {
        filterValue = queryPageFilter[item.valueFilterName](value, item, row);
      } else {
        filterValue = value;
      }
      return filterValue;
    },
  },
};
</script>
<style lang="scss" scope>
.btnshow {
  margin: 0 5px;
}
.hidebtnwrap {
  display: block;
  text-align: center;
}
.btnhide {
  margin: 5px 0;
}
.query-page-pagination {
  margin: 20px 0 0 0;
  text-align: right;
}

.query-operation {
  border: 1px solid #ebeef5;
  border-bottom: 0;
  padding: 10px;
  background: #fbfbfb;
  text-align: left;
  font-size: 0;
  .el-button {
    padding: 10px;
    + .el-button {
      margin-left: 20px;
    }
  }
}
</style>
