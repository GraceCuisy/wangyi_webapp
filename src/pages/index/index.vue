<template>
  <div class='indexContainer'>
    <div class='header'>
      <a class='logo' href="javascript:;"></a>
      <div class='search' @click="toSearch">
        <i class="fang"></i>
        <span>搜索商品,共33504款好物</span>
      </div>
      <div class='loginBtn' v-if="!userInfo.nickname">
        <router-link to='/login'>登录</router-link>
      </div>
    </div>
    <!-- 导航区 -->
    <div class="navWrap">
      <div class='scrollContainer'>
        <ul class='navList'>
          <li 
            class='navItem'
            id='0'
            :class='{active:navId===0}' 
            @click="toCurrent()"
          >推荐</li>
          <li 
            class='navItem'
            id='navItem.id'
            :class='{active:navId===navItem.id}'
            v-for="(navItem,index) in indexCateModule" 
            :key='navItem.id'
            @click="changeNav($event,navItem.id)"
          >{{navItem.name}}</li>
        </ul>
      </div>
      <div class='toggleWrap'>
        <div class='liner'></div>
        <div class='toggle' @click="handleToggle">
          <div class='toggleIcon'></div>
        </div>
      </div>
      <!-- 点击三角展开内容区 -->
      <div class='tabWrap' v-if="isShowMask">
        <div class='allText'>全部频道</div>
        <div class='moreCate'>
          <div class='cateTag cateTag-active'>推荐</div>
          <div class='cateTag'>居家生活</div>
          <div class='cateTag'>服饰鞋包</div>
          <div class='cateTag'>美食酒水</div>
          <div class='cateTag'>个护清洁</div>
          <div class='cateTag'>母婴亲子</div>
          <div class='cateTag'>运动旅游</div>
          <div class='cateTag'>数码家电</div>
          <div class='cateTag'>严选全球</div>
        </div>
      </div>
      <!-- 遮罩层 -->
      <div class='mask' v-if="isShowMask"></div>
    </div>
    <div class='contentScroll'>
        <!-- 首页内容区 -->
      <div class='contentContainer' v-if="isRecommend">
        <!-- 轮播图  使用需传入carouselList --> 
        <Carousel class="swiper" :carouselList='topSwiperList'></Carousel>
        <!-- title区 -->
        <div class="titleContainer">
          <div class="titItem" v-for="(item,index) in indexData.policyDescList" :key="index">
            <i class="titIcon" :style="`background-image:url(${item.icon})`"></i>
            <span>{{item.desc}}</span>
          </div>
        </div>

        <!-- 中间呼应nav的图片导航区 -->
        <ImgNav :indexData="indexData"></ImgNav>
        <!-- 中间大促销区域 -->
        <bigPromotion></bigPromotion>
        <!-- 新人专享礼和类目热销榜-->
        <floorOne></floorOne>
      </div>
      <!-- 二级路由展示区 -->
      <router-view :key="navId"></router-view>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {reqIndexData} from '../../api/index'
