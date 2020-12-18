/**
 *
 * 主配置文件
 */
import AppDev from './app.dev';
import AppProd from './app.prod';

import { InitTypes } from './typings/app.types';

class AppMain {
  cwd: string = process.cwd();
  appDev: any = null;
  appProd: any = null;

  start(params: InitTypes) {
    params.cwd = this.cwd;
    // 根据mode不同初始化不同的配置
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

export function appDev() {
  new AppMain().dev();
}
export function appBuild() {
  new AppMain().build();
}

export { AppMain };
export default AppMain;
