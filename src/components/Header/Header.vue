<template>
  <div class="header">
      <div class='header-l'>
        <router-link to="/">
          <i class="iconfont icon-ico-"></i>
        </router-link>
      </div>
      <div class='header-m'>{{title}}</div>
      <div class='header-r'>
        <router-link to='/search'>
          <i class='searchIcon'></i>
        </router-link>
        <router-link to="/cart">
          <i class='iconfont icon-gouwuche'></i>
        </router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  props:{
    title:String,
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
      display flex
      align-items center
      width 100%
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
</style>
