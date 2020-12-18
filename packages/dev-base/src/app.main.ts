/**
 *
 * 主配置文件
 */
import webpack from 'webpack';
import AppConfig from './app.config';

import { InitTypes } from './typings/app.types';

class AppMain {
  cwd: string = process.cwd();
  appConfig = new AppConfig();

  init({ mode, cwd }: InitTypes) {
    // 构建配置文件实例
    // 其中包含了webpack的配置和express服务的配置
    const webpackConfig: any = this.appConfig.getWebpackConfig({ mode, cwd });
    webpack(webpackConfig).run((err, state) => {
      if (err) {
        console.error(err);
        return;
      }
      if (!state) {
        return;
      }
      const json = state.toJson();
      if (state.hasErrors()) {
        console.error(json.errors);
      }
      console.log(
        state.toString({
          chunks: false,
          colors: true,
        }),
      );
    });
  }

  // 本地开发环境
  dev() {
    this.init({ mode: 'development', cwd: this.cwd });
  }
  // 打包正式环境
  prod() {}
}
export default AppMain;
