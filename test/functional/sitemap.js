const config = require('../nightwatch.conf.js')

const signin = browser =>
  browser
    .url(config.url('/signin'))
    .setValue('#email', 'thisisatest@foobar.com')
    .setValue('#password', 'mypassword')
    .click('#signin button')

module.exports = {
  'Assert sitemap': browser => {
    const expected = [
      {path: '/', text: 'Home'},
      {path: '/signin', text: '8 characters minimum'},
      {path: '/signup', text: 'Create a new account'},
      {path: '/signout', text: 'Home'},
      {path: '/counter', text: 'Please sign in to continue.'},
      {path: '/password-reset', text: 'Reset!'},
      {path: '/foobar', text: '404\nNot found'},
      {path: '/password-forgotten', text: 'Password forgotten'},
    ]
    expected.map(({path, text, title}) => {
      browser
        .url(config.url(path))
        .assert.containsText('html', text)
        .assert.title('Curios')
    })
    browser.end()
  },

  'Protected paths require login': browser => {
    const protectedPaths = ['/counter']
    protectedPaths.map(path => {
      browser
        .url(config.url(path))
        // Check that we don't have access to the page
        .assert.containsText('html', 'Please sign in to continue.')
        .assert.urlEquals(config.url('/signin'))
    })
    protectedPaths.map(path => {
      browser
        .url(config.url(path))
        // Sign in
        .setValue('#email', 'thisisatest@foobar.com')
        .setValue('#password', 'mypassword')
        .click('#signin button')
        // Check that we can see the page now
        .assert.containsText('html', 'This is just a toy example')
        .assert.urlEquals(config.url(path))
        // Check that we can still see the page (i.e. the Redux state was persisted)
        .refresh()
        .assert.containsText('html', 'This is just a toy example')
        .assert.urlEquals(config.url(path))
    })
    browser.end()
  },

  'Auth routes cannot be accessed when the user is already logged in': browser => {
    const preLoggedInRoutes = ['/signin', '/signup']
    signin(browser)
    preLoggedInRoutes.map(path => {
      browser
        .url(config.url(path))
        .assert.containsText('html', "You're already signed in :)")
    })
    browser.end()
  },
}
