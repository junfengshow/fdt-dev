import WebpackBaseConfig from './webpack.base';

class WebpackDevConfig extends WebpackBaseConfig {
  constructor({ cwd }: { cwd?: string }) {
    super({ cwd });
    this.mode = 'development';
  }
}
export default WebpackDevConfig;
