/**
 *
 * 主配置文件
 */
// import webpack from 'webpack';
// import AppConfig from './app.config';
import AppDev from './app.dev';
import AppProd from './app.prod';

import { InitTypes } from './typings/app.types';

class AppMain {
  cwd: string = process.cwd();
  // appConfig = new AppConfig();
  appDev: any = null;
  appProd: any = null;

  start(params: InitTypes) {
    params.cwd = this.cwd;

    if (params.mode === 'development') {
      this.appDev = new AppDev(params);
      this.appDev.start();
    } else if (params.mode === 'production') {
      this.appProd = new AppProd(params);
      this.appProd.start();
    }
  }

  // 本地开发环境
  dev() {
    this.start({ mode: 'development' });
  }
  // 打包正式环境
  build() {
    this.start({ mode: 'production' });
  }
}

function appDev() {
  new AppMain().dev();
}
function appBuild() {
  new AppMain().build();
}

export { AppMain, appDev, appBuild };
export default AppMain;
