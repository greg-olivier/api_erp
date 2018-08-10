var fs = require('fs');
const webpack = require('webpack');
const path = require('path');


var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

const config = {
    entry: './src/server.ts',
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
    target: 'node',
    externals: nodeModules
};


module.exports = config;

