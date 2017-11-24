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
      {path: '/', text: 'Users'},
      {path: '/foobar', text: '404\nNot found'},
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
        .pause(1000)
        // Check that we don't have access to the page
        .assert.containsText('html', 'Please sign in. :)')
        .assert.urlEquals(config.url(path))
    })
    // // TODO: Sign in with Facebook, then confirm that the users can now see /counter
    // protectedPaths.map(path => {
    //   browser
    //     .url(config.url(path))
    //     // Sign in
    //     .setValue('#email', 'thisisatest@foobar.com')
    //     .setValue('#password', 'mypassword')
    //     .click('#signin button')
    //     // Check that we can see the page now
    //     .assert.containsText('html', 'This is just a toy example')
    //     .assert.urlEquals(config.url(path))
    //     // Check that we can still see the page (i.e. the Redux state was persisted)
    //     .refresh()
    //     .assert.containsText('html', 'This is just a toy example')
    //     .assert.urlEquals(config.url(path))
    // })
    browser.end()
  },
}
