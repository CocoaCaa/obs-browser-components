import typescript from '@rollup/plugin-typescript';
import assets from '@sebastianspeitel/rollup-plugin-assets';
import html from '@web/rollup-plugin-html';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { copy } from '@web/rollup-plugin-copy';

export default {
  input: 'src/assets/index.html',
  output: {
    dir: '../docs/sar-animal-clock',
    format: 'cjs',
    exports: 'auto',
  },
  plugins: [
    typescript(),
    nodeResolve(),
    assets(),
    postcss({
      plugins: [
        require('cssnano')({
          preset: 'default',
        }),
      ],
    }),
    html({ extractAssets: false, minify: true }),
    terser(),
    copy({ patterns: './**/*.svg', exclude: [], rootDir: './public' }),
  ],
};
