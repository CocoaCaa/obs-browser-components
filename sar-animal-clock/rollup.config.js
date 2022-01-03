import typescript from '@rollup/plugin-typescript';
import assets from '@sebastianspeitel/rollup-plugin-assets';
import html from '@web/rollup-plugin-html';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/assets/index.html',
  output: {
    dir: 'public',
    format: 'cjs',
    exports: 'auto',
  },
  plugins: [
    typescript(),
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
  ],
};
