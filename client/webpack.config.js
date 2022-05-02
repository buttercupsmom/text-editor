const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      // Entry point for files
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    // Outout for our bundles
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },

    plugins: [
      // Webpack plugin that generates html file and injects our bundles
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Text Editor",
      }),

      // Injects our customer service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),

      // Creates  manifest.json file
      new WebpackPwaManifest({
        name: "j.a.t.e.",
        description: "text editor where you can type text",
        background_color: "#EDEDE6",
        theme_color: "#01291A",
        inject: true,
        fingerprints: false,
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      // CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.mjs$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
