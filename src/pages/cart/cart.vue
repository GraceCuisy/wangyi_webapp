<template>
  <div class='cartContainer'>
    <div class='header'>
      <span class='leftText'>购物车</span>
      <span class='rightText'>领劵</span>
    </div>
    <div class='cartDesc'>
      <span>30天无忧退货</span>
      <span>48小时快速退款</span>
      <span>满99元免邮费</span>
    </div>
    <div class='contentWrap'>
      <div class='img'></div>
      <!-- 显示登录按钮或者文字 "去添加点什么吧" -->
      <div v-if="!userInfo.nickname" class='loginBtn' @click="toLogin">登录</div>
      <div v-else class='cartText'>去添加点什么吧</div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'cart',
  computed: {
    ...mapState({
      userInfo:state=> state.userModule.userInfo
    })
  },
  methods: {
    toLogin(){
      this.$router.push('/login')
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .cartContainer
    width 100%
    .header
      display flex
      justify-content space-between
      align-items center
      width 100%
      height 88px
      padding 0 30px
      .leftText
        font-size 38px
      .rightText
        font-size 30px
        color #dd1a21
    .cartDesc
      display flex
      justify-content space-between
      align-items center
      width 100%
      height 70px
      padding 0 30px
      color #666
      background-color #eee
    .contentWrap
      width 100%
      height calc(100vh - 256px)
      background-color #F2F5F4
      overflow hidden
      .img
        width 248px
        height 248px
        background-image url(https://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-d6193bd6e4.png?imageView&type=webp)
        background-size cover
        background-repeat no-repeat
        margin 400px auto 0
      .loginBtn
        width 480px
        height 92px
        margin 50px auto 0
        background-color #dd1a21
        color #fff
        text-align center
        line-height 92px
        font-size 30px
      .cartText
        font-size 30px
        color #666
        margin-top 50px
        text-align center

.test
  font-size 0
</style>
