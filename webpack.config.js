var path = require('path');

var config = {
   entry: './main.js', // webpack entry point

   output: {
      path: path.join( __dirname, './dist/'),
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      port: 8080 // set devport to 808
   },

   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            // set babel loaders to search for js files and use
            // es2015 and react presets installed with npm
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;
