import Mock from 'mockjs'

const code = 200;
export let getUserList = () => {
    return {
        data: Mock.mock({
            'list|10': [{
                'name': "@cname",
                'type|1-2': 1,
                'time': '@datetime',
                'memo':'@word(3, 5)',
                'status|1-2':1,
                'bizSn':'@string("upper", 4)@string("number", 11)'
            }]
        }),
        code: code
    }
} 
export const results = {
  queryConfig: {
    buttons: [
      {
        funName: "see",
        id: 1,
        name: "查看",
        position: 0,
        queryconfigId: 1,
        sort: 1,
        styleClassName: "",
      },
    ],
    conditionColumns: [
      {
        chineseName: "业务流水号",
        controlData: "",
        controlDataUrl: "",
        controlType: "Input",
        defaultValue: "",
        displayProperty: "",
        fieldName: "bizSn",
        fieldType: "String",
        id: 1,
        isQuery: 1,
        placeholderName: "",
        queryconfigId: 1,
        searchProperty: "",
        sort: 1,
        valueProperty: "",
      },
      {
        chineseName: "状态",
        controlData: '[{"name":"成功","value":"1"},{"name":"失败","value":"2"}]',
        controlDataUrl: "",
        controlType: "Select",
        defaultValue: "1",
        displayProperty: "name",
        fieldName: "status",
        fieldType: "String",
        id: 2,
        isQuery: 1,
        placeholderName: "",
        queryconfigId: 2,
        searchProperty: "",
        sort: 1,
        valueProperty: "value",
      },
      {
        chineseName: "多选状态",
        controlData: '[{"name":"成功","value":"1"},{"name":"失败","value":"2"}]',
        controlDataUrl: "",
        controlType: "MulSelect",
        defaultValue: "",
        displayProperty: "name",
        fieldName: "spstatus",
        fieldType: "String",
        id: 3,
        isQuery: 1,
        placeholderName: "",
        queryconfigId: 3,
        searchProperty: "",
        sort: 1,
        valueProperty: "value",
      },
      {
        chineseName: "申请人",
        controlData: "",
        controlDataUrl: "",
        controlType: "Input",
        defaultValue: "",
        displayProperty: "",
        fieldName: "dd",
        fieldType: "String",
        id: 4,
        isQuery: 1,
        placeholderName: "",
        queryconfigId: 4,
        searchProperty: "",
        sort: 1,
        valueProperty: "",
      },
      {
        chineseName: "日期范围",
        controlData: "",
        controlDataUrl: "",
        controlType: "DateRange",
        defaultValue: "",
        displayProperty: "",
        fieldName: "datetime",
        fieldType: "Date",
        id: 5,
        isQuery: 1,
        placeholderName: "",
        queryconfigId: 5,
        searchProperty: "",
        sort: 1,
        valueProperty: "",
      },
      {
        chineseName: "日期",
        controlData: "",
        controlDataUrl: "",
        controlType: "Date",
        defaultValue: "",
        displayProperty: "",
        fieldName: "date",
        fieldType: "Date",
        id: 6,
        isQuery: 1,
        placeholderName: "",
        queryconfigId: 6,
        searchProperty: "",
        sort: 1,
        valueProperty: "",
      },
      {
        chineseName: "日期",
        controlData: "",
        controlDataUrl: "",
        controlType: "Date",
        defaultValue: "",
        displayProperty: "",
        fieldName: "date",
        fieldType: "Date",
        id: 7,
        isQuery: 1,
        placeholderName: "",
        queryconfigId: 7,
        searchProperty: "",
        sort: 1,
        valueProperty: "",
      },
    ],
    controller: "testCtrl",
    gridColumns: [
      {
        alignMode: 1,
        chineseName: "业务流水号",
        columnLength: "",
        columnLock: 0,
        fieldName: "bizSn",
        fieldType: "String",
        funName: "",
        id: 1,
        isShow: 1,
        isTitle: 1,
        queryconfigId: 1,
        sort: "",
        styleFilterName: "",
        valueFilterName: "",
      },
      {
        alignMode: 1,
        chineseName: "业务类别",
        columnLength: "",
        columnLock: 0,
        fieldName: "type",
        fieldType: "String",
        funName: "",
        id: 2,
        isShow: 1,
        isTitle: 1,
        queryconfigId: 2,
        sort: "",
        styleFilterName: "",
        valueFilterName: "typeFilter",
      },
      {
        alignMode: 1,
        chineseName: "业务描述",
        columnLength: "",
        columnLock: 0,
        fieldName: "memo",
        fieldType: "String",
        funName: "",
        id: 3,
        isShow: 1,
        isTitle: 1,
        queryconfigId: 3,
        sort: "",
        styleFilterName: "",
        valueFilterName: "",
      },
      {
        alignMode: 1,
        chineseName: "申请时间",
        columnLength: "",
        columnLock: 0,
        fieldName: "time",
        fieldType: "String",
        funName: "",
        id: 4,
        isShow: 1,
        isTitle: 1,
        queryconfigId: 4,
        sort: "",
        styleFilterName: "",
        valueFilterName: "",
      },
      {
        alignMode: 1,
        chineseName: "申请人",
        columnLength: "",
        columnLock: 0,
        fieldName: "name",
        fieldType: "String",
        funName: "",
        id: 5,
        isShow: 1,
        isTitle: 1,
        queryconfigId: 5,
        sort: "",
        styleFilterName: "",
        valueFilterName: "",
      },
      {
        alignMode: 1,
        chineseName: "状态",
        columnLength: "",
        columnLock: 0,
        fieldName: "status",
        fieldType: "String",
        funName: "",
        id: 6,
        isShow: 1,
        isTitle: 1,
        queryconfigId: 6,
        sort: "",
        styleFilterName: "",
        valueFilterName: "statusFilter",
      },
    ],
    gridWidth: "100%",
    id: 1,
    pageKey: "test",
    pageName: "我的测试",
    pageSize: 10,
    queryButtonIsShow: 1,
    queryDataUrl: "api/queryData/test",
    templateColumns: [
      {
        chineseName: "操作",
        columnLength: "10%",
        columnLock: 0,
        id: 12,
        queryconfigId: 12,
        sort: 1,
        type: "3",
        htmlContent:
          '[{"text":"详情1","filterName":"detailButtonFilter","funName":"goDetail1"},{"text":"详情2","filterName":"detailButtonFilter","funName":"goDetail2"},{"text":"详情3","filterName":"detailButtonFilter","funName":"goDetail3"},{"text":"详情4","filterName":"detailButtonFilter4","funName":"goDetail4"},{"text":"详情5","filterName":"detailButtonFilter","funName":"goDetail5"}]',
      },
    ],
  },
}
