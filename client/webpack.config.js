const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'GreenThumbCards.js'
        })
    ]
};

module.exports = config;