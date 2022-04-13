<template>
  <div name="查询框架配置页面" id="queryPageConfig">
    <!-- 查询主配置 -->
    <el-card class="rowBox">
      <div slot="header">查询主配置</div>
      <el-form
        :model="queryConfig"
        label-width="160px"
        label-suffix="："
        :inline="true"
      >
        <el-form-item label="页面名称">
          <el-input clearable v-model="queryConfig.pageName"></el-input>
        </el-form-item>
        <el-form-item label="页面key">
          <el-input
            clearable
            v-model="queryConfig.pageKey"
            @change="setQueryDataUrl()"
          ></el-input>
        </el-form-item>
        <el-form-item label="分页大小">
          <el-input clearable v-model="queryConfig.pageSize"></el-input>
        </el-form-item>
        <el-form-item label="grid宽度">
          <el-input clearable v-model="queryConfig.gridWidth"></el-input>
        </el-form-item>
        <el-form-item label="显示查询按钮">
          <el-select v-model="queryConfig.queryButtonIsShow">
            <el-option
              :value="item.value"
              :label="item.name"
              v-for="(item, index) in isYes"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="控制器">
          <el-input clearable v-model="queryConfig.controller"></el-input>
        </el-form-item>
        <el-form-item label="页面查询功能url">
          <el-row type="flex">
            <span>#/queryPage/{{ queryConfig.pageKey }}</span>
            <el-col :offset="2">
              <el-button type="success" @click="save()">保存</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 按钮配置 -->
    <el-card class="rowBox">
      <div slot="header" class="rowHeader">
        <span>按钮配置</span>
        <el-button type="primary" @click="addButton()" class="right"
          >新增</el-button
        >
      </div>
      <el-table :data="queryConfig.buttons" strip max-height="400px">
        <el-table-column label="按钮名称" prop="name">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="funName" prop="funName">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.funName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="按钮显示顺序" prop="sort">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.sort"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="按钮样式class" prop="styleClassName">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.styleClassName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="按钮位置" prop="position">
          <template slot-scope="scope">
            <el-select v-model="scope.row.position">
              <el-option
                :value="item.value"
                :label="item.name"
                v-for="(item, index) in positions"
                :key="index"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="删除">
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click="delButton(scope.$index)"
              class="right"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- gridColumn配置 -->
    <el-card class="rowBox">
      <div slot="header" class="rowHeader">
        <span>gridColumn配置</span>
      </div>
      <el-table :data="queryConfig.gridColumns" strip max-height="400px">
        <el-table-column label="字段名称" prop="fieldName">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.fieldName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="固定列" prop="columnLock">
          <template slot-scope="scope">
            <el-select v-model="scope.row.columnLock">
              <el-option label="不固定" :value="0"></el-option>
              <el-option label="左" :value="1"></el-option>
              <el-option label="右" :value="2"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="字段类型" prop="fieldType">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.fieldType"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="显示列宽" prop="columnLength">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.columnLength"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="中文名称" prop="chineseName">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.chineseName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" prop="chineseName">
          <template slot-scope="scope">
            <el-select v-model="scope.row.isShow">
              <el-option
                :value="item.value"
                :label="item.name"
                v-for="(item, index) in isYes"
                :key="index"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="显示顺序" prop="sort">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.sort"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="对齐方式">
          <template slot-scope="scope">
            <el-select v-model="scope.row.alignMode">
              <el-option
                :value="item.value"
                :label="item.name"
                v-for="(item, index) in alignModes"
                :key="index"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="title属性">
          <template slot-scope="scope">
            <el-select v-model="scope.row.isTitle">
              <el-option
                :value="item.value"
                :label="item.name"
                v-for="(item, index) in columnLocks"
                :key="index"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="funName" prop="funName">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.funName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="值显示格式过滤器" prop="valueFilterName">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.valueFilterName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="值显示样式过滤器" prop="styleFilterName">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.styleFilterName"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 模板列配置 -->
    <el-card class="rowBox">
      <div slot="header" class="rowHeader">
        <span>模板列配置</span>
        <el-button type="primary" @click="addTemplateColumn()" class="right"
          >新增</el-button
        >
      </div>
      <el-table :data="queryConfig.templateColumns" strip max-height="400px">
        <el-table-column label="中文名称" prop="chineseName">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.chineseName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="列宽" prop="columnLength">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.columnLength"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="显示顺序" prop="sort">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.sort"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="列锁" prop="columnLock">
          <template slot-scope="scope">
            <el-select v-model="scope.row.columnLock">
              <el-option
                :value="item.value"
                :label="item.name"
                v-for="(item, index) in columnLocks"
                :key="index"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="按钮位置" prop="position">
          <template slot-scope="scope">
            <el-select v-model="scope.row.position">
              <el-option
                :value="item.value"
                :label="item.name"
                v-for="(item, index) in positions"
                :key="index"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="模板类型" prop="type">
          <template slot-scope="scope">
            <el-select v-model="scope.row.type">
              <el-option
                :value="item.value"
                :label="item.name"
                v-for="(item, index) in templateTypes"
                :key="index"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="模板html内容" prop="htmlContent">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.htmlContent"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="删除">
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click="delTemplateColumn(scope.$index)"
              class="right"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 查询条件配置 -->
    <el-card class="rowBox">
      <div slot="header" class="rowHeader">
        <span>查询条件配置</span>
      </div>
      <el-table :data="queryConfig.conditionColumns" strip max-height="400px">
        <el-table-column label="字段名称" prop="fieldName">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.fieldName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="字段类型" prop="fieldType">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.fieldType"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="中文名称" prop="chineseName">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.chineseName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="水印名称" prop="placeholderName">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.placeholderName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="显示顺序" prop="sort">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.sort"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否查询" prop="isQuery">
          <template slot-scope="scope">
            <el-select v-model="scope.row.isQuery">
              <el-option
                :value="item.value"
                :label="item.name"
                v-for="(item, index) in isYes"
                :key="index"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="组件类型" prop="controlType">
          <template slot-scope="scope">
            <el-select v-model="scope.row.controlType">
              <el-option
                :value="item.value"
                :label="item.name"
                v-for="(item, index) in controlTypes"
                :key="index"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="组件URL" prop="controlDataUrl">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.controlDataUrl"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="组件默认数据" prop="controlData">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.controlData"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="组件显示值属性" prop="displayProperty">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.displayProperty"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="组件绑定值属性" prop="valueProperty">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.valueProperty"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="组件默认值" prop="defaultValue">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.defaultValue"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="搜索属性" prop="searchProperty">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.searchProperty"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "queryPageConfig",
  data() {
    return {
      queryConfig: {},
      isYes: [
        //是否下拉框选值
        { name: "是", value: 1 },
        { name: "否", value: 0 },
      ],
      positions: [
        //按钮位置下拉框选值
        { name: "左边", value: 0 },
        { name: "右边", value: 1 },
      ],
      alignModes: [
        //对齐方式
        { name: "左对齐", value: 0 },
        { name: "居中对齐", value: 1 },
        { name: "右对齐", value: 2 },
      ],
      columnLocks: [
        //列锁
        { name: "有", value: 1 },
        { name: "没有", value: 0 },
      ],
      templateTypes: [
        //模板类型下拉框
        { name: "多选列", value: "2" },
        { name: "模板列", value: "3" },
      ],
      controlTypes: [
        { name: "Input", value: "Input" },
        { name: "Select", value: "Select" },
        { name: "MulSelect", value: "MulSelect" },
        { name: "DateRange", value: "DateRange" },
        { name: "Date", value: "Date" },
      ],
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    setQueryDataUrl() {
      this.queryConfig.queryDataUrl =
        "api/queryData/" + this.queryConfig.pageKey;
      this.queryConfig.controller = this.queryConfig.pageKey + "Ctrl";
    },
    save() {},
    //添加自定义按钮
    addButton() {
      let length = this.queryConfig.buttons.length + 1;
      this.queryConfig.buttons.push({ sort: length, position: 0 });
    },
    //删除按钮
    delButton(index) {
      this.queryConfig.buttons.splice(index, 1);
    },
    //添加模板列
    addTemplateColumn() {
      let length = this.queryConfig.templateColumns.length + 1;
      this.queryConfig.templateColumns.push({
        sort: length,
        columnLock: 0,
        type: "3",
      });
    },
    //删除模板列
    delTemplateColumn(index) {
      this.queryConfig.templateColumns.splice(index, 1);
    },
    //获取数据
    getInfo() {
      if (this.$route.params.pagekey) {
        this.axios
          .get("/api/queryPage/" + this.$route.params.pagekey)
          .then((res) => {
            console.log(res);
            this.queryConfig = res.data.queryConfig;
          })
          .catch((error) => {
            if (error) {
              this.$message({
                message: "获取数据失败",
                type: "error",
              });
            }
          });
      }
    },
    //保存数据
    save() {
      const data = encodeURIComponent(JSON.stringify(this.queryConfig));
      console.log(data);
    },
  },
};
</script>
<style lang="scss" scoped>
#queryPageConfig {
  .rowBox {
    margin-bottom: 30px;
  }
  .rowHeader {
    overflow: hidden;
    span {
      line-height: 40px;
    }
    .right {
      float: right;
    }
  }
}
</style>
