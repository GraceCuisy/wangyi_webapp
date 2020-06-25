import index from 'pages/index/index';
import category from 'pages/category/category';
import worthBuy from 'pages/worthBuy/worthBuy';
import cart from 'pages/cart/cart';
import personal from 'pages/personal/personal';
import login from 'pages/login/login';
import commonNav from 'pages/index/commonNav'
import cateDisplay from 'pages/category/cateDisplay/cateDisplay'
import search from 'pages/search/search'

export default [
  {
    path:'/',
    component:index,
    children:[
      {
        path:'commonNav',
        component:commonNav,
        // 将query参数映射成路由组件的props
        props:route=>({navId:route.query.navId})
      }
    ]
  },
  {
    path:'/category',
    component:category,
    children:[
      {
        path:'cateList',
        component:cateDisplay,
        // 将query参数映射成路由组件的props
        props:route=>({categoryId:route.query.categoryId})
      }
    ]
  },
  {
    path:'/worthBuy',
    component:worthBuy
  },
  {
    path:'/cart',
    component:cart
  },
  {
    path:'/personal',
    component:personal
  },
  {
    path:'/login',
    component:login,
    meta:{
      isHideFooter:true, //标识footer是否隐藏
    }
  },
  {
    path:'/search',
    component:search,
    // 将query参数映射成路由组件的props
    props:route=>({fromPage:route.query.fromPage})
  },
  {
    path:'',
    redirect:'/index'
  }
]
