const path = require('path');
const config = {
    "entry": "/src/index.ts",
    module: {
        rules: [
            {
                test: /\.(tsx | ts | js)?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-typescript"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: " css-loader",
                        options: {
                            importLoaders: 1,
                            modules:true
                        }
                }]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename:"bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
    },
    devServer: {
        static: "dist",
        port: env.port || 8080,
        open: true,
      },


}

export default config;