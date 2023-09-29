const path = require('path');
const autoprefixer = require('autoprefixer');
const terserWebpackPlugin = require('terser-webpack-plugin');
const webpackObfuscator = require('webpack-obfuscator');

module.exports = {
    mode: 'production',
    entry: {
        "translate": './src/scripts/translate.js'
    },
    output: {
        clean: true,
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                        },
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer()
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer Dart Sass
                            implementation: require('sass'),

                            // See https://github.com/webpack-contrib/sass-loader/issues/804
                            webpackImporter: false,
                            sassOptions: {
                                includePaths: ['./node_modules']
                            },
                        },
                    },
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: "> 0.25%, not dead",
                                    },
                                ],
                            ],
                            plugins: [
                                // your plugins here
                            ],
                            // add the terserOptions here
                            compact: true,
                            comments: false,
                        },
                    },
                ]
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new terserWebpackPlugin({
                extractComments: false,
                terserOptions: {
                    mangle: true,
                    compress: {
                        drop_console: true,
                        join_vars: true,
                    },
                    format: {
                        comments: false,
                        beautify: false,
                    },
                    keep_fnames: false,
                    ecma: 2015,
                },
            }),
        ],
    },
    plugins: [
        new webpackObfuscator({
            // Obfuscation options
            rotateUnicodeArray: true,
            compact: true,
            selfDefending: true,
            controlFlowFlattening: false, // Enable this if needed, but be cautious
        }, ['excluded.js']),
    ],

    watch: true,
}