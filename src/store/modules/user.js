// 管理用户信息相关的模块
import {RECEIVE_USER_INFO,RESET_USER_INFO} from '../mutation-types'
import {reqLogin,reqLogout} from '@/api'
const state={
  // 读取的操作发生在初始化访问项目或刷新
  userInfo:JSON.parse(localStorage.getItem('user_info_key')) || {},
}

const mutations={
  [RECEIVE_USER_INFO](state,userInfo){
    state.userInfo=userInfo
  },
  [RESET_USER_INFO](state){
    state.userInfo={}
  }
}

const actions={
  // 请求登录的异步action
  async reqLogin({commit},{mobile,password}){
    const result=await reqLogin(mobile,password)
    if(result.code===200){ //登录成功
      const userInfo=result.data;
      localStorage.setItem('user_info_key',JSON.stringify(userInfo))
      commit(RECEIVE_USER_INFO,userInfo)
    }else{ //登录失败
      throw new Error('登录失败')
    }
  },
  // 请求退出登录的异步action
  async requestLogout({commit},){
    const result=await reqLogout()
      if(result.code===200){//退出登录成功
        commit(RESET_USER_INFO)
        // 清除local中的userInfo
        localStorage.removeItem('user_info_key')
      }
  }
}

const getters={

}

export default {
  state,
  mutations,
  actions,
  getters,
}