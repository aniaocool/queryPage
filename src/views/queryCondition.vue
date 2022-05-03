<template>
  <el-row
    class="condition-wrap clear-both"
    v-if="Array.isArray(conditionData) && conditionData.length"
  >
    <!-- 左侧查询条件 -->
    <el-col :span="19">
      <el-form
        label-width="140px"
        class="query-search-form"
        ref="queryForm"
        label-suffix="："
      >
        <el-row>
          <el-col
            :md="12"
            :lg="8"
            :xl="7"
            v-for="(item, index) in conditionData"
            :key="index"
            v-show="!conditionShow ? index < 6 : true"
          >
            <!-- 输入框 -->
            <el-form-item
              v-if="item.controlType === 'Input'"
              :label="item.chineseName"
            >
              <el-input
                class="query-search-input"
                v-model="queryParamCon[item.fieldName].value"
                :placeholder="item.placeholder"
                @keyup.enter.native="queryData(false, true)"
              ></el-input>
            </el-form-item>
            <!-- 选择框 -->
            <el-form-item
              v-if="item.controlType === 'Select'"
              :label="item.chineseName"
            >
              <el-select
                class="query-search-input"
                v-model="queryParamCon[item.fieldName].value"
              >
                <el-option value label="全部"></el-option>
                <el-option
                  v-for="option in item.controlData"
                  :key="option[item.valueProperty]"
                  :label="option[item.displayProperty]"
                  :value="option[item.valueProperty]"
                  :placeholder="item.placeholderName"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 多选框 -->
            <el-form-item
              v-if="item.controlType === 'MulSelect'"
              :label="item.chineseName"
            >
              <el-select
                class="query-search-input"
                v-model="queryParamCon[item.fieldName].value"
                placeholder="全部"
                multiple
              >
                <el-option
                  v-for="option in item.controlData"
                  :key="option[item.valueProperty]"
                  :label="option[item.displayProperty]"
                  :value="option[item.valueProperty]"
                  :placeholder="item.placeholderName"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 日期范围时间框 -->
            <el-form-item
              v-if="item.controlType === 'DateRange'"
              :label="item.chineseName"
            >
              <el-date-picker
                unlink-panels
                type="daterange"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束如期"
                :default-time="['00:00:00', '23:59:59']"
                class="query-search-input"
                v-model="queryParamCon[item.fieldName].value"
              ></el-date-picker>
            </el-form-item>
            <!-- 日期框 -->
            <el-form-item
              v-if="item.controlType === 'Date'"
              :label="item.chineseName"
            >
              <el-date-picker
                unlink-panels
                type="date"
                value-format="yyyy-MM-dd"
                class="query-search-input"
                v-model="queryParamCon[item.fieldName].value"
                :placeholder="item.placeholder"
              ></el-date-picker>
            </el-form-item>
            <!-- 需要则继续添加 -->
          </el-col>
        </el-row>
      </el-form>
    </el-col>
    <!-- 右侧查询按钮 -->
    <el-col :span="4" :offset="1" style="min-width: 185px">
      <el-row type="flex" justify="end" align="top">
        <div class="btn-group clear-both">
          <el-link
            style="margin: 10px"
            type="primary"
            v-show="conditionData.length > 6"
            :underline="false"
            :icon="conditionShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            @click="conditionShow = !conditionShow"
            >{{ conditionShow ? "收起" : "展开" }}</el-link
          >
          <el-button @click="resetData()">重置</el-button>
          <el-button
            type="primary"
            @click="queryData(false, true)"
            @keyup.enter="queryData(false, true)"
            >查询</el-button
          >
        </div>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "queryCondition",
  props: ["conditionColumns"],
  data() {
    return {
      getNum: 0,
      columnInitNum: 0,
      queryParamCon: {},
      conditionData: [],
      value: {},
      conditionShow: false,
      initParam: false,
    };
  },
  watch: {
    conditionColumns: {
      handler(value) {
        if (Array.isArray(value) && value) {
          this.initConditionData(JSON.parse(JSON.stringify(value)));
        }
      },
    },
  },
  methods: {
    initConditionData(data) {
      this.$set(this, "queryParamCon", {});
      this.conditionData = [];
      this.initConditionList(data);
    },
    initConditionList(data) {
      data.forEach((item) => {
        if (item.controlType === "Select" || item.controlType === "MulSelect") {
          this.$set(this.queryParamCon, item.fieldName, {
            controlType: item.controlType,
            defaultValue: item.defaultValue || "",
            value: item.defaultValue || "",
          });
          //选项处理
          if (item.controlData) {
            if (Array.isArray(item.controlData)) {
              console.log("isarray");
            } else if (typeof item.controlData === "string") {
              try {
                item.controlData = JSON.parse(item.controlData);
              } catch (e) {
                console.log("error", e);
              }
            }
          } else {
            //未返回数据请求接口
            if (item.controlDataUrl) {
              ++this.getNum;
              //举例
              this.$axios
                .get(item.controlDataUrl, { $LoadingMsg: "" })
                .then((res) => {
                  let options = res.data.data;
                  if (options) {
                    if (Array.isArray(options) && options.length) {
                      item.controlData = options;
                    }
                  }
                })
                .finally(() => {
                  ++this.columnInitNum;
                });
            }
          }
        } else if (item.controlType === "DateRange") {
          this.$set(this.queryParamCon, item.fieldName, {
            controlType: item.controlType,
            defaultValue: item.defaultValue
              ? JSON.parse(item.defaultValue)
              : null,
            value: item.defaultValue ? JSON.parse(item.defaultValue) : null,
          });
        } else {
          this.$set(this.queryParamCon, item.fieldName, {
            controlType: item.controlType,
            defaultValue: item.defaultValue || "",
            value: item.defaultValue || "",
          });
        }
      });
      this.conditionData = data;
      this.queryData();
    },
    formatQueryParamCon() {
      //读取session数据
      if (!this.initParam) {
        let sessionparamstr = sessionStorage.getItem(
          this.$route.params.pagekey + "-params"
        );
        if (sessionparamstr) {
          let sessionparams = JSON.parse(sessionparamstr);
          Object.keys(sessionparams).forEach((key) => {
            if (!this.queryParamCon[key]) {
              this.queryParamCon[key] = { value: "" };
            }
            this.queryParamCon[key].value = sessionparams[key];
          });
        }
        this.initParam = true;
      }

      //初始化查询数据存储session, 更新session数据
      if (Object.keys(this.queryParamCon).length) {
        let storgeParam = {};
        Object.keys(this.queryParamCon).forEach((key) => {
          storgeParam[key] = this.queryParamCon[key].value;
        });
        sessionStorage.setItem(
          this.$route.params.pagekey + "-params",
          JSON.stringify(storgeParam)
        );
      }

      let params = {};
      for (let key in this.queryParamCon) {
        (this.queryParamCon[key].value ||
          this.queryParamCon[key].value === 0) &&
          (params[key] = this.queryParamCon[key].value);
      }
      return params;
    },
    queryData(isReset, isHandleSearch) {
      let params = this.formatQueryParamCon();
      for (let item in params) {
        if (typeof params[item] == "string") {
          params[item] = params[item].trim();
        }
        if (Array.isArray(params[item])) {
          params[item] = params[item].toString();
        }
      }
      this.$emit("queryData", params, isReset, isHandleSearch);
      return params;
    },
    resetData() {
      for (let key in this.queryParamCon) {
        this.queryParamCon[key].value = this.queryParamCon[key].defaultValue;
      }
      this.queryData(true);
    },
  },
};
</script>
<style lang="scss">
.condition-wrap {
  display: flex;
  .el-col {
    margin-bottom: 15px;
  }
  .query-search-form {
    .query-search-input {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .btn-group {
    text-align: right;
    padding-bottom: 9px;
  }
}
</style>
