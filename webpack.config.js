const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main/telephonyConnector.js',
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        host: '0.0.0.0',
        disableHostCheck: true,
        index: 'app_debug.html',
        historyApiFallback: {
            index: 'app_debug.html'
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    output: {
        publicPath: '/assets/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'connector.js'
    }
};
