module.exports = (api) => {
    api.cache(true);
    return {
        plugins: [
            // https://www.babeljs.cn/docs/plugins/transform-runtime
            // http://troland.github.io/2018/02/08/babel-runtime-babel-preset-env-babel-plugin-transform-runtime-babel-polyfill-%E8%AF%A6%E8%A7%A3/
            [
                '@babel/plugin-transform-runtime',
            ],
            [
                '@babel/plugin-proposal-class-properties',
            ],
        ],
        presets: [
            [
                // https://babeljs.io/docs/en/babel-preset-env
                // https://www.babeljs.cn/docs/plugins/preset-env/
                '@babel/preset-env',
                {
                    corejs: 2,
                    targets: [
                        '> 0.25% in CN',
                        'last 2 versions',
                        // 'ios >= 6',
                        // 'android >= 4',
                        'ie >= 9',
                        'not dead',
                    ],
                    // for uglifyjs...
                    forceAllTransforms: true,
                    /**
                        1. useBuiltIns: true
                          配合入口处的polyfill使用
                          将：import '@babel/polyfill';
                          按需("target"参数)转换为特定的polyfill
                        2. useBuiltIns: 'usage'
                          不需要引入@babel/polyfill，同样按需加载
                    */
                    useBuiltIns: 'usage',
                    debug: true,
                    // modules: 'commonjs', // https://github.com/webpack/webpack/issues/4039#issuecomment-419284940
                },
            ],
        ],
    };
};