const AppMain = require('../../packages/dev-base/lib');
const isDev = process.env.NODE_ENV === 'development';
isDev ? AppMain.appDev() : AppMain.appBuild();
