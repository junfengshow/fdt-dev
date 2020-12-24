/**
 *
 * 一些默认配置
 */
const defaultConfig: {
  [string: string]: any;
} = {
  mode: 'production',
  outputPath: 'dist',
  publicPath: '/',
  filename: '[name].js',
  filenameHash: '[name].[contenthash:6].js',
  extensions: ['.js', 'jsx', '.ts', '.tsx', '.json'],
  alias: {},

  port: 8080,
};
export default defaultConfig;
