const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const HtmlWebpackDeployPlugin = require('html-webpack-deploy-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const webpack = require('webpack');

module.exports = {
    resolve: {
        alias: {
            Plugs: path.resolve(__dirname, 'src/js/vendor/plugins/'),
            scss: path.resolve(__dirname, 'src/scss/')

        },
    },
    watch: true,
    // externalsType: 'script',
    // externals: {
    //     jqueryMousewheel: ['https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js'],
    // },
    entry: {
        vendors: './src/js/vendors.js',
        index: './src/js/index.js',

    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'assets/js/[name].bundle.js',
        clean: true,
        publicPath: './',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: (resourcePath, context) => {
                            // publicPath is the relative path of the resource to the context
                            // e.g. for ./css/admin/main.css the publicPath will be ../../
                            // while for ./css/main.css the publicPath will be ../
                            return path.relative(path.dirname(resourcePath), context).replace('\\', '/') + '/';
                        },
                    },
                },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
                /*   filename:  */
            },
        ],

    },
    // mode: 'development',
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     "window.jQuery": "jquery"
        // }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
            chunks: ['vendors', 'index'],
            inject: 'body',
            publicPath: './'
        }),
        new HtmlWebpackDeployPlugin({
            packagesPath: 'vendor',
            packages: {
                'jquery': {
                    copy: [
                        { from: 'dist/jquery.min.js', to: '/' },
                    ],
                    scripts: {
                        variableName: 'jQuery',
                        path: '/jquery.min.js',
                    }
                },
                'jquery-mousewheel': {
                    copy: [
                        { from: '/jquery.mousewheel.js', to: '/' },
                    ],
                    scripts: {
                        variableName: '',
                        path: 'jquery.mousewheel.js',
                        // cdnPath: 'umd/react.production.min.js',
                    }
                }
            },
        }),
        new CleanWebpackPlugin({
            // cleanOnceBeforeBuildPatterns: [
            //     '**/*',
            //     '!vendor/**'
            // ]
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',//[contenthash]
        }),
        // new HtmlWebpackExternalsPlugin({
        //     // See API section
        //     externals: [
        //         {
        //             module: 'jquery',
        //             entry: 'dist/jquery.min.js',
        //             global: 'jQuery',
        //             // append: true,
        //         },
        //         {
        //             module: 'jquery-mousewheel',
        //             entry: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js',
        //             global: 'jQuery_mouse',
        //             // append: true,
        //         },
        //     ],
        // }),

    ],

    // externals: {
    //     'mousewheel': 'jquery-mousewheel'
    // },


    // devServer: {
    //     // overlay: true,
    //     client: {
    //         overlay: true,
    //     },
    //     // historyApiFallback: true,
    //     // contentBase: './dist',
    //     static: {
    //         directory: path.join(__dirname, '/'),
    //     },
    //     watchFiles: path.join(__dirname, 'src'),
    //     // contentBase: path.join(__dirname, 'dist'),
    //     hot: true,
    //     port: 9000,
    //     open: true,
    // },
};