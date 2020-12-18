# @fdt/dev-base

> 前端自动化构建基础配置

## 使用方法

```bash
# 1.安装依赖
$ npm install @fdt/dev-base
```

```bash
# 2.新建配置文件
$ touch config.js
```

```javascript
// 3.引入启动函数并执行
require('@fdt/dev-base').appDev();
```

```bash
# 4.使用node启动配置程序
$ node ./config.js
```

## 引入的依赖及版本

|           名称            | 版本  |          描述          |
| :-----------------------: | :---: | :--------------------: |
|          webpack          | 5.2.0 |      前端打包工具      |
| awesome-typescript-loader | 5.2.1 | webpack 的 ts 编译插件 |
|            ...            |  ...  |          ...           |
