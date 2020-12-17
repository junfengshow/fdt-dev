import WebpackBaseConfig from './webpack.base';

class AppConfig {
  name: string = 'config';
  webpackConfig = new WebpackBaseConfig().getConfig();
}
export default AppConfig;
