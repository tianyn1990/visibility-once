import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

// 因为 babel @babel/preset-env 中，会识别无副作用的函数，并添加__PURE__注释（!isProperty && !isIIFE && path.isExpression()）
// 在提供给webpack打包（uglifyjs）时会认为是pure的
// 但如果rollup打包使用了uglify/uglify-es6，会将这个注释去掉，提供给工程的webpack打包的时候，就没用了
// 补充：webpack里用的uglify没有语法分析功能（rollup有，但不适合工程构建），因此在无法将疑似有副作用的函数treeshaking掉
// 因此：包里面不使用uglify了，这样会添加__PURE__注释，在工程的webpack的uglify执行时，会识别这些注释
// import { uglify } from 'rollup-plugin-uglify';
// import uglifyES6 from 'rollup-plugin-uglify-es';

export default [{
    input: 'lib/visibility.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
    },
    // external: [],
    plugins: [
        // uglify(),
        resolve({
            only: ['lib'],
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**', // 只编译我们的源代码
            runtimeHelpers: true,
        }),
    ],
}, {
    input: 'lib/visibility.js',
    output: {
        file: 'dist/index.mjs',
        format: 'es',
    },
    plugins: [
        // uglifyES6(),
        resolve({
            only: ['lib'],
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**', // 只编译我们的源代码
            runtimeHelpers: true,
        }),
    ],
}, {
    input: 'lib/visibility.js',
    output: {
        file: 'dist/babel6/index.js',
        format: 'cjs',
    },
    plugins: [
        // uglify(),
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**', // 只编译我们的源代码
            runtimeHelpers: true,
        }),
    ],
}];