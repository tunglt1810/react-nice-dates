import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'

// Documentation website (`bun start` / `bun run build:website`)
export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  source: {
    entry: { index: './website/index.js' }
  },
  html: {
    template: './website/index.html',
    favicon: './website/favicon.png'
  },
  output: {
    distPath: { root: 'build-website' },
    copy: [{ from: './website/CNAME' }],
    filenameHash: false
  }
})
