<template>
  <div class='CateDisplayWrap'>
    <div class="contentArea">
        <!-- 顶部图片 -->
      <div class='topImg'>
        <img src="https://yanxuan.nosdn.127.net/54205f6db78e32eb9c5d1175b7164b01.jpg?quality=75&type=webp&imageView&thumbnail=0x196" alt="">
      </div>
      <!--对于618专区 爆款专区 新品专区的  -->
      <div class='cateListFirst' v-if="cateObj.categoryList">
        <div class='cateItem' v-for="(item,index) in cateObj.categoryList" :key="index">
          <img :src="item.bannerUrl" alt="">
          <span>{{item.name}}</span>
        </div>
      </div>
      <!-- 对于居家生活等结构 -->
      <div class='cateListSecond' v-else>
        <div class='cateItem' v-for="(item,index) in cateObj.subCateList" :key="index">
          <img :src="item.wapBannerUrl" alt="">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {reqCateLists} from '@/api'
export default {
  name: 'cateDisplay',
  props:['categoryId'],
  data() {
    return {
      cateLists:[]
    }
  },
  mounted() {
    // 发送请求获取右侧展示区数据
    this.getCateLists();
    // console.log(this.cateObj);
  },
  methods: {
    async getCateLists(){
      let res=await reqCateLists('/getcateLists')
      this.cateLists=res.data
      // console.log(res.data);
    }
  },
  computed: {
    cateObj(){
       if (this.cateLists.length===0) return {}
       return this.cateLists.find(item=>item.id===this.categoryId*1)
    }
  },
  watch:{
    cateLists:function(){
      this.$nextTick(function(){
        //控制右侧展示区域
        this.rightBs=new BScroll('.CateDisplayWrap',{
          scrollY:true,
          click:true,
        })
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .CateDisplayWrap
    width 100%
    height 100%
    overflow hidden
    .contentArea
      width 100%
      .topImg
        width 528px
        height 192px
        margin 30px 35px 0
        img
          width 100%
          height 100%
      .cateListFirst
        width 100%
        display flex
        flex-wrap wrap
        .cateItem
          display flex
          flex-direction column
          align-items center
          margin 25px
          width 144px
          img
            width 144px
            height 144px
          span
            font-size 24px
      .cateListSecond
        width 100%
        display flex
        flex-wrap wrap
        .cateItem
          display flex
          flex-direction column
          align-items center
          margin 25px
          width 144px
          img
            width 144px
            height 144px
          span
            font-size 24px
.test
  font-size 0
</style>
