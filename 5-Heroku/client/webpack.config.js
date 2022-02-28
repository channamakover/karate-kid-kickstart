const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  return {
    mode: env.production ? "production" : "development",
    entry: "./toDoListApp.js",
    output: {
      filename: "main.js",
    },
    devtool: env.production ? "source-map" : "",
    devServer: {
      static: "dist",
      port: env.port || 8080,
      open: true,
    },

    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: "./index.html", to: "./index.html" },
          { from: "./styles.css", to: "./styles.css" },
        ],
      }),
    ],
  };
};
