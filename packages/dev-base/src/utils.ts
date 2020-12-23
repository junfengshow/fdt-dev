import fs from 'fs';
import chalk from 'chalk';
import figures from 'figures';

const spread = (fn: any) =>
  function(...rest: any) {
    // let args = arguments
    return fn([].slice.call(rest));
  };
export class Logger {
  static log = console.log.bind(console);

  static error = spread((messages: Array<string>) => {
    console.error(chalk.red(...[figures.cross].concat(messages)));
  });

  static info = spread((messages: Array<string>) => {
    console.info(chalk.cyan(...[figures.info].concat(messages)));
  });

  static warn = spread((messages: Array<string>) => {
    console.warn(chalk.yellow(...[figures.warning].concat(messages)));
  });

  static success = spread((messages: Array<string>) => {
    console.log(chalk.green(...[figures.tick].concat(messages)));
  });
}

export const outputConfig = (outputFilePath: string, config: any) => {
  try {
    fs.writeFileSync(
      outputFilePath,
      JSON.stringify(config, function(k, v) {
        if (v instanceof RegExp) {
          return v.toString();
        }
        return v;
      }),
      { encoding: 'utf8' },
    );
  } catch (e) {
    console.log(e);
  }
};
