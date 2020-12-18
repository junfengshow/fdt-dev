/**
 *
 * 项目的初始化配置
 */
import { OutputType } from './typings/app.types';
type ModuleType = {
  rules: Array<any>;
};
class DefaultConfig {
  entry: string = './src/main.js';
  mode: 'development' | 'production' | 'none' | undefined = 'production';
  output: OutputType = {
    filename: '[name].[chunkhash:6].js',
    publicPath: '/',
  };
  cache: boolean = false;
  plugins: Array<any> = [];
  module: ModuleType = {
    rules: [],
  };
  resolve = {
    extensions: ['.js', 'jsx', '.ts', '.tsx', '.json'],
    alias: {},
  };

  // 外部传入的参数
  constructor(params: any) {
    const { cwd } = params;
    this.output.path = cwd + '/dist';
  }
}
export default DefaultConfig;
