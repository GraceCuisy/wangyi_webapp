<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in carouselList" :key="index">
        <img :src="item" alt="">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

  </div>
</template>

<script>
import Vue from 'vue'
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props:{
    carouselList:Array // 外部传入轮播列表数据
  },
  watch: {
    // 监视carouselList  一般监视就可以
    carouselList: {
      handler () { // 说明carouselList状态数据发了改变, 但界面还没有更新

        // 只有数组中有数据, 才需要创建swiper对象 
        if (this.carouselList.length===0) return

       // console.log('watch carouselList', this.carouselList.length)  // 执行3次行
        /* 
        数据绑定流程 ==> 更新状态数据  ==> 同步调用监视的回调函数 ==> 界面就会自动 `异步`更新
        */
        // vm.$nextTick( [callback] )
        // 将回调延迟到下次 DOM 更新循环(更新界面)之后执行。$nextTick()在修改数据之后立即调用，然后等待 DOM 更新
        // this.$nextTick(() => {// 回调函数在界面更新之后执行
        Vue.nextTick(() => {// 回调函数在界面更新之后执行
          // 必须在轮播列表界面显示之后创建
          new Swiper(this.$refs.swiper, { // 可以, 只会匹配, 当前组件中的对应元素
            // direction: 'vertical', // 垂直切换选项   默认是水平轮播
            loop: true, // 循环模式
            autoplay:true, //自动轮播
            // 分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      },
      immediate: true, // 在初始显示时就立即执行一次, 默认是false(只有数据改变才立即执行)
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
