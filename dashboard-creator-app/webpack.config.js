const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // or 'production'
  entry: './client/index.js', // Entry point of our React app
  output: {
    path: path.resolve(__dirname, 'public/dist'), // Output directory for bundled files
    filename: 'bundle.js', // Name of the bundled JavaScript file
    publicPath: '/dist/', // Important for webpack-dev-server
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/, // Example for CSS files, if needed later
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Use our existing HTML file as a template
      filename: '../index.html', // Output to public/index.html, so server serves it
      inject: 'body' // Inject bundle.js into the body
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve files from public directory
    },
    port: 8080, // Port for the development server
    open: true, // Automatically open the browser
    hot: true, // Enable hot module replacement
    historyApiFallback: true, // Fallback to index.html for SPA routing
    proxy: { // Proxy API requests to our Express server (if we had API routes)
      '/api': 'http://localhost:3000' // Example, not used yet
    }
  },
  resolve: {
    extensions: ['.js', '.jsx'] // Allow importing .js and .jsx files without extension
  }
};
