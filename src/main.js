import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import router from './router/index.js'
import store from './store'
import 'swiper/css/swiper.min.css' //引入swiper的css
import waterfall from 'vue-waterfall2'
import BScroll from "@better-scroll/core";
import ScrollBar from '@better-scroll/scroll-bar'
import { Form,Button,Field} from 'vant';

BScroll.use(ScrollBar)
Vue.use(waterfall)
Vue.use(Form)
Vue.use(Button)
Vue.use(Field)



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
