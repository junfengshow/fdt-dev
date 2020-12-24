/**
 *
 * 提供一些方法改变webpack以及其它的一些配置
 */
import { Configuration } from 'webpack';
class AppUtils {
  webpackConfig: Configuration | undefined;
  constructor(params: any) {
    // this.webpackConfig = _childInstance
  }

  setWebpackInstance(instance: Configuration) {
    this.webpackConfig = instance;
  }

  addRule(rule: any) {
    const { webpackConfig } = this;
    if (
      !webpackConfig ||
      !webpackConfig.module ||
      !Array.isArray(webpackConfig.module.rules)
    ) {
      return;
    }
    webpackConfig.module.rules.push(rule);
  }
  addRules(rules: Array<any>) {
    if (!rules || rules.length === 0) {
      return;
    }
    const { webpackConfig } = this;
    if (
      !webpackConfig ||
      !webpackConfig.module ||
      !Array.isArray(webpackConfig.module.rules)
    ) {
      return;
    }
    rules.forEach(this.addRule);
  }
  addBabelPlugin(ext: string, plugin: any) {
    const { webpackConfig } = this;
    if (
      !webpackConfig ||
      !webpackConfig.module ||
      !Array.isArray(webpackConfig.module?.rules)
    ) {
      return;
    }

    webpackConfig.module.rules.forEach((rule: any) => {
      // 找到匹配的rule
      // todo use 的其它情况
      if (rule.test.test(ext)) {
        const babelUse = rule.use.find(
          (item: { loader: string }) => item.loader === 'babel-loader',
        );

        if (babelUse.options) {
          Array.isArray(babelUse.options.plugins)
            ? babelUse.options.plugins.push(plugin)
            : (babelUse.options.plugins = [plugin]);
        } else {
          babelUse.options = {
            plugins: [plugin],
          };
        }
      }
    });
  }
  addBabelPreset(ext: string, preset: string, index?: number) {
    const { webpackConfig } = this;
    if (
      !webpackConfig ||
      !webpackConfig.module ||
      !Array.isArray(webpackConfig.module?.rules)
    ) {
      return;
    }

    webpackConfig.module.rules.forEach((rule: any) => {
      // 找到匹配的rule
      // todo use 的其它情况
      if (rule.test.test(ext)) {
        const babelUse = rule.use.find(
          (item: { loader: string }) => item.loader === 'babel-loader',
        );

        if (babelUse.options && Array.isArray(babelUse.options.presets)) {
          if (index === 0 || index) {
            babelUse.options.presets.splice(index, 0, preset);
          } else {
            babelUse.options.presets.push(preset);
          }
        } else if (babelUse.options) {
          babelUse.options.presets = [preset];
        } else {
          babelUse.options = {
            presets: [preset],
          };
        }
      }
    });
  }
}
export default AppUtils;
