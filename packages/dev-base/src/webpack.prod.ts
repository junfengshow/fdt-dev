/**
 *
 * 正式环境webpack的特殊配置
 * 因为是直接提供给webpack进行使用的配置
 * 所以不属于webpack的配置不能直接出现在实例上
 * 例如: cwd
 */
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import WebpackBaseConfig from './webpack.base';

class WebpackProdConfig extends WebpackBaseConfig {
  constructor(params: any) {
    super(params);
    WebpackProdConfig.cwd = params.cwd;
    WebpackProdConfig.outputPath = this.output.path;

    this.mode = 'production';
    WebpackProdConfig.setPlugins(this.plugins);
  }
  // 程序运行时所在目录路径
  static cwd?: string = '';
  // webpack 文件输出目录路径
  static outputPath?: string = '';
  // 配置webpack的plugins
  static setPlugins(plugins: Array<Object>) {
    const cwd = WebpackProdConfig.cwd;

    // 清除output 对应的文件及文件夹
    plugins.push(new CleanWebpackPlugin());
    // 拷贝静态文件
    plugins.push(
      new CopyPlugin({
        patterns: [
          { from: cwd + '/public/**/*', to: WebpackProdConfig.outputPath },
        ],
        options: {
          concurrency: 100,
        },
      }),
    );
  }
}
export default WebpackProdConfig;
