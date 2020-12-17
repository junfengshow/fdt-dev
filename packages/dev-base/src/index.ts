import webpack from 'webpack';
import AppConfig from './app.config';

class Main {
  init() {
    const webpackConfig: any = new AppConfig().webpackConfig;
    const compiler = webpack(webpackConfig);
    compiler.run((err, stat) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stat?.toString());
    });
  }
}
export { Main };
