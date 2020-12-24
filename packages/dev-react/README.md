# @fdt/dev-react

> 前端自动化构建 react 项目

## 使用方法

```bash
# 1.安装依赖
$ npm install @fdt/dev-react
```

```bash
# 2.新建配置文件
$ touch config.js
```

```javascript
// 3.config.js中引入启动函数并执行
const Main = require('@fdt/dev-react');
const main = new Main();
main.dev();
```

```bash
# 4.使用node启动配置程序
$ node ./config.js
```
