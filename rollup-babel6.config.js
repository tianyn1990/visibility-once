import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
    input: 'lib/visibility.js',
    output: {
        file: 'dist/babel6/index.js',
        format: 'cjs',
    },
    // external: [],
    plugins: [
        uglify(),
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**', // 只编译我们的源代码
            runtimeHelpers: true,
        }),
    ],
};