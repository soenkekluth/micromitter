import fs from 'fs';
// import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble';
// import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
// import uglify from 'rollup-plugin-uglify';

const env = process.env.NODE_ENV || 'development';
const pkg = JSON.parse(fs.readFileSync('./package.json'));
const external = Object.keys(pkg.peerDependencies || {}).concat(Object.keys(pkg.dependencies || {}));

const now = new Date();

export default {
  entry: 'src/emitter.js',
  sourceMap: true,
  useStrict: false,
  targets: [
    { dest: pkg.main, format: 'cjs', exports: 'named' },
    { dest: pkg.module, format: 'es', external, exports: 'named' },
    { dest: pkg['umd:main'], format: 'umd', exports: 'named', moduleName: pkg.name },
  ],
  plugins: [
    commonjs(),
    // eslint({
    //   include: [
    //     'src/**',
    //     'test/**',
    //   ],
    // }),
    resolve({
      jsnext: true,
      main: true,
      browser: false,
      // preferBuiltins: true,
    }),
    buble({ transform: { module: false } }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
  banner: `/*!
   * ${pkg.name} v${pkg.version}
   * https://github.com/${pkg.repository.url}
   *
   * Copyright (c) ${now.getFullYear()} Sönke Kluth
   * Released under the ${pkg.license} license
   *
   * Date: ${now.toISOString()}
   */
  `,
};
