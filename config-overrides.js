const webpack = require('webpack'); 
module.exports = function override(config) { 
		const fallback = config.resolve.fallback || {
            fs: false,
            net: false
        }; 
		Object.assign(fallback, { 
            "zlib": require.resolve("browserify-zlib"),
            "path": require.resolve("path-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "http": require.resolve("stream-http"), 
            "url": require.resolve("url"),
            'process/browser': require.resolve('process/browser'),
            "assert": require.resolve("assert/") 
      }) 
   config.resolve.fallback = fallback; 
   config.plugins = (config.plugins || []).concat([ 
   	new webpack.ProvidePlugin({ 
    	process: 'process/browser', 
      Buffer: ['buffer', 'Buffer'] 
    }) 
   ]) 
   return config; }