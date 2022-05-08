const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

let localCanisters, prodCanisters, canisters;

function initCanisterIds() {
  try {
    localCanisters = require(path.resolve(".dfx", "local", "canister_ids.json"));
  } catch (error) {
    console.log("No local canister_ids.json found. Continuing production");
  }
  try {
    prodCanisters = require(path.resolve("canister_ids.json"));
  } catch (error) {
    console.log("No production canister_ids.json found. Continuing with local");
  }

  const network =
    process.env.DFX_NETWORK || (process.env.NODE_ENV === "production" ? "ic" : "local");

  canisters = network === "local" ? localCanisters : prodCanisters;

  for (const canister in canisters) {
    process.env[canister.toUpperCase() + "_CANISTER_ID"] = canisters[canister][network];
  }
}
initCanisterIds();

const frontendDirectory = "triip_assets";
const isDevelopment = process.env.NODE_ENV !== "production";
const asset_entry = path.join("src", frontendDirectory, "src", "index.html");

module.exports = {
  target: "web",
  mode: isDevelopment ? "development" : "production",
  // watch: isDevelopment,
  entry: {
    // The frontend.entrypoint points to the HTML file for this build, so we need
    // to replace the extension to `.js`.
    index: path.join(__dirname, asset_entry).replace(/\.html$/, ".js")
  },
  devtool: isDevelopment ? "source-map" : false,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    modules: ["node_modules"],
    fallback: {
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      events: require.resolve("events/"),
      stream: require.resolve("stream-browserify/"),
      util: require.resolve("util/")
    }
  },
  output: {
    // filename: "index.js",
    filename: "[name].[chunkhash].index.js",
    path: path.join(__dirname, "dist", frontendDirectory)
  },

  // Depending in the language or framework you are using for
  // front-end development, add module loaders to the default
  // webpack configuration. For example, if you are using React
  // modules and CSS as described in the "Adding a stylesheet"
  // tutorial, uncomment the following lines:
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx|jsx)$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.(js|ts|tsx|jsx)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|dat|patt|glb|gltf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|dat|patt|glb|gltf)$/i,
        use: [
          {
            loader: "url-loader"
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   include: path.resolve(__dirname, "assets"),
      //   type: "asset/resource"
      // }
      // {
      //   test: /\.(css|scss|sass)$/,
      //   use: ["style-loader", "css-loader", "sass-loader"],
      //   exclude: /node_modules/
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, asset_entry),
      favicon: path.join(
        __dirname,
        "src",
        "triip_assets",
        "assets",
        "images",
        "triip_tiim_logo.png"
      ),
      cache: false,
      minify: !isDevelopment
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        : undefined
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "src", frontendDirectory, "assets"),
          to: path.join(__dirname, "dist", frontendDirectory)
        }
      ]
    }),
    new webpack.EnvironmentPlugin({
      // NODE_ENV: "production",
      NODE_ENV: "development",
      TRIIP_CANISTER_ID: canisters["triip"],
      TRIIP_TOKEN_CANISTER_ID: canisters["triip_token"],
      II_URL: isDevelopment
        ? "http://localhost:8000?canisterId=qhbym-qaaaa-aaaaa-aaafq-cai#authorize"
        : "https://identity.ic0.app/#authorize"
    }),
    new webpack.ProvidePlugin({
      Buffer: [require.resolve("buffer/"), "Buffer"],
      process: require.resolve("process/browser")
    }),
    new Dotenv({
      path: "./.env" // Path to .env file (this is the default)
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i
    })
  ],
  // proxy /api to port 8000 during development
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    },
    hot: true,
    watchFiles: [path.resolve(__dirname, "src", frontendDirectory)],
    // contentBase: path.resolve(__dirname, "./src/triip_assets"),
    // watchContentBase: true,
    port: 3000,
    liveReload: true,
    historyApiFallback: true
  },
  performance: {
    hints: "warning",
    // Calculates sizes of gziped bundles.
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith(".js.gz");
    }
  },
  optimization: {
    moduleIds: "deterministic",
    usedExports: true,
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        // This can be your own design library.
        mui: {
          test: /node_modules\/(@mui\/).*/,
          name: "mui",
          reuseExistingChunk: true,
          chunks: "all"
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: "[name].bundle.js",
          reuseExistingChunk: true,
          chunks: "all"
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    // runtimeChunk: {
    //   name: "manifest"
    // },
    runtimeChunk: {
      name: entrypoint => `runtimechunk~${entrypoint.name}`
    },
    minimize: !isDevelopment,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          format: {
            comments: false
          },
          parse: {},
          compress: {
            drop_console: true
          },
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          // Deprecated
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false
        },
        // Use multi-process parallel running to improve the build speed
        parallel: true
      })
    ]
  }
};
