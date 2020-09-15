const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const postcssOption = {
    loader: 'postcss-loader'
}

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: '[name].js',
        path: resolve(__dirname, './dist')
    },
    mode: 'production',
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
                            }
                        }
                    ]
                ]
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // 压缩html代码
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'built.css'   // 输出为单个css文件
        }),
        require('postcss-preset-env'),  // 
        new OptimizeCssAssetsWebpackPlugin()   // 压缩css
    ],
    devServer: {
        contentBase: resolve(__dirname, 'dist'),  // 项目构建后路径
        compress: true,  // 启用gzip压缩
        port: 3000,
        open: true  // 自动打开浏览器
    }
}