/**
 *
 * 主配置文件
 */
import fs from 'fs';
import AppDev from './app.dev';
import AppProd from './app.prod';

import { InitTypes } from './typings/app.types';

class AppMain {
  // 程序运行目录
  cwd: string = process.cwd();
  // 开发环境的配置实例
  appDev: any = null;
  // 生产环境的配置实例
  appProd: any = null;
  // 用户自定义配置
  customerConfig: any = null;

  constructor() {
    // 读取配置文件
    this.getCustomerConfig();
  }

  // 获取用户自定义配置
  getCustomerConfig() {
    let configFilePath = this.cwd + '/.fdtrc.js';
    if (!fs.existsSync(configFilePath)) {
      return;
    }
    const config = require(configFilePath);

    if (config) {
      this.customerConfig = config;
    }
  }

  start(params: InitTypes) {
    params.cwd = this.cwd;
    params.customerConfig = this.customerConfig;

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
