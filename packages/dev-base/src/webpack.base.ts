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
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import DefaultConfig from './config.default';

class WebpackBaseConfig extends DefaultConfig {
  constructor(params: any) {
    super(params);
    const { cwd, ISDEV } = params;
    // 配置 html plugin
    this.setHtmlConfig({ cwd });
    // 配置js相关
    this.setJsConfig({ cwd });
    // 配置样式相关
    this.setStyleConfig({ cwd, ISDEV });
    // 图片相关
    this.setIamgeConfig();
    // 字体相关
    this.setFontConfig();
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

    // ts 支持
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

    // js 使用babel编译 todo
    // this.module.rules.push({
    //   test: /\.js$/,
    //   exclude: /node_modules/,
    //   use: [

    //   ]
    // })
  }

  setStyleConfig({ cwd, ISDEV }: any) {
    this.plugins.push(
      new MiniCssExtractPlugin({
        filename: ISDEV ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: ISDEV ? '[id].js' : '[id].[contenthash].css',
      }),
    );

    this.module.rules.push({
      test: /(\.s[ac]ss$|\.css)/,
      exclude: /node_modules/,
      use: [
        { loader: ISDEV ? 'style-loader' : MiniCssExtractPlugin.loader },
        {
          loader: 'css-loader',
          options: {
            esModule: false,
            // fix：不能加auto，加了之后一直警告 export styles (as default) not found
            // 然后模块也不能形成
            modules: {
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
            importLoaders: 2,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: false,
              plugins: [
                [
                  'postcss-preset-env',
                  {
                    stage: 3,
                    browsers: 'last 3 versions',
                  },
                ],
              ],
            },
          },
        },
        { loader: 'sass-loader' },
      ],
    });
  }

  // 图片相关
  setIamgeConfig() {
    this.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      ],
    });
  }

  // 字体
  setFontConfig() {
    [
      ['woff', 'application/font-woff'],
      ['woff2', 'application/font-woff2'],
      ['otf', 'font/opentype'],
      ['ttf', 'application/octet-stream'],
      ['eot', 'application/vnd.ms-fontobject'],
      ['svg', 'image/svg+xml'],
    ].forEach(font => {
      const extension = font[0];
      const mimetype = font[1];

      this.module.rules.push({
        test: new RegExp(`\\.${extension}$`),
        loader: 'url-loader',
        options: {
          name: 'fonts/[name].[ext]',
          limit: 10000,
          mimetype,
        },
      });
    });
  }
}
export default WebpackBaseConfig;
