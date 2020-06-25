
/* 
对axios进行二次包装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/

import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const ajax=axios.create({
  baseURL:'/api',//前缀路径
  timeout:20000, //连接请求超时时间
})

// 添加请求拦截器
ajax.interceptors.request.use((config)=>{
  // 显示请求进度条
  Nprogress.start()

  // 返出去config
  return config
})

// 添加响应拦截器
ajax.interceptors.response.use(
  response =>{
    // 隐藏进度条
    Nprogress.done()
    // 成功返回的数据不再是response,而直接是响应体数据response.data
    return response.data
  },

  error=>{
    Nprogress.done()

    // 4.统一处理请求错误 
    console.log('请求出错了')
    return Promise.reject(error) //返回失败的promise 具体请求可以处理
  }
)

const request=axios.create({
  baseURL:'/net',//前缀路径
  timeout:20000, //连接请求超时时间
})

// 添加请求拦截器
request.interceptors.request.use((config)=>{
  // 显示请求进度条
  Nprogress.start()

  // 返出去config
  return config
})

// 添加响应拦截器
request.interceptors.response.use(
  response =>{
    // 隐藏进度条
    Nprogress.done()
    // 成功返回的数据不再是response,而直接是响应体数据response.data
    return response.data
  },

  error=>{
    Nprogress.done()

    // 4.统一处理请求错误 
    console.log('请求出错了')
    return Promise.reject(error) //返回失败的promise 具体请求可以处理
  }
)
// 向外暴露ajax
export {ajax,request}