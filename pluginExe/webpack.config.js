const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: resolve(__dirname, './dist')
    },
    mode: 'development',
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']  // 处理css文件
        },
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']  // 处理less文件
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
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: resolve(__dirname, 'dist'),  // 项目构建后路径
        compress: true,  // 启用gzip压缩
        port: 3000,
        open: true  // 自动打开浏览器
    }
}