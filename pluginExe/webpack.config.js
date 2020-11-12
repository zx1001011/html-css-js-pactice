const { resolve } = require('path')
const webpack = require('webpack')


const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const postcssOption = {
    loader: 'postcss-loader'
}

module.exports = {
    // 单入口
    entry: './src/js/index.js',
    output: {
        filename: '[name].[contenthash:10].js',
        path: resolve(__dirname, './dist')
    },
    mode: 'development',
    module: {
        rules: [{
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', postcssOption]  // 处理css文件
        },
        {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', postcssOption, 'less-loader']  // 处理less文件
        },
        {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            // 处理图片文件
            options: {
                limit: 8 * 1024,
                esModule: false,
                name: '[hash:10].[ext]'
            }
        },
        {
            test: /\.html$/,
            use: ['html-loader']  // 处理html文件，以引入图片文件
        },
        {
            exclude: /\.(css|js|html|less|jpg|png|gif)$/,
            loader: 'file-loader',    // 打包其他资源, 除去css,js,html,less
            options: {
                name: '[hash:10].[ext]',
                outputPath: 'media'
            }
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                // 'thread-loader',
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: {
                                        version: 3
                                    },
                                    targets: {
                                        chrome: '60',
                                        firefox: '60',
                                        ie: '9',
                                        safari: '10',
                                        edge: '17'
                                    },
                                }
                            ]
                        ],
                        // babek缓存开启
                        // 第二次构建时，会直接读取之前的缓存
                        cacheDirectory: true
                    }
                }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/manifest.json')
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/jquery.js')
        }),
        new MiniCssExtractPlugin({
            filename: 'built.[contenthash:10].css'   // 输出为单个css文件
        }),
        require('postcss-preset-env'),  // 
        new OptimizeCssAssetsWebpackPlugin(),   // 压缩css
        new CleanWebpackPlugin(),
    ],
    devServer: {
        contentBase: resolve(__dirname, 'dist'),  // 项目构建后路径
        compress: true,  // 启用gzip压缩
        port: 3000,
        open: true,  // 自动打开浏览器
        // hot: true,  // 热更新
    },
    devtool: 'eval-source-map',  // 源代码到构建后代码映射的技术 
}