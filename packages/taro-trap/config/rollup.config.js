import NodePath from 'path';
import RollupJson from '@rollup/plugin-json';
import RollupNodeResolve from '@rollup/plugin-node-resolve';
import RollupCommonjs from '@rollup/plugin-commonjs';
import RollupTypescript from 'rollup-plugin-typescript2';
import RollupCopy from 'rollup-plugin-copy';
// import RollupCopy from 'rollup-plugin-copy-watch';
import Package from '../package.json';
import scss from 'rollup-plugin-scss';
import RollupPluginStyle from './rollup-plugin-style';

const resolveFile = path => NodePath.resolve(__dirname, '..', path);

const externalPackages = [
  'react',
  'react-dom',
  '@tarojs/components',
  '@tarojs/runtime',
  '@tarojs/taro',
  '@tarojs/react',
];

export default {
  input: resolveFile(Package.source),
  watch: {
    chokidar: true,
    include: [resolveFile('src/**')],
  },
  output: [
    {
      file: resolveFile(Package.main),
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: resolveFile(Package.module),
      format: 'es',
      sourcemap: true,
    },
  ],
  external: externalPackages,
  plugins: [
    RollupNodeResolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    RollupCommonjs({
      include: /\/node_modules\//,
    }),
    RollupJson(),
    RollupTypescript({
      tsconfig: resolveFile('tsconfig.rollup.json'),
    }),
    RollupCopy({
      targets: [
        {
          src: resolveFile('src/style'),
          dest: resolveFile('dist'),
        },
      ],
      copyOnce: false,
    }),
    RollupPluginStyle({ watch: true }),
    // scss(),
  ],
};
