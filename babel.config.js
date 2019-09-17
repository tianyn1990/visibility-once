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
                    // 主要针对意疑似副作用的函数，使用loose的写法，可以被识别为无副作用的
                    // 但因为 babel @babel/preset-env 中，会识别无副作用的函数，并添加__PURE__注释（!isProperty && !isIIFE && path.isExpression()）
                    // 在提供给webpack打包（uglifyjs）时会认为是pure的，按理说不需要loose了
                    // 但如果rollup打包使用了uglify/uglify-es6，会将这个注释去掉，提供给工程的webpack打包的时候，就没用了，因此要loose
                    // 补充：loose主要是为了将函数由有副作用变为无副作用，便于webpack打包的时候treeshaking掉
                    // 补充：webpack里用的uglify没有语法分析功能（rollup有，但不适合工程构建），因此在无法将疑似有副作用的函数treeshaking掉
                    // 因此：包里面不使用uglify了，这样会添加__PURE__注释，在工程的webpack的uglify执行时，会识别这些注释
                    // 补充：另一种解决办法，类似elementui，将组件分别output，工程使用的时候引入一个webpack插件，方便使用
                    // loose: true,
                    // modules: 'commonjs', // https://github.com/webpack/webpack/issues/4039#issuecomment-419284940
                },
            ],
        ],
    };
};