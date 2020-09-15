# [webpack搭建基础](https://www.webpackjs.com/concepts/)

## 基础步骤:   
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