import {mapActions,mapState} from 'vuex'
import Carousel from '../../components/Carousel'
import ImgNav from './ImgNav'
import bigPromotion from './bigPromotion'
import floorOne from './floorOne/floorOne'
export default {
  name: 'index',
  data() {
    return {
      topSwiperList:[
        'https://yanxuan.nosdn.127.net/6b8ccb74fe966ecb9a7f375197590f10.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
        'http://yanxuan-miaobi.nos-jd.163yun.com/1127004_1_4_wap_727631487696e9635e5d3e33371b20f9.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
        'https://yanxuan.nosdn.127.net/db1b51a817ef9e318e0268b8b17b3781.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
        'https://yanxuan.nosdn.127.net/9fc95f708136dec4090a3709c2ea4956.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
        'https://yanxuan.nosdn.127.net/d9cfb21a1b40f8cc73ec4fb4ba2a0a79.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
        'https://yanxuan.nosdn.127.net/c8f6ea8569234c98d5f33c757b3b7960.jpg?type=webp&imageView&quality=75&thumbnail=750x0',
        'https://yanxuan.nosdn.127.net/5cac1571af2a16f18ea94a2c8b895e60.png?type=webp&imageView&quality=75&thumbnail=750x0',
        'https://yanxuan.nosdn.127.net/7406334eaca021f7316b86ee21c3f320.jpg?type=webp&imageView&quality=75&thumbnail=750x0'
      ],
      // 判断当前是否是推荐页面的标识
      isRecommend:true,
      navId:0, //即将要去的二级路由的id
      isShowMask:false //是否展开小三角
    }
  },
  components:{
    Carousel,
    ImgNav,
    bigPromotion,
    floorOne
  },
  mounted() {
    // 拿出应该去的nav分类页的id
    let navId=localStorage.getItem('navId')
    localStorage.removeItem('navId')
    if(navId){
      this.isRecommend=false;
      this.navId=navId*1;
      this.$router.push({path:'/commonNav',query:{navId}})
    }
    // 导航滚动的区域
    this.bs=new BScroll('.scrollContainer',{
      scrollX:true,
      click:true,
    })
    // 控制内容的滚动
    this.bscroll=new BScroll('.contentScroll',{
      scrollY:true,
      click:true,
      bounce:false,
      mouseWheel:true,
    })
    // 触发获取首页数据的action调用
    this.getIndexData().then(()=>{
      this.$nextTick(()=>{
        const targetDom=document.querySelector('.navItem.active')
        console.log(this.navId);
        console.log(targetDom)
        this.bs.scrollToElement(targetDom,500)
      })
    })
    // 触发获取首页nav模块数据的action调用
    this.getIndexCateModule()
  },
  computed: {
    ...mapState({
      indexData:state=>state.indexModule.indexData,
      indexCateModule:state=>state.indexModule.indexCateModule,
      userInfo:state=>state.userModule.userInfo
    })
  },
  methods: {
    ...mapActions({
      getIndexData:'getIndexData',
      getIndexCateModule:'getIndexCateModule'
    }),
    toSearch(){
      // 判断是从推荐页跳转到search还是从导航的分类页
      if(this.navId===0){
        this.$router.push({path:'/search',query:{fromPage:'index'}})
      }else{
        // 先把navId存起来,再跳到搜索页
        localStorage.setItem('navId',this.navId)
        this.$router.push({path:'/search',query:{fromPage:'catelev1'}})
      }
    },
    toCurrent(){
      // 从当前页跳转当前页
      this.navId=0
      this.$router.push({path:'/'})
      this.isRecommend=true
    },
    changeNav(event,navId){
      this.isRecommend=false,
      this.navId=navId
      this.$router.push({path:'/commonNav',query:{navId}})
      // console.log(event)
      this.bs.scrollToElement(event.target,500)
    },
    // 点击小三角的事件
    handleToggle(){
      var toggleIcon=document.querySelector('.toggleIcon')
      toggleIcon.style.transition='transform 0.2s'
      if(this.isShowMask===true){//现在是有遮罩层,小三角应该逆时针转180deg
         toggleIcon.style.transform='rotate(0deg)'
      }else{
         toggleIcon.style.transform='rotate(180deg)'
      }
      // 让遮罩显示/隐藏
      this.isShowMask=!this.isShowMask
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .indexContainer
    width 100%
    height 100%
    .header
      position relative
      z-index 2
      background-color #fff
      display flex
      align-items center
      justify-content space-around
      width 100%
      height 88px
      .logo
        width 138px
        height 40px
        background-size cover
        background-image url('../../common/images/index/logo.png')
      .search
        position relative
        margin 15px
        flex 1
        width 442px
        height 56px
        background-color #EDEDED
        border-radius 5px
        text-align center
        line-height 56px
        color #333
        .fang
          position absolute
          left 45px
          top 14px
          width 28px
          height 28px
          background-image url('../../common/images/index/search.webp')
          background-size cover
      .loginBtn
        width 74px
        height 40px
        font-size 24px
        border 1px solid #DD1A21
        border-radius 5px
        text-align center
        line-height 40px
        a
          text-decoration none 
          color #DD1A21
    .navWrap
      position relative
      background-color #fff
      width 750px
      height 60px
      .scrollContainer
        width 600px
        height 60px
        .navList
          display inline-block
          white-space nowrap
          .navItem
            display inline-block
            box-sizing border-box
            font-size 28px
            padding 0 16px
            line-height 60px
            margin:0 15px
            &.active
              color #DD1A21
              border-bottom 3px solid #DD1A21
      .toggleWrap
        position absolute
        display flex
        right 0 
        bottom 0
        z-index 5
        .liner
          width 80px
          height 60px
          background-color #fff
        .toggle
          width 80px
          height 60px
          background-color #fff
          text-align center
          line-height 60px
          .toggleIcon
            display inline-block
            width 30px
            height 30px
            background-image url('https://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/arrow-down-3-9b31adfa37.png?imageView&type=webp')
            background-size cover
      .tabWrap
        // display none
        position absolute
        left 0
        top 0
        z-index 2
        width 100%
        background-color #fff
        .allText
          width 100%
          height 60px
          line-height 60px
          font-size 28px
          padding-left 20px
        .moreCate
          display flex
          flex-wrap wrap
          width 100%
          padding-top 24px
          .cateTag
            background-color #eee
            border 1px solid #999
            width 150px
            height 56px
            margin 0 0 40px 30px
            text-align center
            line-height 56px
          .cateTag-active
            color #dd1a21
            border 1px solid #dd1a21
      .mask
        position fixed
        z-index 1
        background rgba(0,0,0,.5)
        top 0
        left 0
        right 0
        bottom 0
    .contentScroll
      width 100%
      height calc(100vh - 246px)
      overflow hidden
      .contentContainer
        width 100%
        height 2000px
        .swiper
          width 100%
          height 296px
          margin-top 6px
        .titleContainer
          display flex
          width 100%
          height 72px
          padding 30px
          .titItem
            flex 1
            display flex
            .titIcon
              width 32px
              height 32px
              background-size contain
            span
              font-size 24px
              margin-left 8px
              color #333
    
.test
  font-size 0
</style>
