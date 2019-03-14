const path=require("path")
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin=require('html-webpack-plugin');


module.exports={

  mode:'development',
  //入口文件配置项
  entry:{
    //里面的main是可以随便写的
    main:'./src/main.js',
    main2:'./src/main2.js' //这里新添加一个入口文件
  },
  //出口文件配置项
  output:{
    //打包路径
    path:path.resolve(__dirname,'../dist'),
   //打包文件名称
   filename:'[name].js'//这里[name] 是告诉我们入口进去的文件是什么名次，打包出来也同样是什么
 },
 //模块：例如解读css,图片如何转换，压缩
 module:{
   rules:[
     //css loader
     {
       test:/\.css$/,
       use:[
         {loader:"style-loader"},
         {loader:"css-loader"}
       ]
     },
     //图片 loader
           {
               test:/\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
               use:[{
                   loader:'url-loader', //是指定使用的loader和loader的配置参数
                   options:{
                       limit:500  //是把小于500B的文件打成Base64的格式，写入JS
                   }
               }]
           }

   ]
 },
 //插件，用于生产模板和各项功能
 plugins:[
new uglify(),
new htmlPlugin({
            minify:{ //是对html文件进行压缩
                removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
            },
            hash:true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template:'./src/index.html' //是要打包的html模版路径和文件名称。

        })
 ],
 //配置webpack开发服务功能
 devServer:{
   //设置基本目录结构
   contentBase:path.resolve(__dirname,'../dist'),
   //服务器的IP地址，可以使用IP也可以使用localhost
   host:'localhost',
   compress:true,
   port:8855
 }
}
