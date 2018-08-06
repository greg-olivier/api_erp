var fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const env = (process.env.NODE_ENV === "test") ? "test" : "development";


var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './src/server.ts',
    mode: 'none',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.bundle.js'
    },
    node: {
        __filename: true,
        __dirname: true

        },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx'
            // extension will be handled by 'ts-loader'
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new Dotenv({
            path: __dirname + '/.env.' + env
        })
    ],
    target: 'node',
    externals: nodeModules
};

