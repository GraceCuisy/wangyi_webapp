const px2rem = require('postcss-px2rem')
const postcss = px2rem({
  remUnit: 75, //remUnit = 设计稿/等分数10， 网易严选首页750宽，正好相当于是设计稿宽度，所以值为750/10 = 75
})
const path=require('path')
function resolve(dir){
  return path.join(__dirname,dir)
}
module.exports={
  lintOnSave:false,
  devServer:{
    open:true,
    proxy:{
      '/api':{ //只处理/api开头路径的请求
        target:'http://localhost:3005', //转发的目标地址
        changeOrigin:true, //支持跨域
        pathRewrite:{
          '^/api':''
        }
      },
      '/net':{ //只处理/net开头路径的请求
        target:'https://m.you.163.com', //转发的目标地址
        changeOrigin:true, //支持跨域
        pathRewrite:{
          '^/net':''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      },
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'text-color': '#666',
            'border-color': '#DD1A21'
          },
        },
      },
    }
  },
  configureWebpack:{
    resolve: {
        alias: {
            'pages': resolve('src/pages'),
            'components': resolve('src/components'),
        }
    }
  }
}