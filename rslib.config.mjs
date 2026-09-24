import { defineConfig } from '@rslib/core'
import { pluginReact } from '@rsbuild/plugin-react'

// Keep the classic JSX runtime so the UMD build only needs a global `React`.
const react = pluginReact({ swcReactOptions: { runtime: 'classic' } })

const umdExternal = (name, root) => ({ root, commonjs: name, commonjs2: name, amd: name })

export default defineConfig({
  source: {
    entry: { index: './src/index.js' }
  },
  lib: [
    {
      format: 'cjs',
      syntax: 'es2018',
      output: { filename: { js: 'index.js' } }
    },
    {
      format: 'esm',
      syntax: 'es2018',
      output: { filename: { js: 'index.esm.js' } }
    },
    {
      format: 'umd',
      umdName: 'ReactNiceDates',
      syntax: 'es2018',
      // Works in browsers, workers and Node, unlike the default `self`
      tools: { rspack: { output: { globalObject: 'globalThis' } } },
      output: {
        filename: { js: 'index.umd.js' },
        externals: {
          'date-fns': umdExternal('date-fns', 'DateFns'),
          'prop-types': umdExternal('prop-types', 'PropTypes'),
          react: umdExternal('react', 'React')
        }
      }
    }
  ],
  output: {
    target: 'web',
    legalComments: 'inline',
    distPath: { root: './build' },
    cleanDistPath: true
  },
  plugins: [react]
})
