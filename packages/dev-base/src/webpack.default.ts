/**
 *
 * webpack的初始化配置
 */
import {
  EntryObjectType,
  Mode,
  OutputType,
  Resolve,
  ModuleType,
} from './typings/webpack.types';

class WebpackDefaultConfig {
  // webpack 默认配置
  entry: EntryObjectType = {};
  mode: Mode = 'production';
  output: OutputType = {
    // path: '',
    filename: '[name].[chunkhash:6].js',
    publicPath: '/',
  };
  cache: boolean = false;
  plugins: Array<any> = [];
  module: ModuleType = {
    rules: [],
  };
  resolve: Resolve = {
    extensions: ['.js', 'jsx', '.ts', '.tsx', '.json'],
    alias: {},
  };

  // 外部传入的参数
  constructor(params: any) {
    const { cwd } = params;
    // 输出配置
    this.output.path = cwd + '/dist';
  }
}
export default WebpackDefaultConfig;
