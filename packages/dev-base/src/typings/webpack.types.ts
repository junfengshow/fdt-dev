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

export type Mode = 'development' | 'production' | 'none';
export type Resolve = {
  extensions: Array<string>;
  alias: {
    [property: string]: string;
  };
};
