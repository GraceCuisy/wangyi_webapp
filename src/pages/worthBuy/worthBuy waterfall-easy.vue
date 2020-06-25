<template>
  <div class='worthBuyWrap'>
    <!-- 头部 -->
    <div class="header">
      <div class='header-l'>
        <router-link to="/">
          <i class="iconfont icon-ico-"></i>
        </router-link>
      </div>
      <div class='header-m'>值得买</div>
      <div class='header-r'>
        <router-link to="/search">
          <i class='searchIcon'></i>
        </router-link>
        <router-link to="/cart">
          <i class='iconfont icon-gouwuche'></i>
        </router-link>
      </div>
    </div>
    <div class='contentWrap'>
      <div class='contentContainer'>
          <!-- 中间横向标签滑屏区 -->
        <div class='swiperTabWrap'>
          <div class='swiperTab-tit'>
            <img class='upPic' src="../../common/images/worthBuy/topic_logo.png" alt="">
            <div class='upText'>严选好物 用心生活</div>
            <img class="upBg" src="../../common/images/worthBuy/topic_title_bg.png" alt="">
          </div>
          <div class='swiperTab'>
            <!-- 轮播图结构 -->
            <div class="swiper-container" ref="swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in navList.slice(0,navList.length/2)" :key='index'>
                  <div class='tabItem'>
                    <img :src="item.picUrl" alt="">
                    <div class='tabName'>{{item.mainTitle}}</div>
                    <div class='tabDec'>{{item.viceTitle}}</div>
                  </div>
                  <div class='tabItem'>
                    <img :src="navList[index+8].picUrl" alt="">
                    <div class='tabName'>{{navList[index+8].mainTitle}}</div>
                    <div class='tabDec'>{{navList[index+8].viceTitle}}</div>
                  </div>
                </div>
              </div>
              <!-- 如果需要分页器 -->
              <div class="swiper-pagination"></div>
              <!-- Add Scrollbar -->
              <!-- <div class="swiper-scrollbar"></div> -->
            </div>
          </div>
        </div>
        <!-- 下面瀑布流展示商品列表区域 -->
        <div class='productList'>
          <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData" srcKey='picUrl'>
            <div class="img-info" slot-scope="props">
              <p class="name-info">{{props.value.title}}</p>
              <div class='bottom-info'>
                <img class='avatar' :src="props.value.avatar" alt="">
                <span class='nickname'>{{props.value.nickname}}</span>
                <i class='eye-icon'></i>
                <span class='readCount'>{{props.value.readCount}}</span>
              </div>
            </div>
          </vue-waterfall-easy>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {reqWorthBuyNav,reqTopicFirstScreen,reqRecAuto} from '@/api'
import Swiper from 'swiper'
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
  name: 'worthBuy',
  components:{
    vueWaterfallEasy
  },
  data() {
    return {
      navList:[],//头部nav的数据
      topicList:[],//瀑布流的数据
      page:1,
      size:5,
    }
  },
  mounted() {
    this.getNavList()
    this.getTopicFirstScreen()
  },
  methods:{
    async getNavList(){
      const result=await reqWorthBuyNav()
      this.navList=result.data.navList
    },
    async getTopicFirstScreen(){
      const res=await reqTopicFirstScreen()
      this.topicList=res.data
    },
    // waterfall-easy 的getData方法
    getData(){
      reqRecAuto(this.page,this.size).then(res=>{
        this.topicList=this.topicList.concat(res.data.result)
        this.page++
      })
    }
  },
  computed: {
    imgsArr(){
        return this.topicList.reduce((pre,item)=>{
          pre=pre.concat(item.topics)
          return pre;
        },[])
    },
  },
  watch: {
    navList(){
      this.$nextTick(()=>{
        var swiper = new Swiper('.swiper-container', {
          slidesPerView: 4,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          // scrollbar: {
          //   el: '.swiper-scrollbar',
          //   hide: true,
          // },
        });
      })
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .worthBuyWrap
    width 100%
    .header
      display flex
      align-items center
      width 100%
      height 100px
      padding 0 26px
      background-color #FAFAFA
      .header-l
        a
         text-decoration none 
         color #666
         i
          font-size 60px
      .header-m
        flex 1
        font-size 36px
        text-align center
      .header-r
        width 141px
        display flex
        justify-content space-between
        align-items center
        a
          text-decoration none 
          color #666
          .searchIcon
            display inline-block
            width 45px
            height 45px
            background-image url('../../common/images/index/search.webp')
            background-size cover
            background-repeat no-repeat
          .iconfont
            font-size 60px
    .contentWrap
      width 100%
      .contentContainer
        .swiperTabWrap
          position relative
          width 100%
          height 685px
          background-color #eee
          .swiperTab-tit
            position absolute
            width 100%
            height 518px
            .upBg
              position absolute
              left 0
              top 0
            .upPic
              position absolute
              z-index 2
              left 10px
              top 30px
              width 130px
              height 68px
            .upText
              position absolute
              z-index 2
              left 150px
              top 50px
              font-size 28px
              color #fff
          .swiperTab
            position absolute
            left 20px
            top 115px
            width 710px
            height 540px
            background-color #fff
            border-radius 13px
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  width 178px
                  height 100%
                  .tabItem
                    padding-top 36px
                    padding-left 25px
                    width 100%
                    img 
                      width 120px
                      height 120px
                    .tabName
                      font-size 28px
                    .tabDec
                      font-size 24px
                      color #666
        .productList
          height calc(100vh - 883px)
          background-color #eee
          .img-inner-box
            box-shadow none !important
            .img-info
              background-color #fff
              .name-info
                font-size 28px !important
              .bottom-info
                display flex
                align-items center
                padding 30px 0
                .avatar
                  width 48px
                  height 48px
                  border-radius 50%
                .nickname
                  font-size 24px
                  color #666
                  margin-left 10px
                  flex 1
                .eye-icon
                  display inline-block
                  width 32px
                  height 32px
                  background-image url('../../common/images/worthBuy/eye.png')
                  background-size cover
                  background-repeat no-repeat
                .readCount
                  color #666
                  margin-right 5px
.text
  font-size 0
</style>
