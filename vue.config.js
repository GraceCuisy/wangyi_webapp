// const px2rem = require('postcss-px2rem')
// const postcss = px2rem({
//   remUnit: 75, //remUnit = 设计稿/等分数10， 网易严选首页750宽，正好相当于是设计稿宽度，所以值为750/10 = 75
// })
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
          require('postcss-plugin-px2rem')({
            rootValue: 75, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
            //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            exclude: /(node_modules)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            // selectorBlackList: [], //要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery:false,  //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
          }),
        ]
      },
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'text-color': '#666',
            'border-color': '#666'
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