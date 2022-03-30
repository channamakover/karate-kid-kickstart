const path = require("path");

const prod = process.env.NODE_ENV === "production";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: prod ? "production" : "development",
    entry: {
        main: path.resolve(__dirname, "src/index.tsx"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: [".ts", ".tsx", ".js", ".json"],
                },
                use: "ts-loader",
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    devServer: {
        static: "dist",
        port: 5001,
        open: true,
        hot: true,
        proxy: {
            "/todos": {
                target: "http://localhost:3000",
                secure: false,
            },
        },
    },
    devtool: prod ? undefined : "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            title: "My todo list",
            filename: "index.html",
            template: path.resolve(__dirname, "src/index.html"),
        }),
        new MiniCssExtractPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, "src/styles/*.css"),
        //             to: "styles/[name].css",
        //         },
        //     ],
        // }),
    ],
};






































// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const wow = require('html-loader');
// const webpack = require('webpack');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");


// module.exports = {
//     stats: 'verbose',
//     entry: "./src/index.tsx",
//     mode: "development",
//     output: {
//         path: path.join(__dirname, 'dist'),
//         filename: "bundle.js",
//     },
//     devServer: {
//         static: {
//             directory: path.join(__dirname, "dist"),
//         } ,
//         port: 8080,
//         open: true,
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.(js)?$/,
//                 use: {
//                     loader: "babel-loader",
//                     options: {
//                         presets: ["@babel/preset-env", "@babel/preset-typescript"]
//                     }
//                 }
//             },
//             {
//                 test: /\.(ts|tsx)$/,
//                 use: {
//                     loader: "ts-loader"
//                 }
//             },
//             {
//                 test: /\.css$/,
//                 use: [MiniCssExtractPlugin.loader, "css-loader"],
//             },
//             {
//                 test: /\.html$/,
//                 use: {
//                     loader: 'html-loader',
//                 }
//             }
//         ]
//     },
//     resolve: {
//         extensions: [".ts", ".tsx", ".js", ".css", ".scss", ".html"]
//     },
    
//     plugins: [
//         new HtmlWebpackPlugin({
//             template:  "src/index.html",
//         }),
//         new MiniCssExtractPlugin(),
//         new webpack.ProgressPlugin({
//             profile: true,
//             activeModules: true,
//             dependencies: true,
//             entries: true,
//             modules: true,

//         })
        
//     ]
// }
