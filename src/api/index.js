// 包含所有接口的请求函数
var qs=require('querystring')
import {ajax, request} from './ajax'

// 获取首页的数据
export const reqIndexData=()=> ajax.get('/getIndexData')

// 获取首页nav模块对应的数据
export const reqIndexCateModule=()=>ajax.get('/getIndexCateModule')

// 获取分类页面的左侧导航数据
export const reqCateNavDatas=()=>ajax.get('/getcateNavDatas')

// 获取分类右侧内容数据
export const reqCateLists=()=>ajax.get('/getcateLists')

// 请求登录
export const reqLogin=(mobile,password)=>ajax.post('/login',{mobile, password})
// 请求退出登录的接口
export const reqLogout=()=>ajax.get('/logout')

// 获取值得买页面的nav(tab)数据
export const reqWorthBuyNav=()=>request.get('/topic/v1/know/navWap.json')

// 获取值得买瀑布流数据首屏数据
export const reqTopicFirstScreen=()=>request.get('/topic/v1/find/recManual.json')
// 获取值得买瀑布流触底加载数据
export const reqRecAuto=(page,size)=>request.get('/topic/v1/find/recAuto.json',{
  params:{
    page,
    size
  }
})
// 获取搜索界面初始化显示数据
export const reqSearchInitData=()=> request.post('/xhr/search/init.json')
// search界面的关键字搜索接口
export const reqKeywordSearch=(keywordPrefix)=>request.post('/xhr/search/searchAutoComplete.json',
qs.stringify({
  keywordPrefix
}))
