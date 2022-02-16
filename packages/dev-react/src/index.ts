/*
 * :file description:
 * :name: /fdt-dev/packages/dev-react/src/index.ts
 * :author: 你的名字
 * :copyright: (c) 2021, Tungee
 * :date created: 2020-12-23 18:58:05
 * :last editor: 你的名字
 * :date last edited: 2021-03-18 11:58:00
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
