/**
 *
 * 本地开发的webpack特殊配置
 * 因为是直接提供给webpack进行使用的配置
 * 所以不属于webpack的配置不能直接出现在实例上
 * 例如: cwd
 */
import webpack from 'webpack';
import WebpackBaseConfig from './webpack.base';

class WebpackDevConfig extends WebpackBaseConfig {
  constructor(params: any) {
    params.ISDEV = true;
    super(params);
    this.mode = 'development';

    this.entry = WebpackDevConfig.setReloadConfig(this.entry);
    this.plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  static setReloadConfig(entry: any) {
    const reloadPath =
      'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&noInfo=true';
    // 添加自动刷新
    if (!entry || typeof entry === 'string') {
      return entry;
    }
    for (let attr in entry) {
      if (Array.isArray(entry[attr])) {
        entry[attr].unshift(reloadPath);
      } else {
        entry[attr] = [reloadPath, entry[attr]];
      }
    }

    return entry;
  }
}
export default WebpackDevConfig;
