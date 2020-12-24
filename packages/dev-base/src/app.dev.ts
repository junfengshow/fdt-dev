/**
 *
 * 启动本地开发环境
 */
import fs from 'fs';
import WebpackDevConfig from './webpack.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { createProxyMiddleware } from 'http-proxy-middleware';
import webpack from 'webpack';
import express from 'express';
import AppUtils from './app.utils';
import defaultConfig from './app.default';

class AppDev extends AppUtils {
  cwd: string = '';
  webpackDevConfig: any = null;
  app: any = null;
  compiler: any = null;
  server: any = null;
  proxy: any = undefined;
  port: number = defaultConfig.port;

  constructor(params: any) {
    super(params);
    const webpackConfig = new WebpackDevConfig(params);
    super.setWebpackInstance(webpackConfig);
    const { cwd, customerConfig } = params;

    this.cwd = cwd;

    this.webpackDevConfig = webpackConfig;

    if (!customerConfig) {
      return;
    }
    const { proxy, port } = customerConfig;
    if (proxy) {
      this.proxy = proxy;
    }
    if (port) {
      this.port = port;
    }
  }

  appListen({ app }: any) {
    this.server = app.listen(this.port, () => {
      console.log(`server is running on port=${this.port}`);
    });
  }

  // 使用中间件
  setMiddlewares({ app, compiler }: any) {
    // dev-middleware
    const compilerMiddleware = webpackDevMiddleware(compiler, {
      logLevel: 'warn',
      stats: {
        colors: true,
      },
    });
    app.use(compilerMiddleware);
    // hot-middleware
    app.use(
      webpackHotMiddleware(compiler, {
        path: '/__webpack_hmr',
      }),
    );
    // 同时需要在webpack的plugins中添加 webpac.HotModuleReplacementPlugin

    // proxy-middleware

    const { proxy } = this;
    if (proxy) {
      Object.keys(proxy).forEach(key => {
        app.use(key, createProxyMiddleware(proxy[key]));
      });
    }

    // output
    const outputPath = this.webpackDevConfig.output.path;
    // static
    app.use(express.static(outputPath));

    // browser history
    app.use('*', (req: any, res: any, next: any) => {
      const filename = outputPath + '/index.html';
      if (!fs.existsSync(filename)) {
        res.end('no html');
        return;
      }
      compiler.outputFileSystem.readFile(filename, (err: any, result: any) => {
        if (err) {
          return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
      });
    });
  }

  // 启动服务等
  start() {
    const compiler = webpack(this.webpackDevConfig);
    const app = express();
    // 配置中间件
    this.setMiddlewares({ app, compiler });
    // 监听服务端口
    this.appListen({ app });
  }
}
export default AppDev;
