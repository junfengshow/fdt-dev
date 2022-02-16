/**
 *
 * 用户自定义配置
 */
export enum CustmerConfigEnum {
  // 常规应用级配置
  outputConfig = 101,

  // webpack配置
  entry = 201,
  outputPath = 202,
  rules = 203,
  useHash = 204,
  publicPath = 205,
  extensions = 206,
  alias = 207,

  // 本地开发环境的自定义配置
  proxy = 301,
  port = 302,
}
