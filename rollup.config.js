// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm'
  },
  plugins: [
    nodeResolve(),
    copy({
      targets: [
        { src: 'public/**/*', dest: 'dist' }
      ]
    })
  ]
};

