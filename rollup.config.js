import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json' assert { type: 'json' };

export default {
  input: 'src/index.jsx',
  output: [
    {
      file: pkg.main,
      format: 'esm',
    },
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react', '@babel/preset-env'],
    }),
    commonjs(),
    terser(), // 可选：压缩输出
  ],
  external: ['react'],
};
