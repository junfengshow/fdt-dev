/**
 *
 * 程序主入口
 */

import { AppMain } from '@fdt/dev-base';
import path from 'path';
class Main extends AppMain {
  appMain: any = null;
  constructor() {
    super({
      configFile: path.resolve(__dirname, 'config.js'),
    });
    console.log(this.configFilePath);
  }
}
export { Main };
export default Main;
