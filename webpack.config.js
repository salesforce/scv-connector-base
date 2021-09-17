module.exports = {
    mode: 'production',
    entry: {
        main: './src/main/index.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|js\.map|map)$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }]
            }
        ]
    },
    output: {
        path: __dirname + 'dist',
        filename: 'scv-connector-base.js',
        library: 'SCVConnectorBase',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true
    }
};