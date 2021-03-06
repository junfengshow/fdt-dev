import { Configuration } from 'webpack';
export type InitTypes = {
  mode?: string;
  cwd?: string;
  customerConfig?: any;
};

export type OutputType = {
  filename?: string;
  path?: string;
  publicPath?: string;
};

// entry
export type EntryObjectType = {
  [property: string]: string | Array<string>;
};
// module
export interface ModuleType {
  rules: Array<any>;
}
