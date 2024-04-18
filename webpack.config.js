const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const PrettierPlugin = require("prettier-webpack-plugin");
const fs = require("fs")

const pages = []
const files = fs.readdirSync('./src/html');

files.forEach(f => {
    if (f.endsWith('.html')) {
        pages.push(f.split('.html')[0])
    }
})

const multipleHtmlPlugins = pages.map(name => {
    return new HtmlWebpackPlugin({
        template: `./src/html/${name}.html`,
        filename: `${name}.html`,
    })
});

module.exports = {
    mode: 'development',
    devServer: {
        port: 8080,
        hot: true,
        open: true,
        compress: true,
        static: {
          directory: path.join(__dirname, './dist'),
        },
      },
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/template.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/images'),
                    to: path.resolve(__dirname, './dist/images'),
                    noErrorOnMissing: true,
                }
            ],
        }),
        new ESLintPlugin({
            context: "src",
            extensions: [".js"],
            fix: true
        }),
        new PrettierPlugin()
    ].concat(multipleHtmlPlugins),
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // изображения
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            // шрифты и SVG
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            // CSS, PostCSS, Sass
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    }
}