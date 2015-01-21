var path = require('path');

module.exports = {
    entry: './www/js/index.jsx',
    output: {
        path: path.resolve(__dirname, './www/js'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx/,
                loader:  'jsx-loader'
            }
        ]
    }
};
