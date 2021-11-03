const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
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

const isDevelopment = process.env.NODE_ENV !== "production";
const asset_entry = path.join("src", "triip_assets", "src", "index.html");

module.exports = {
  target: "web",
  mode: isDevelopment ? "development" : "production",
  entry: {
    // The frontend.entrypoint points to the HTML file for this build, so we need
    // to replace the extension to `.js`.
    index: path.join(__dirname, asset_entry).replace(/\.html$/, ".jsx")
  },
  devtool: isDevelopment ? "source-map" : false,
  optimization: {
    minimize: !isDevelopment,
    minimizer: [new TerserPlugin()]
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    fallback: {
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      events: require.resolve("events/"),
      stream: require.resolve("stream-browserify/"),
      util: require.resolve("util/")
    }
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist", "triip_assets")
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
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]"
        }
      },
      {
        test: /\.url.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader"
          }
        ]
      }
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   include: path.resolve(__dirname, "assets"),
      //   type: "asset/resource"
      // }
      // { test: /\.?s[ac]ss$/, use: ["style-loader", "css-loader"], exclude: /node_modules/ }
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
      cache: false
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "src", "triip_assets", "assets"),
          to: path.join(__dirname, "dist", "triip_assets")
        }
      ]
    }),
    new webpack.EnvironmentPlugin({
      // NODE_ENV: "production",
      NODE_ENV: "development",
      TRIIP_CANISTER_ID: canisters["triip"],
      II_URL: isDevelopment
        ? "http://localhost:8000?canisterId=r7inp-6aaaa-aaaaa-aaabq-cai#authorize"
        : "https://identity.ic0.app/#authorize"
    }),
    new webpack.ProvidePlugin({
      Buffer: [require.resolve("buffer/"), "Buffer"],
      process: require.resolve("process/browser")
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
    contentBase: path.resolve(__dirname, "./src/triip_assets"),
    watchContentBase: true,
    port: 3000,
    historyApiFallback: true
  }
  // optimization: {
  //   removeAvailableModules: false,
  //   removeEmptyChunks: false,
  //   splitChunks: false
  // }
};
