const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const targetLanguage = process.env.TARGET_LANG || 'fr';
const isProduction = ['prod', 'production'].indexOf(process.env.NODE_ENV) !== -1;

module.exports = {
    entry: './src/script.js',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: "css-loader" },
                        { loader: "sass-loader" }
                    ]
                })
            },
            {
                test: /\.(png|svg|jpg|gif|ico|woff|woff2|ttf|eot|pdf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                exclude: /templates/,
                use: [
                        {
                            loader: 'html-loader',
                            options: {
                                attrs: ['img:src', 'link:href', 'a:data-href']
                            }
                        },
                        {
                            loader: "nunjucks-html-loader",
                            options: {
                                searchPaths: [path.resolve(__dirname, 'src')],
                                context: Object.assign(
                                    require(path.resolve(__dirname, `lang/${targetLanguage}.json`)),
                                    {"production": isProduction}
                                )
                            }
                        },
                    ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            'src/cv_Jonathan_BOUZEKRI.pdf',
            'src/sitemap.xml',
            'src/robots.txt'
        ]),
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            filename: `${targetLanguage}/index.html`,
            template: './src/index.html',
        }),
        new HtmlWebpackPlugin({
            filename: `${targetLanguage}/cv.html`,
            template: './src/cv.html',
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};