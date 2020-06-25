<template>
  <div class="ImgNavContainer">
    <div class='navList'>
      <div class='navItem'>
        <img src="../../../common/images/index/xinpin.png" alt="">
        <span>新品首发</span>
      </div>
      <div class='navItem' v-for="(item,index) in indexData.kingKongModule ? indexData.kingKongModule.kingKongList:''" :key="index">
        <img :src="item.picUrl" alt="">
        <span>{{item.text}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImgNav',
  props:{
    indexData:Object,
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .ImgNavContainer
    width 100%
    .navList
      width 100%
      display flex
      flex-wrap wrap
      .navItem
        display flex
        flex-direction column
        align-items center
        margin 10px 20px
        img
          width 110px
          height 110px
        span 
          font-size 24px
          margin-top 10px
</style>
