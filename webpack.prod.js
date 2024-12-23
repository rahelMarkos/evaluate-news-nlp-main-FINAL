const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssPlugin = new MiniCssExtractPlugin({
  filename: "[name].css",
});

module.exports = {
  entry: "./src/client/index.js",
  mode: "production",
  output: {
    library: "Client",
    libraryTarget: "var",
    globalObject: "this",

    // path: path.resolve(__dirname, 'dist')
    path: path.resolve(__dirname, "src/client/dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),

    htmlPlugin,
    cssPlugin,
    workboxPlugin,
    new WorkboxPlugin.GenerateSW(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  devServer: {
    port: 3000,
    allowedHosts: "all",
  },
};
new WorkboxPlugin.GenerateSW({
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /\.(png|jpg|jpeg|svg)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        },
      },
    },
    {
      urlPattern: /https:\/\/jsonplaceholder\.typicode\.com\//,
      handler: "NetworkFirst",
      options: {
        cacheName: "api",
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 1 Day
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});

// module.exports = {
//   // Other Webpack configurations...
//   plugins: [workboxPlugin],
//   // Other Webpack configurations...
// };
