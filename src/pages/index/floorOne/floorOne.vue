<template>
  <div class='floorOne'>
    <!-- 新人专区 -->
    <div class='freshmanModule'>
      <div class='moduleTitle'>
        <span>-- 新人专享礼 --</span>
      </div>
      <div class='content'>
        <div class='left'>
          <div class='name'>新人专享礼包</div>
          <img src="https://yanxuan.nosdn.127.net/352b0ea9b2d058094956efde167ef852.png" alt="">
        </div>
        <div class='right'>
          <div class='module'>
            <div class='activityItem'>
              <div class='cnt'>
                <div class='title'>福利社</div>
                <div class='subTitle'>今日特价</div>
              </div>
              <div class='picWrap'>
                <img src="https://yanxuan-item.nosdn.127.net/5b225f722180498c6f428eaeeeb45d3c.png?quality=75&type=webp&imageView&thumbnail=200x200" alt="">
                <!-- <div class='discount'>
                  <div class='line1'>￥39.6</div>
                  <div class='line2'>￥99</div>
                </div> -->
              </div>
            </div>
          </div>
          <div class='module'>
            <div class='activityItem'>
              <div class='cnt'>
                <div class='title'>福利社</div>
                <div class='subTitle'>今日特价</div>
              </div>
              <div class='picWrap'>
                <img src="https://yanxuan-item.nosdn.127.net/5b225f722180498c6f428eaeeeb45d3c.png?quality=75&type=webp&imageView&thumbnail=200x200" alt="">
                <!-- <div class='discount'>
                  <div class='line1'>￥39.6</div>
                  <div class='line2'>￥99</div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'floorOne',
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .floorOne
    width 100%
    .freshmanModule
      width 100%
      background-color #fff
      padding-bottom 40px
      border-bottom 10px solid #eee
      padding 0 30px
      .moduleTitle
        width 100%
        height 90px
        text-align center
        line-height 90px
        font-size 30px
      .content
        display flex
        width 100%
        .left
          width 343px
          height 434px
          background-color #F9E9CF
          .name
            font-size 32px
            line-height 100px
            padding-left 30px
          img
            display block
            width 258px
            height 257px
            margin 10px auto
        .right
          display flex
          width 343px
          height 438px
          flex-direction column
          .module
            width 100%
            height 215px
            background-color #FBE2D3
            .activityItem
              display flex
              width 100%
              height 100%
              padding-left 30px
              padding-bottom 30px
              .picWrap
                width 200px
                height 200px
              .cnt
                font-size 30px
                margin-top 30px

</style>
