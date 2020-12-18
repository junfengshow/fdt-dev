import WebpackDevConfig from './webpack.dev';

class AppConfig {
  name: string = 'config';
  // webpackDevConfig = new WebpackDevConfig();
  getWebpackConfig({ mode, cwd }: { mode?: string; cwd?: string }) {
    if (mode === 'development') {
      return new WebpackDevConfig({ cwd });
    } else {
    }
  }
}
export default AppConfig;
