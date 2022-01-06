import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackInlineSVGPlugin from 'html-webpack-inline-svg-plugin';
import InlineChunkHtmlPlugin from 'react-dev-utils/InlineChunkHtmlPlugin';
import RemovePlugin from 'remove-files-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import path from 'path';

const OUTPUT_PATH = path.resolve(__dirname, '..', '..', 'docs', 'sar-animal-clock');

const config: webpack.Configuration = {
  entry: path.resolve(__dirname, '..', 'src', 'index.ts'),
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.svg$/i,
        type: 'asset',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'main.[chunkhash].js',
    path: OUTPUT_PATH,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      scriptLoading: 'blocking',
      template: path.resolve(__dirname, '..', 'src', 'assets', 'index.html'),
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*/]),
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true,
    }),
    new RemovePlugin({
      after: {
        root: OUTPUT_PATH,
        test: [
          {
            folder: '.',
            method: (absoluteItemPath) => /main\..*\.js$/g.test(absoluteItemPath),
          },
        ],
      },
    }),
  ],
};

export default config;
