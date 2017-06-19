const path = require('path')
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('babel-preset-env')
const dynamicImport = require('babel-plugin-syntax-dynamic-import')
const pageId = require('spike-page-id')

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  ignore: ['**/layout.sgr', '**/.*', '_cache/**', 'readme.md', '**/assets/css/_*'],
  reshape: htmlStandards({
      locals: (ctx) => { return { pageId: pageId(ctx), foo: 'bar' } }
    }),
  postcss: cssStandards(),
  babel: { presets: [[jsStandards, { modules: false }]], plugins: [dynamicImport] },
  server: {open: false},
  plugins: [
  ]
}
