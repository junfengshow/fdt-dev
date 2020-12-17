/**
 *
 * webpack 基本配置
 */
import {
  RuleSetCondition,
  RuleSetUse,
  RuleSetRule,
  Configuration,
} from 'webpack';
import DefaultConfig from './config.default';
// const { joinPath } = require('./utils')
// const projectConfig = require('./project.config')
// // const webpack = require('webpack')
// const { CheckerPlugin } = require('awesome-typescript-loader')

// type BaseConfig = {
//   ISDEV: boolean
// }

class WebpackBaseConfig {
  config: Configuration = new DefaultConfig();

  constructor() {
    // this.config = {}
  }
  // 初始化默认配置
  async initDefaultConfig() {
    return {};
  }
  getConfig() {
    // return configs
    this.config.cache = false;
    return this.config;
  }
}
export default WebpackBaseConfig;
