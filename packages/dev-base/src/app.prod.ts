/**
 *
 * 打包文件配置
 */

import webpack, { Configuration, Stats } from 'webpack';
import WebpackProdConfig from './webpack.prod';
import { outputConfig, Logger } from './utils';
import AppUtils from './app.utils';

class AppProd extends AppUtils {
  webpackProdConfig: any = null;
  constructor(params: any) {
    super(params);
    const webpackConfig = new WebpackProdConfig(params);
    super.setWebpackInstance(webpackConfig);
    this.webpackProdConfig = webpackConfig;
    // 将webpack的配置输出
    if (params.customerConfig && params.customerConfig.outputConfig) {
      outputConfig(params.cwd + '/_prod.config.json', this.webpackProdConfig);
    }
  }
  start() {
    const runWebpackCompiler = (webpackConfigs: Configuration) =>
      new Promise((resolve, reject) => {
        webpack(webpackConfigs).run((error?: Error, stats?: Stats) => {
          if (error) {
            reject(error);
            throw Error(error.message);
          }
          if (!stats) {
            resolve(stats);
            return;
          }
          const statsJson = stats.toJson();
          if (stats.hasWarnings()) {
            statsJson.warnings.forEach(Logger.warn);
          }
          if (stats.hasErrors()) {
            return reject(statsJson.errors);
          }
          resolve(stats);
        });
      });

    const compile = () => {
      return Promise.resolve()
        .then(() => Logger.info('... 开始编译 ...'))
        .then(() => runWebpackCompiler(this.webpackProdConfig))
        .then((stats?: any) => {
          // 这里可以拷贝资源等任务
          return stats;
        })
        .then((stats?: any) => {
          if (stats) {
            Logger.log(
              stats.toString({
                colors: true,
                chunks: false,
              }),
            );
          }
          Logger.success(`=======`);
          Logger.success(`编译成功`);
          Logger.success(`=======`);
        })
        .catch(errors => {
          if (typeof errors === 'string') {
            Logger.error(errors);
          } else if (Array.isArray(errors)) {
            errors.forEach(item =>
              Logger.error(`${item.moduleName}: ${item.message}`),
            );
          } else if (errors.message) {
            Logger.error(errors.message);
          }
        });
    };
    compile();
  }
}
export default AppProd;
