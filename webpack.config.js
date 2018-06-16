const path = require('path')

module.exports = {
  mode: 'development',
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      test: path.resolve(__dirname, 'test')
    }
  },
  entry: './src/app.js',
  output: {
    filename: 'app.bundle.js',
    path: path.join(__dirname, 'public')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {
                    modules: false
                  }
                ]
              ],
              plugins: ['transform-object-rest-spread']
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 3000
  }
}
