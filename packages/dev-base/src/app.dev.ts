/**
 *
 * 启动本地开发环境
 */
import WebpackDevConfig from './webpack.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { createProxyMiddleware } from 'http-proxy-middleware';
import webpack from 'webpack';
import express from 'express';
class AppDev {
  cwd: string = '';
  webpackDevConfig: any = null;
  app: any = null;
  compiler: any = null;
  server: any = null;

  constructor(params: any) {
    const { cwd } = params;
    this.cwd = cwd;
    this.webpackDevConfig = new WebpackDevConfig(params);
    this.compiler = webpack(this.webpackDevConfig);
    this.app = express();
  }

  appListen() {
    const port = 8080;
    this.server = this.app.listen(port, () => {
      console.log(`server is running on port=${port}`);
    });
  }

  // 使用中间件
  setMiddlewares() {
    // dev-middleware
    const compilerMiddleware = webpackDevMiddleware(this.compiler, {
      logLevel: 'warn',
      stats: {
        colors: true,
      },
    });
    this.app.use(compilerMiddleware);
    // hot-middleware
    this.app.use(
      webpackHotMiddleware(this.compiler, {
        path: '/__webpack_hmr',
      }),
    );
    // 同时需要在webpack的plugins中添加 webpac.HotModuleReplacementPlugin

    // proxy-middleware
    this.app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://www.junfengshow.com',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      }),
    );
    this.app.use(
      '/wages',
      createProxyMiddleware({
        target: 'http://www.junfengshow.com',
        changeOrigin: true,
      }),
    );

    // static
    this.app.use(express.static(this.cwd + '/dist'));

    // browser history
    this.app.use('*', (req: any, res: any, next: any) => {
      const filename = this.cwd + '/dist/index.html';
      this.compiler.outputFileSystem.readFile(
        filename,
        (err: any, result: any) => {
          if (err) {
            return next(err);
          }
          res.set('content-type', 'text/html');
          res.send(result);
          res.end();
        },
      );
    });
  }

  // 启动服务等
  start() {
    // 配置中间件
    this.setMiddlewares();
    // 监听服务端口
    this.appListen();
  }
}
export default AppDev;
