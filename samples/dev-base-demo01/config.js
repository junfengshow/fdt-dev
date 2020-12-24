// const { AppMain } = require('../../packages/dev-base/lib');
// const isDev = process.env.NODE_ENV === 'development';

// const mode = isDev ? 'development' : 'production'
// const app = new AppMain()
// app.init(mode)
// // app.appConfig.addRule()

// app.dev()
const Main = require('../../packages/dev-react/lib').default;
const main = new Main();
main.dev();
