/**
 *
 * 打包文件配置
 */
import webpack from 'webpack';
import WebpackProdConfig from './webpack.prod';
class AppProd {
  webpackProdConfig: any = null;
  constructor(params: any) {
    this.webpackProdConfig = new WebpackProdConfig(params);
  }
  start() {
    const compiler = webpack(this.webpackProdConfig);
    compiler.run((err, stats) => {
      if (err) {
        throw new Error(`报错了：${err}`);
      }
      if (!stats) {
        return;
      }
      const json = stats.toJson();
      if (stats.hasErrors()) {
        console.error(json.errors);
      }
      if (stats.hasWarnings()) {
        console.warn(json.warnings);
      }
      console.log(
        stats.toString({
          chumks: true,
          colors: true,
        }),
      );
    });
  }
}
export default AppProd;
