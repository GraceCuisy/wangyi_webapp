<template>
  <div class="categoryWrap">
    <div class='header'>
      <div class='searchBtn' @click="toSearch">
        <i class='fang'></i>
        <span>搜索商品,共33356款好物</span>
      </div>
    </div>
    <div class='contentWrap'>
         <!-- 左侧导航区 -->
        <div class='leftContainer'>
          <ul class='leftContent'>
            <li 
              class='navItem'
              :class='{active:item.id===categoryId}'
              @click="handleClick($event,item.id)"
              v-for="(item,index) in cateNavDatas"
            >
              <router-link :to="{path:'/category/cateList',query:{categoryId:item.id}}">{{item.name}}</router-link>
            </li>
          </ul>
        </div>
        <!-- 右侧的展示区 -->
        <div class='rightContainer'>
          <router-view :key="categoryId"></router-view>
        </div>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {reqCateNavDatas} from '@/api'
import cateDisplay from './cateDisplay/cateDisplay'
export default {
  name: 'category',
  data() {
    return {
      cateNavDatas:[],
      categoryId:0, //标识点击了哪个nav项
    }
  },
  components:{
    cateDisplay,
  },
  mounted() {
    
    // 发请求获取左侧导航数据
    this.getCateNavDatas().then(()=>{
      // 开始默认去到推荐专区的二级路由
      let categoryId=localStorage.getItem('categoryId')
      localStorage.removeItem('categoryId')
      if(categoryId){
        this.categoryId=categoryId*1
        this.$router.push({path:'/category/cateList',query:{categoryId:this.categoryId}})
      }
    })
  },
  methods:{
    async getCateNavDatas(){
      const result=await reqCateNavDatas('/getcateNavDatas')
      this.cateNavDatas=result.data.categoryL1List
      this.categoryId=this.cateNavDatas[0].id
    },
    // 处理点击导航项的回调
    handleClick(event,categoryId){
      this.categoryId=categoryId,
      this.bs.scrollToElement(event.target,500)
    },
    toSearch(){
      localStorage.setItem('categoryId',this.categoryId)
      this.$router.push({path:'/search',query:{fromPage:'cateList'}})
    }
  },
  watch:{
    cateNavDatas:function(){
      this.$nextTick(function(){
        //控制左侧nav区域
        this.bs=new BScroll('.leftContainer',{
          scrollY:true,
          click:true,
          
        })
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .categoryWrap
    width 100%
    height 100%
    .header
      width 100%
      height 88px
      box-sizing border-box
      padding 0 30px
      border-bottom 1px solid #333
      .searchBtn
        position relative
        width 100%
        height 56px
        background-color #eee
        margin-top 16px
        text-align center
        line-height 56px
        color #666
        border-radius 10px
        .fang
          position absolute
          left 175px
          top 15px
          width 28px
          height 28px
          background-image url('../../common/images/index/search.webp')
          background-size cover
    .contentWrap
      display flex
      width 100%
      .leftContainer
        width 20%
        height calc(100vh - 186px)
        box-sizing border-box
        border-right 1px solid #333
        overflow hidden
        .leftContent
          width 100%
          display flex
          flex-direction column
          padding-bottom 50px
          .navItem
            width 100%
            height 50px
            text-align center
            line-height 50px
            margin-top 50px
            &.active
              position relative
              a
               color #AB2B2B
              &:after
                content ''
                position absolute
                left 5px
                top 10%
                width 5px
                height 80%
                background-color #AB2B2B
            a
              text-decoration none 
              font-size 28px
              color #333
      .rightContainer
        width 80%
        height calc(100vh - 186px)

.test
  font-size 0
</style>
