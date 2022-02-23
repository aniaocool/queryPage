import mockjs from 'mockjs'
import { getUserList,results } from './query'

const Mock = require('mockjs')
//模拟表格数据
Mock.mock("/api/queryTableData", "post", getUserList);
//模拟查询框架配置数据
Mock.mock(/\/api\/queryPage\/test.*/, "get", results);
export default mockjs