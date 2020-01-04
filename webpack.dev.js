const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "client", "index.js"),
  mode: "development",
  devtool: "source-map",
  stats: "verbose",
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
      title: "DEV: Travel app",
      template: "./src/client/index.html"
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin({
      dry: true,
      verbose: true,
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false
    }),
    new WorkboxPlugin.GenerateSW()
  ]
};
