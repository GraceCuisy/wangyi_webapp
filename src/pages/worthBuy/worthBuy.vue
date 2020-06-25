<template>
  <div class='worthBuyWrap'>
    <!-- 头部 -->
    <Header class='header' :title="`值得买`"></Header>

    <div class='contentWrap' ref="contentWrap">
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
              <!-- 自定义分页器的容器 -->
              <ul class="pagination"></ul>
            </div>
          </div>
        </div>
        <!-- 下面瀑布流展示商品列表区域 -->
        <div class="container-water-fall">
          <waterfall class="water-fall" :data="imgsArr">
            <template >
              <div class="cell-item" v-for="(item,index) in imgsArr">
                <img v-if="item.picUrl" :lazy-src="item.picUrl" alt="加载错误"  /> 
                <div class="item-body">
                    <div class="item-desc">{{item.title}}</div>
                    <div class="item-footer">
                        <div class="avatar" :style="{backgroundImage : `url(${item.avatar})` }"></div>
                        <div class="name">{{item.nickname}}</div>
                        <div class="like" >
                          <i class='eyeIcon'></i>
                          <div class="like-total">{{item.readCount>1000 ? `${Math.floor(item.readCount/1000)}k` : item.readCount }}</div>  
                        </div>
                    </div>
                </div>
              </div>
            </template>
          </waterfall>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from 'components/Header/Header'
import BScroll from 'better-scroll'
import {reqWorthBuyNav,reqTopicFirstScreen,reqRecAuto} from '@/api'
import Swiper from 'swiper'
export default {
  name: 'worthBuy',
  components:{
    Header,
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
    this.$nextTick(()=>{
      this.scroll=new BScroll(this.$refs.contentWrap,{
        scrollY:true,
        click:true,
        mouseWheel:true,
        probeType:1,
        scrollbar:true
      })
      this.scroll.on('scroll',this.onScroll)
    })
  },
  methods:{
    onScroll(pos){
      const contentH=document.querySelector('.contentContainer').clientHeight
      const contentWrapH=document.querySelector('.contentWrap').clientHeight
  
      // console.log(contentH);
      // console.log(contentWrapH-pos.y);
      // console.log(pos.y);
      if(contentWrapH-pos.y>=contentH){
        this.loadmore()
      }
    },
    async getNavList(){
      const result=await reqWorthBuyNav()
      this.navList=result.data.navList
    },
    async getTopicFirstScreen(){
      const res=await reqTopicFirstScreen()
      this.topicList=res.data
    },
    loadmore(){
      // console.log('loadmore执行了');
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
        this.scroll.refresh() 
    },
  },
  watch: {
    navList(){
      this.$nextTick(()=>{
        var swiper = new Swiper('.swiper-container', {
          slidesPerView: 4,
          pagination: {
            el: '.pagination',
            type:'custom',
            renderCustom: function (swiper, current, total) {
              var _html = '';
              for (var i = 1; i <=total; i++) {
                if (current == i) {
                  _html += '<li class="customLi active"></li>';
                }else{
                  _html += '<li class="customLi"></li>';
                }
              }
              return _html;//返回所有的页码html
            }
          },
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
      position relative
      z-index 2
      height 100px
    .contentWrap
      width 100%
      height calc(100vh - 198px)
      .contentContainer
        .swiperTabWrap
          position relative
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
              position relative
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
              .swiper-pagination-custom
                display flex
                position absolute
                left 50%
                transform translateX(-100px)
                bottom 30px
                width 200px
                height 5px
                background-color #eee
                .customLi
                  width 50px
                  height 5px
                  &.active
                    background-color #dd1a21
        .container-water-fall
          width 100%
          padding 25px 10px 0
          background-color #eee
          .water-fall
            .cell-item
              margin 0 10px 20px
              img 
                border-radius 20px 20px 0 0
              .item-body
                background-color #fff
                .item-desc
                  font-size 29px
                  padding 18px 16px
                  color #333
                .item-footer
                  display flex
                  padding 16px 16px 24px
                  align-items center
                  .avatar
                    width 48px
                    height 48px
                    background-size cover
                    background-repeat no-repeat
                    border-radius 50%
                  .name
                    flex 1
                    color #333
                    margin-left 5px
                  .like
                    display flex
                    .eyeIcon
                      display inline-block
                      width 32px
                      height 32px
                      background-image url('../../common/images/worthBuy/eye.png')
                      background-size cover
                      background-repeat no-repeat
                    .like-total
                      color #333
.text
  font-size 0
</style>
