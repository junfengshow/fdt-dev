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
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DefaultConfig from './config.default';

class WebpackBaseConfig extends DefaultConfig {
  constructor(params: any) {
    super(params);
    const { cwd } = params;
    // 配置 html plugin
    this.setHtmlConfig({ cwd });
    // 配置js相关
    this.setJsConfig({ cwd });
  }

  setHtmlConfig({ cwd }: any) {
    if (!Array.isArray(this.plugins)) {
      return;
    }
    this.plugins.push(
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
    );
  }

  setJsConfig({ cwd }: any) {
    if (!this.module || !Array.isArray(this.module.rules)) {
      return;
    }
    console.log(cwd);
    let tsconfigFile = cwd + '/tsconfig.json';
    this.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'awesome-typescript-loader',
          options: {
            configFile: tsconfigFile,
          },
        },
      ],
    });
  }
}
export default WebpackBaseConfig;
