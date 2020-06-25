<template>
  <div class='loginContainer'>
    <!-- 头部 -->
    <Header class='header' :title="`网易严选`"></Header>
    <!-- 显示登录类型的结构 -->
    <div class='loginTypeWrap' v-show="isLoginType">
      <div class='upContainer'>
        <div class='logoWrap'>
          <img src="https://yanxuan.nosdn.127.net/39c5e4583753d4c3cb868a64c2c109ea.png" alt="">
        </div>
        <div class='btnWrap'>
          <div class='btn phoneBtn' @click='clickPhoneType'>
            <i class='icon phoneIcon'></i>
            <span class='btnText'>手机号快捷登录</span>
          </div>
          <div class='btn emailBtn' @click='clickEmailType'>
            <i class='icon emailIcon'></i>
            <span class='btnText'>邮箱账号登录</span>
          </div>
        </div>
      </div>
      <div class='bottomContainer'>
        <div class='itemWrap'>
          <i class='icon weixinIcon'></i>
          <span class='btnText'>微信</span>
        </div>
        <div class='itemWrap'>
          <i class='icon qqIcon'></i>
          <span class='btnText'>QQ</span>
        </div>
        <div class='itemWrap'>
          <i class='icon weiboIcon'></i>
          <span class='btnText'>微博</span>
        </div>
      </div>
    </div>
    <!-- 用于登录界面的结构 -->
    <div class='loginDetailWrap' v-show="isPhoneLogin || isEmailLogin">
      <!-- 手机号登录界面 -->
      <div class='phoneLoginWrap' v-show="isPhoneLogin">
        <loginHeader></loginHeader>
        <div class='phoneForm'>
          <van-form validate-first @submit="handleLogin">
            <van-field
              v-model="phoneNum"
              name="phoneNum"
              placeholder="请输入手机号"
              :rules="[
                { required: true, message: '手机号必填'},
                {pattern,message:'请输入合法手机号'}
              ]"
            />
            <van-field
              v-model="password"
              type="password"
              name="password"
              placeholder="请输入密码"
              :rules="[
                { required: true, message: '密码必填'},
                { validator, message: '请输入正确密码'},
              ]"
            />
            <div class='forget'>
              <span class='psw'>忘记密码?</span>
              <span class='msg'>短信快捷登录</span>
            </div>
            <div style="margin: 16px;">
              <van-button class='loginBtn' round block type="info" native-type="submit">
                登录
              </van-button>
            </div>
          </van-form>
        </div>
        <div class='loginFooter' @click="toLoginType">
          <div class='btn'>
            <span>其他登录方式 ></span>
          </div>
        </div>
      </div>
      <!-- 邮箱账号登录的页面 -->
      <div class='emailLoginWrap' v-show="isEmailLogin">
        <loginHeader></loginHeader>
        邮箱
        <div class='loginFooter' @click="toLoginType">
          <div class='btn'>
            <span>其他登录方式 ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from 'components/Header/Header'
import loginHeader from './loginHeader/loginHeader'
import {mapActions} from 'vuex'
export default {
  name: 'login',
  components:{
    Header,
    loginHeader
  },
  data() {
    return {
      isLoginType:true, //页面显示登录类型页面
      isPhoneLogin:false, //页面显示手机号登录页面
      isEmailLogin:false, //页面显示邮箱登录页面
      phoneNum: '',
      password: '',
      pattern:/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/, //手机号正则
      //pswpattern:/^\w+$/ //密码正则
    }
  },
  methods:{
    ...mapActions({
        reqLogin:'reqLogin',
      }),
    validator(val){
      return /^\w+$/.test(val);
    },
    handleLogin(values) {
      // console.log('submit', values);
      // 收集用户输入的数据 前端验证 后端验证 
      // vant组件已经做了前两步
      const mobile=values.phoneNum;
      const password=values.password;

      this.reqLogin(mobile,password).then(()=>{
        // 登录成功
        // 跳转到前面想去没能去成的路由, 如果没有就去首页
        const {redirect}=this.$route.query
        this.$router.replace(redirect || '/')

      }).catch(error=>{ //登录失败
        alert(error.message)
      })

      
    },
    clickPhoneType(){
      this.isLoginType=false;
      this.isPhoneLogin=true;
    },
    clickEmailType(){
      this.isLoginType=false;
      this.isEmailLogin=true;
    },
    toLoginType(){
      this.isEmailLogin=false;
      this.isPhoneLogin=false;
      this.isLoginType=true;
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/loginIcon.styl'
  .loginContainer
    width 100%
    .header
      height 88px
    .loginTypeWrap
      width 100%
      height calc(100vh - 88px)
      background-color #F2F5F4
      .upContainer
        width 100%
        .logoWrap
          width 100%
          height 482px
          text-align center
          line-height 482px
          img
            width 268px
            height 90px
        .btnWrap
          width 100%
          padding 0 40px
          margin-bottom 205px
          .btn
            width 100%
            height 94px
            margin-bottom 32px
            border-radius 5px
            line-height 94px
            text-align center
          .phoneBtn
            background-color #DD1A21
            .phoneIcon
              background-image url('https://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/login-s5ca4cb2b91-2c606efd24.png?imageView&type=webp')
              background-position 0 -50px
            span 
              color #fff
          .emailBtn
            box-sizing border-box
            border 1px solid #DD1A21
            .emailIcon
              background-image url('https://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/login-s5ca4cb2b91-2c606efd24.png?imageView&type=webp')
            span 
              color #DD1A21
      .bottomContainer
        position absolute
        bottom 50px
        display flex
        justify-content center
        width 100%
        height 40px
        .itemWrap
          padding 0 40px
          box-sizing border-box
          border-right 1px solid #666
          .weixinIcon
            background-image url('../../common/images/login/weixin.png')
          .qqIcon
             background-image url('../../common/images/login/qq.png')
          .weiboIcon
             background-image url('../../common/images/login/weibo.png')
          span 
            color #666
        .itemWrap:nth-child(3)
          border-right none
    .loginDetailWrap
      width 100%
      .phoneLoginWrap
        .loginFooter
          width 100%
          height 38px
          padding 0 38px
          .btn
            width 100%
            height 100%
            margin-top 46px
            text-align center
        .phoneForm
          width 100%
          height 460px
          margin-top 150px
          .forget
            width 100%
            height 80px
            display flex
            padding 0 30px
            justify-content space-between
            line-height 100px
            .psw
              font-size 30px
              color #666
            .msg
              font-size 30px
              color #333
          .loginBtn
            background-color #dd1a21
            border none
            border-radius 13px
      
.test
  font-size 0
</style>
