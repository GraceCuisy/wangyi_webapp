<template>
  <div class='searchWrap'>
    <div class='header'>
      <div class='searchBtn'>
        <i class='fang'></i>
        <input 
          type="text" 
          placeholder="防疫特供物资,复工复学保驾护航"
          @input="handleInput"
          v-model="keyword"
        >
        <i class='clearBtn' v-if="keyword.length>0" @click="clearKeyword"></i>
      </div>
      <span class='cancelBtn' @click="handleCancel">取消</span>
    </div>
    <!-- 显示推荐搜索项或者显示搜索结果的列表 -->
    <div class='suggestView' v-if="keyword.length===0">
      <div class='suggestHeader'>
        热门搜索
      </div>
      <div class='list'>
        <div 
          class='item'
          :class="{active:item.highlight===1}"
          v-for="(item,index) in initSuggestList"
          :key="index"
        >
          {{item.keyword}}
        </div>
      </div>
    </div>
    <ul class='searchResultList' v-else>
      <li class='resultItem' v-for="(item,index) in searchResultList" :key="index">
        <span>{{item}}</span>
        <span>></span>
      </li>
    </ul>
  </div>
</template>

<script>
// 对lodash实现按需引入
import debounce from 'lodash/debounce'
import {reqKeywordSearch} from '@/api'
import {reqSearchInitData} from '@/api'
export default {
  name: 'search',
  props:{
    fromPage:String
  },
  data() {
    return {
      initSuggestList:[],
      keyword:'', //用户输入的搜索关键字
      searchResultList:[], //搜索结果的列表
    }
  },
  mounted() {
    this.getInitData();
  },
  methods:{
    // 获取suggestion的初始数据
    async getInitData(){
      const result=await reqSearchInitData()
      if(result.code==='200'){
        this.initSuggestList=result.data.hotKeywordVOList;
      }
    },
    handleInput:debounce(async function(){
      // 获取用户实时输入值
      // 发送请求
      const result=await reqKeywordSearch(this.keyword);
      console.log(result);
      if(result.code==='200'){
        this.searchResultList=result.data
      }
    },500),
    // 点击x清除按钮的回调
    clearKeyword(){
      this.keyword='';
    },
    // 点击取消按钮的回调
    handleCancel(){
      if(this.fromPage==='index' ||this.fromPage==='catelev1'){
        this.$router.push('/')
      }else if(this.fromPage==='cateList'){
        this.$router.push({path:'/category'})
      }else{
        this.$router.back(-1)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .searchWrap
    width 100%
    height 100%
    background-color #eee
    .header
      width 100%
      height 88px
      padding 0 30px
      display flex
      background-color #fff
      box-sizing border-box
      border-bottom 1px solid #eee
      .searchBtn
        display flex
        padding-left 30px
        align-items center
        flex 1
        height 56px
        margin-right 30px
        background-color #eee
        .fang
          display inline-block
          width 28px
          height 28px
          margin-right 16px
          background-image url('../../common/images/index/search.webp')
          background-size cover
          background-repeat no-repeat
        input 
         outline none
         border none
         background-color #eee
         font-size 28px
         width 450px
        .clearBtn
          display inline-block
          width 50px
          height 50px
          background-image url('https://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/clearIpt-2154f24504.png?imageView&type=webp')
          background-size cover
          background-repeat no-repeat
      .cancelBtn
        font-size 28px
    .suggestView
      width 100%
      height 357px
      background-color #fff
      padding 0 30px
      .suggestHeader
        width 100%
        height 80px
        font-size 30px
        color #666
        line-height 80px
      .list
        width 100%
        display flex
        align-items center
        flex-wrap wrap
        .item
          padding 10px
          border 1px solid #666
          color #333
          margin-right 30px
          margin-bottom 30px
          &.active
            color #dd1a21
            border 1px solid #dd1a21
        .item:last-child
          margin-right 0
    .searchResultList
      width 100%
      background-color #fff
      padding 0 30px
      .resultItem
        display flex
        justify-content space-between
        align-items center
        width 100%
        height 90px
        box-sizing border-box
        border-bottom 1px solid #eee
        color #666
        font-size 26px

.test
  font-size 0
</style>
