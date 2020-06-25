<template>
  <div class='bigProWrap'>
    <div class='floorTop'>
      <a class='proItem' href="javascript:;" >
        <div class='promGood'>
          <img src="https://yanxuan-item.nosdn.127.net/731e33c792da850caf92799c48d4a669.png?imageView&thumbnail=168x0&quality=75" alt="">
        </div>
      </a>
    </div>
    <div class='floorFirst'>
      <a class='promItem' href="javascript:;"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bigPromotion',
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .bigProWrap
    width 100%
    background-color #eee
    margin-top 30px
    border-bottom 40px solid #eee
    .floorTop
      width 100%
      height 220px
      position relative
      .proItem
        display block
        width 100%
        height 100%
        background-image url('https://yanxuan.nosdn.127.net/6ab14b8fbb1e2f5b5d39f7ff910cfa68.png?quality=75&type=webp&imageView&thumbnail=750x0')
        background-size cover
        background-repeat no-repeat
        .promGood
          position absolute
          left 10%
          top 14%
          width 160px
          height 160px
          text-align center
          line-height 160px
    .floorFirst
      width 710px
      height 160px
      margin 20px auto 0
      .promItem
        display block
        width 100%
        height 100%
        background-image url('https://yanxuan.nosdn.127.net/150ef5c2553d7cd5d1eab92baa9d0e68.png?quality=75&type=webp&imageView&thumbnail=750x0')
        background-size cover
        background-repeat no-repeat
</style>
