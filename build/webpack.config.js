const DIRs = require('./dirs');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');

console.log('::::::::::::::');
console.log(`NODE_ENV:${process.env.NODE_ENV}`);
console.log('::::::::::::::');

const config = {
    mode: 'production',
    entry: {
        index: DIRs.src,
    },
    output: {
        filename: 'index.js',
        path: DIRs.output,
    },
    resolve: {
        extensions: ['.js'],
        alias: {},
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [
                DIRs.lib,
            ],
            options: {
                babelrc: true, // 使用babel默认配置
            },
        }],
    },
};

module.exports = (env = {}) => {
    if(env.type === 'analyzer') {
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                analyzerHost: '127.0.0.1',
                analyzerPort: 8890,
                reportFilename: 'report.html',
                defaultSizes: 'parsed',
                openAnalyzer: true,
                generateStatsFile: false,
                statsFilename: 'stats.json',
                statsOptions: null,
                logLevel: 'info',
            })
        );
    }
    return config;
};