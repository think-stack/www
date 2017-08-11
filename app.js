const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const SpikeDatoCMS = require('spike-datocms')
const sugarml = require('sugarml')
const sugarss = require('sugarss')
const locals = {}

// Used to convert anything to URL friendly slug
// thanks @mwickett

function slugify (text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
  }

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.sss' },
  ignore: ['**/layout.sgr', '**/.*', '_cache/**', 'readme.md', '**/assets/css/_*', '**/_*'],
  reshape: htmlStandards({
    parser: sugarml,
    root: './views',
    locals: (ctx) => { return Object.assign(locals, { pageId: pageId(ctx) }, { slugify: slugify } )}
  }),
  postcss: cssStandards({ parser: sugarss }),
  babel: jsStandards(),
  server: { open: false },
  plugins: [
    new SpikeDatoCMS({
      addDataTo: locals,
      token: 'e26304f1b7f2c4d86a9a',
      models: [
        {
          name: 'about',
          json: 'about.json'
        }, {
          name: 'post',
          json: 'blog.json'
        },
        {
          name: 'work',
          json: 'work.json'
        }
      ],
      json: 'data.json'
    })
  ]
}

