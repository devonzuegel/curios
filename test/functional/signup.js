const config = require('../nightwatch.conf.js')

// const signup = browser =>
//   browser
//     .url(config.url('/signup'))
//     .setValue('#invitation-code', 'K93JSKDF')
//     .setValue('#email', 'thisisatest@foobar.com')
//     .setValue('#password', 'mypassword')
//     .setValue('#password-again', 'mypassword')
//     .click('#signup button')

// TODO: Add tests to exercise Facebook signin flow
module.exports = {
  // 'Basic sign up flow': browser => {
  //   signup(browser)
  //   const orgName = 'foobar'
  //   browser.assert
  //     .urlEquals(config.url('/organizations/new'))
  //     .setValue('#business-name', orgName)
  //     .setValue('#first-name', 'Joe')
  //     .setValue('#last-name', 'Schmo')
  //     .click('#new-organization button')
  //     .assert.containsText('html', "You're already part of an organization")
  //     .url(config.url('/signup'))
  //   browser.end()
  // },
}
