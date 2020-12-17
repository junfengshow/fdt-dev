export default {
  pkgs: ['fdt-dev-base', 'fdt-dev-react'],
  target: 'node',
  disableTypeCheck: true,
  cjs: {
    type: 'babel',
    lazy: true,
  },
};
