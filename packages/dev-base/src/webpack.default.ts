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
import defaultConfig from './app.default';

class WebpackDefaultConfig {
  // webpack 默认配置
  entry: EntryObjectType = {};
  mode: Mode = defaultConfig.mode;
  output: OutputType = {};
  cache: boolean = false;
  plugins: Array<any> = [];
  module: ModuleType = {
    rules: [],
  };
  resolve: Resolve = {
    extensions: defaultConfig.extensions,
    alias: defaultConfig.alias,
  };

  // 外部传入的参数
  constructor(params: any) {
    const { cwd, customerConfig } = params;
    const { useHash } = customerConfig;
    let outputPath = defaultConfig.outputPath,
      publicPath = defaultConfig.publicPath,
      filename = defaultConfig.filename,
      filenameHash = defaultConfig.filenameHash;
    // 输出目录
    if (customerConfig.outputPath) {
      outputPath = customerConfig.outputPath;
    }
    // publicPath
    if (customerConfig.publicPath) {
      publicPath = customerConfig.publicPath;
    }

    // 输出配置
    this.output.path = cwd + '/' + outputPath;
    this.output.publicPath = publicPath;
    this.output.filename = useHash ? filenameHash : filename;
  }
}
export default WebpackDefaultConfig;
