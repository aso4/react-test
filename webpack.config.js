var config = {
   entry: './main.js', // webpack entry point

   output: {
      path:'./',
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
            loader: 'babel',

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
