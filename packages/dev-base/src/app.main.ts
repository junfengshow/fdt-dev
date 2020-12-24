/**
 *
 * 主配置文件 入口
 */
import fs from 'fs';
import AppDev from './app.dev';
import AppProd from './app.prod';

import { InitTypes } from './typings/app.types';
const CWD = process.cwd();
class AppMain {
  // 程序运行目录
  cwd: string = CWD;
  configFilePath: string = CWD + '/.fdtrc.js';
  // 配置实例
  appConfig: any = null;
  // 用户自定义配置
  customerConfig: any = {};

  constructor({ configFile }: any = {}) {
    // 不支持多配置文件合并
    if (configFile) {
      this.configFilePath = configFile;
    }

    // 读取配置文件
    this.getCustomerConfig();
  }

  // 获取用户自定义配置
  getCustomerConfig() {
    let configFilePath = this.configFilePath;
    if (!fs.existsSync(configFilePath)) {
      return;
    }
    const config = require(configFilePath);

    if (config) {
      this.customerConfig = config;
    }
  }

  // 创建appConfig实例
  init = (mode: string) => {
    const params: any = {
      mode,
    };
    params.cwd = this.cwd;
    params.customerConfig = this.customerConfig;
    // 根据mode不同初始化不同的配置
    if (mode === 'development') {
      if (!this.appConfig) {
        this.appConfig = new AppDev(params);
      }
    } else if (mode === 'production') {
      if (!this.appConfig) {
        this.appConfig = new AppProd(params);
      }
    }
  };

  start(mode: string) {
    this.init(mode);
    this.appConfig.start();
  }

  // 本地开发环境
  dev() {
    this.start('development');
  }
  // 打包正式环境
  build() {
    this.start('production');
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
