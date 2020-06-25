import Vue from 'vue'
import Vuex from 'vuex'
import indexModule from './modules/index.js'
import userModule from './modules/user.js'

// 声明使用vuex
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    indexModule,
    userModule
  }
})