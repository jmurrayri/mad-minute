var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');

var autoprefixerOptions = {
    browsers: [
      'last 2 versions',
      'iOS >= 7',
      'Android >= 4',
      'Explorer >= 10',
      'ExplorerMobile >= 11'
    ],
    cascade: false
}

module.exports = {
    entry: {
        vendor: path.join(__dirname, 'www', 'vendor.ts'),
        app: path.join(__dirname, 'www', 'bootstrap.ts')
    },

    output: {
        path: path.join(__dirname, 'www', 'build'),
        publicPath: '/',
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].js'
    },

    resolve: {
        modulesDirectories: [
          "node_modules"
        ],
        extensions: ["", ".js", ".ts"]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js', minChunks: Infinity }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'common.js', minChunks: 2, chunks: ['app', 'vendor'] }),
        new HtmlPlugin({
            template: './www/index.html',
            inject: 'body',
            favicon: './www/favicon.ico'
        })
    ],

    module: {
        preLoaders: [ { test: /\.ts$/, loader: "tslint" } ],
        loaders: [
          {
              test: /\.ts$/,
              loader: "ts",
              include: [path.join(__dirname, 'www')],
              exclude: [/\.tests\.ts$/, /node_modules/]
          },
          {
              // This loader setup is for inlining styles in code.
              test: /\.scss$/,
              loaders: [
                "to-string",
                "css",
                "autoprefixer?" + JSON.stringify(autoprefixerOptions),
                "resolve-url",
                "sass?sourceMap"
              ],
              exclude: /app\.scss$/
          },
          {
              // This loader setup is for adding styles to the header for the whole site / page.
              // Use the `resolve-url` pipe to convert the relative url paths to something this loader
              // can work with, e.g.: url('../my-file.png') => url('/path/to/my-file.png')
              // https://github.com/bholloway/resolve-url-loader
              test: /app\.scss$/,
              loaders: [
                "style",
                "css",
                "autoprefixer?" + JSON.stringify(autoprefixerOptions),
                "resolve-url",
                "sass?sourceMap"
              ]
          },
          {
              test: /\.html$/,
              loader: "html?minimize=false" // TODO: enable once issue #36 is resolved (can't minify NG2 syntax)
          },
          // Any png-image or woff-font below or equal to 100K will be converted 
          // to inline base64 instead
          { test: /\.(png|woff|ttf)$/, loader: 'url-loader?limit=100000' }
        ]
    }
};
