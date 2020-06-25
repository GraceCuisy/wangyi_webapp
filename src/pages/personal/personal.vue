<template>
  <div id='personalWrap'>
    <div class='contentWrap' ref="contentWrap">
      <div class='personalHeader'>
        <div class='headerContent'>
          <div class='left'>
            <img class='avatar' :src="userInfo.avatar? userInfo.avatar:'https://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'" alt="">
            <div class='info'>
              <p>{{userInfo.nickname?userInfo.nickname:'用户名'}}</p>
              <div class='userType'>
                <span>普通用户</span>
              </div>
            </div>
          </div>
          <div class='right'>
            <div class=rightTop>
              <a href="">
                <img class='right-t-l' src="https://yanxuan.nosdn.127.net/c7bf31bb125c2ff675d4daa8c1d7185e.png" alt="">
              </a>
              <a href="">
                <i class='normalIcon'></i>
              </a>
            </div>
            <div class='rightBottom'>
              <i class='vIcon'></i>
              <div class='word'>
                <div class='lineOne'>Pro会员</div>
                <div class='lineTwo'>立即试用 ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='myAsset'>
        <h2 class='assetTit'>我的资产</h2>
        <div class='assetList'>
          <div class='assetItem'>
            <p>￥0</p>
            <p>回馈金</p>
          </div>
          <div class='assetItem'>
            <p>0</p>
            <p>红包</p>
          </div>
          <div class='assetItem'>
            <p>0</p>
            <p>优惠券</p>
          </div>
          <div class='assetItem'>
            <p>￥0</p>
            <p>津贴</p>
          </div>
          <div class='assetItem'>
            <p>0</p>
            <p>礼品卡</p>
          </div>
        </div>
      </div>
      <div class='menuContainer'>
        <div class='menuList'>
          <div class='menuItem'>
            <i class='iconfont icon-order'></i>
            <span>我的订单</span>
          </div>
          <div class='menuItem'>
            <i class='iconfont icon-icon'></i>
            <span>周六一起拼</span>
          </div>
          <div class='menuItem'>
            <i class='iconfont icon-BCxinbancion-'></i>
            <span>售后服务</span>
          </div>
          <div class='menuItem'>
            <i class='iconfont icon-fanli'></i>
            <span>邀请返利</span>
          </div>
          <div class='menuItem'>
            <i class='iconfont icon-youxiangou'></i>
            <span>优先购</span>
          </div>
          <div class='menuItem'>
            <i class='iconfont icon-jifenzhongxin'></i>
            <span>积分中心</span>
          </div>
          <div class='menuItem'>
            <i class='iconfont icon-ziyuan'></i>
            <span>会员俱乐部</span>
          </div>
          <div class='menuItem'>
            <i class='iconfont icon-dizhiguanli'></i>
            <span>地址管理</span>
          </div>
          <div class='menuItem'>
            <i class='iconfont icon-zhanghaoanquan'></i>
            <span>账号安全</span>
          </div>
          <div class='menuItem'>
            <i class='iconfont icon-ju-icon-customService'></i>
            <span>帮助与客服</span>
          </div>
          <div class='menuItem'>
            <i class='iconfont icon-yijian'></i>
            <span>意见反馈</span>
          </div>
        </div>
      </div>
      <h2 class='cancalLogin' @click="handleLogout">退出登录</h2>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import {Dialog} from 'vant'
export default {
  name: 'personal',
  components:{
    [Dialog.Component.name]: Dialog.Component,
  },
  computed: {
    ...mapState({
      userInfo:state=>state.userModule.userInfo,
    })
  },
  methods: {
    ...mapActions({
      requestLogout:'requestLogout',
    }),
    handleLogout(){
      Dialog.confirm({
        title: '退出登录?',
        confirmButtonColor:'#dd1a21',
        confirmButtonText:'确定',
      })
        .then(() => {
          // on confirm
          this.requestLogout()
          // 强制跳转到首页
          this.$router.replace('/')
        })
        .catch(() => {
          // on cancel
        });
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #personalWrap
    width 100%
    height calc(100vh - 98px)
    overflow scroll
    .contentWrap
      width 100%
      overflow hidden
      .personalHeader
        width 100%
        height 270px
        background-image url('https://yanxuan.nosdn.127.net/5905098f74e04c39fa5e76ebb9ff591b.png?imageView&type=webp')
        background-size cover
        background-repeat no-repeat
        .headerContent
          padding-left 35px
          display flex
          align-items center
          .left
            display flex
            align-items center
            width 510px
            padding 65px 0
            .avatar
              width 142px
              height 142px
              border-radius 50%
              margin-right 30px
            .info
              color #fff
              p
                font-size 26px
                line-height 35px
              .userType
                font-size 22px
          .right
            width 210px
            height 188px
            padding-left 17px
            .rightTop
              display flex
              .right-t-l
                width 44px
                height 44px
                margin-right 30px
              .normalIcon
                display inline-block
                width 50px
                height 25px
                background-image url('https://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sce1e54f581-5d697fd33d.png?imageView&type=webp')
                background-size cover
                background-repeat no-repeat
                background-position 0 -160px
            .rightBottom
              display flex
              align-items center
              width 203px
              height 84px
              background-image: linear-gradient(180deg,#574E44 0,#0E0E0E 100%)
              border-top-left-radius:50px
              border-bottom-left-radius:50px
              margin-top 30px
              .vIcon
                display inline-block
                width 56px
                height 56px
                background-image url('https://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sce1e54f581-5d697fd33d.png?imageView&type=webp')
                background-size cover
                background-repeat no-repeat
                background-position 0 -65px
              .word
                .lineOne
                  font-size 28px
                  color #F9E0C0
                .lineTwo
                  color #F9E0C0
                  font-size 16px
      .myAsset
        width 100%
        height 285px
        box-sizing border-box
        border-bottom 20px solid #eee
        h2
          width 100%
          height 105px
          line-height 105px
          padding-left 20px
          font-size 28px
          border-bottom 1px solid #eee
        .assetList
          display flex
          width 100%
          height 160px
          .assetItem
            flex 1
            height 160px
            text-align center
            padding-top 50px
            line-height 40px
      .menuContainer
        width 100%
        border-bottom 35px solid #eee
        .menuList
          display flex
          flex-wrap wrap
          width 100%
          .menuItem
            display flex
            flex-direction column
            align-items center
            width 249px
            height 180px
            padding-top 45px
            box-sizing border-box
            border-right 1px solid #eee
            border-bottom 1px solid #eee
            i 
              font-size 60px
              line-height 80px
              color #666
            span 
             color #333
      .cancalLogin
        width 100%
        height 116px
        border-bottom 20px solid #eee
        text-align center
        line-height 96px
        font-size 30px
.test
  font-size 0
</style>
