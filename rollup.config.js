// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/main.js',
  // ← ここで external に 'web-ifc' を追加
  external: ['web-ifc'],
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
