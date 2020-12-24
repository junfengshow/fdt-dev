/**
 *
 * 程序主入口
 */

import { AppMain } from '@fdt/dev-base';
import path from 'path';
class Main extends AppMain {
  appMain: any = null;
  constructor() {
    super();
    this.configFilePath = path.resolve(__dirname, 'config.js');
  }
}
export default Main;
