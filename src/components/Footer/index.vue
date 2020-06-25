<template>
  <div class='tabbar'>
      <router-link class='tabItem' exact to="/">
        <i class="iconfont icon-ico-"></i>
        <span>首页</span>
      </router-link>
      <router-link class='tabItem' to="/category">
        <i class="iconfont icon-leimupinleifenleileibie"></i>
        <span>分类</span>
      </router-link>
      <router-link class='tabItem' to="/worthBuy">
        <i class="iconfont icon-tupian"></i>
        <span>值得买</span>
      </router-link>
      <router-link class='tabItem' to="/cart">
        <i class="iconfont icon-gouwuche"></i>
        <span>购物车</span>
      </router-link>
      <router-link class='tabItem' to="/personal">
        <i class="iconfont icon-renwu"></i>
        <span>个人</span>
      </router-link>
    </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .tabbar
      position fixed
      z-index 5
      background-color #fff
      bottom 0
      display flex
      box-sizing border-box
      width 100%
      height 98px
      justify-content space-around
      border-top 1px solid #eee
      .tabItem
        flex 1
        display flex
        justify-content center
        flex-direction column
        text-decoration none
        text-align center
        color #666
        &.active
            color #E03036
        .iconfont
          font-size 42px
        span
          font-size 24px
</style>
