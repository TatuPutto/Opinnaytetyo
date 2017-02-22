'use strict';

let debug = process.env.NODE_ENV !== 'production';
let webpack = require('webpack');
let path = require('path');

module.exports = {
	context: path.join(__dirname, '/WebContent/js'),
    devtool: debug ? 'inline-sourcemap' : null,
	entry: "./client.js",
    module: {
        loaders: [{
	        test: /\.jsx?$/,
	        exclude: /(node_modules|bower_components)/,
	        loader: 'babel-loader',
	            query: {
	            	presets: ['react', 'es2015', 'stage-0'],
	                plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
	            },
	    },
	    {
		    test: /\.html$/,
		    loader: 'file?name=[name].[ext]',
	    },
	    {
	    	test: /\.css$/,
	        loader: 'style-loader!css-loader',
	  	},
      	{
			test: /\.less$/,
        	loader: 'style!css!less',
      	},
	  	{
			test: /\.json$/,
			loader: 'json',
	  	}],
    },
    output: {
    	path: __dirname + "/WebContent/js",
    	filename: "client.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
    ],
};
