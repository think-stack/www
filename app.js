const path = require('path')
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const SpikeDatoCMS = require('spike-datocms')
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
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  ignore: ['**/layout.sgr', '**/.*', '_cache/**', 'readme.md', '**/assets/css/_*', '**/_*'],
  reshape: htmlStandards({
    root: './views',
    locals: (ctx) => { return Object.assign(locals, { pageId: pageId(ctx) }, { slugify: slugify } )}
  }),
  postcss: cssStandards(),
  babel: jsStandards(),
  server:{open: false},
  plugins: [
    new SpikeDatoCMS({
      addDataTo: locals,
      token: 'e26304f1b7f2c4d86a9a',
      models: [
        {
          name: 'about',
          json: 'about.json'
        },
        {
          name: 'post',
          template: {
            path: 'views/post.sgr',
            output: (post) => {return `blog/${post.slug}.html`}
          },
          json: 'blog.json'
        }
      ],
      json: 'data.json'
    })
  ]
}
