const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "client", "index.js"),
  mode: "production",
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].bundle.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: "PROD: Travel app",
      template: "./src/client/index.html",
      filename: "./index.html"
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false
    }),
    new webpack.HashedModuleIdsPlugin(),
    new WorkboxPlugin.GenerateSW()
  ]
};
