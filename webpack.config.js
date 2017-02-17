var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: 'dist',
    filename: 'app.bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Twitch App',
      minify: {
        collapseWhitepsace: false // Set to true to minify html
      },
      hash: true, // Set to true if we want hashed bundles.
      template: './src/index.html', // Load a custom template (ejs by default)
    })
    ]
}