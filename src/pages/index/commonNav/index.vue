<template>
  <div class="commonNavWrap">
    <div class="contentContainer">
        <!-- 顶部轮播图 -->
      <Carousel class='banner' :carouselList='indexCateObj.category.bannerUrlList'></Carousel>
      <!-- 标题区 -->
      <div class="titContainer">
        <span class='bigTit'>{{indexCateObj.category.name}}</span>
        <span class='littleTit'>{{indexCateObj.category.frontDesc}}</span>
      </div>
      <!-- 商品列表区 -->
      <div class='shopList'>
        <div class='shopItem' v-for="(item,index) in indexCateObj.itemList" :key="index">
          <img class='itemPic' :src="item.listPicUrl" alt="">
          <div class='shopName'>{{item.simpleDesc}}</div>
          <div class='shopPrice'>￥{{item.retailPrice}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Carousel from 'components/Carousel'
import {mapState} from 'vuex'
export default {
  name: 'commonNav',
  props:['navId'],
  data() {
    return {
    }
  },
  components:{
    Carousel,
  },
  mounted() {
    // 控制内容的滚动
    this.navbs=new BScroll('.commonNavWrap',{
      scrollY:true,
      click:true,
      bounce:false,
      mouseWheel:true,
    })
  },
  computed: {
    ...mapState({
      indexCateModule:state=>state.indexModule.indexCateModule,
      indexCateList:state=>state.indexModule.indexCateList,
    }),
    indexCateObj(){
      return this.indexCateList.find(item=>item.category.parentId===this.navId*1)
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .commonNavWrap
    width 100%
    height calc(100vh - 246px)
    overflow hidden
    .contentContainer
      width 100%
      .banner
        width 100%
        height 296px
        margin-top 6px
      .titContainer
        width 100%
        height 120px
        display flex
        flex-direction column
        justify-content center
        align-items center
        border-top 20px solid #eee
        .bigTit
          font-size 32px
          line-height 50px
        .littleTit
          font-size 24px
          color #666
      .shopList
        width 100%
        display flex
        flex-wrap wrap
        justify-content space-around
        &:after
          content ''
          width 345px
          height 0
        .shopItem
          width 345px
          .itemPic
            width 100%
            height 345px
          .shopName
            font-size 28px
          .shopPrice
            font-size 32px
            color #DD1A21

.test
  font-size 0
</style>
