var path = require('path');
var COMPILED_DIR = './www/compiled/';

module.exports = {
    entry: './www/src/index.js',
    output: {
        path: path.resolve(__dirname, COMPILED_DIR + 'js'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['es6', 'jsx-loader']
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};
