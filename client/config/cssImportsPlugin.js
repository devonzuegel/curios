const paths = require('./paths')

// Support absolute imports from the @client/ dir
const cssImportsPlugin = require('postcss-import')({
  resolve: (...args) => {
    const [id, baseDir] = args
    if (id.startsWith('@client')) {
      return id.replace('@client', paths.appSrc)
    }
    return require('postcss-import/lib/resolve-id')(...args)
  },
})

module.exports = cssImportsPlugin
