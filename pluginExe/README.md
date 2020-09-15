# [webpack搭建基础](https://www.webpackjs.com/concepts/)

## 基础步骤：  
1.命令npm init ，创建一个package.json来记录当前项目的库    
2.创建目录和文件   
    ----src   
    --------index.js   
    ----package.json    
    ----webpack.config.js (写入webpack基础当前配置)     
3.根据需求逐步添加loader,plugins,等等配置     
  插件引入之前需要 npm install --save-dev XXXX     
  之后引入，    
  webpack新编译    
4.使用webpack的devServer功能：   
npx webpack-dev-server    
或者    
直接安装webpack-dev-server    
在npm script中：
"start": "webpack-dev-server --inline --progress --config webpack.config.js"
运行命令：npm run start
5.使用postcss


## 基础命令：
1.npm install   每个npm项目(package.json)需要先执行

## 分类环境：       
生产、开发，共同的配置代码。   
---build       
--------webpack.base.conf.js    
--------webpack.prod.conf.js   
--------webpack.dev.conf.js   
--config    
--------index.js    
--------prod.env.js   
--------dev.env.js   