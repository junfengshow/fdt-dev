import { AppMain } from '@fdt/dev-base';
import path from 'path';
class Main {
  appMain: any = null;
  constructor() {
    this.appMain = new AppMain({
      configFile: path.resolve(__dirname, 'config.js'),
    });
  }
}
export default Main;
