const fromEvent = require('graphcool-lib').fromEvent

module.exports = event => {
  if (!event.context.graphcool.pat) {
    console.log('Please provide a valid root token!')
    return {error: 'Facebook Authentication not configured correctly.'}
  }

  const facebookToken = event.data.facebookToken
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  function getFacebookAccountData(fbToken) {
    const fields = ['id', 'email', 'first_name', 'last_name'].join('%2C')
    return fetch(
      `https://graph.facebook.com/v2.9/me?fields=${fields}&access_token=${fbToken}`
    )
      .then(response => response.json())
      .then(parsedResponse => {
        console.log(parsedResponse)
        if (parsedResponse.error) {
          return Promise.reject(parsedResponse.error.message)
        } else {
          return parsedResponse
        }
      })
  }

  function getGraphcoolUser(facebookUser) {
    return api
      .request(
        `
        query {
          User(facebookUserId: "${facebookUser.id}") {
            id
          }
        }
        `
      )
      .then(userQueryResult => {
        if (userQueryResult.error) {
          return Promise.reject(userQueryResult.error)
        } else {
          return userQueryResult.User
        }
      })
  }

  function createGraphcoolUser(facebookUser) {
    return api
      .request(
        `
        mutation {
          createUser(
            facebookUserId: "${facebookUser.id}"
            facebookEmail: "${facebookUser.email}"
            facebookFirstName: "${facebookUser.first_name}"
            facebookLastName: "${facebookUser.last_name}"
          ) {
            id
          }
        }
        `
      )
      .then(userMutationResult => {
        return userMutationResult.createUser.id
      })
  }

  function generateGraphcoolToken(graphcoolUserId) {
    return graphcool.generateNodeToken(graphcoolUserId, 'User')
  }

  return getFacebookAccountData(facebookToken)
    .then(facebookUser =>
      getGraphcoolUser(facebookUser).then(graphcoolUser => {
        if (!graphcoolUser) {
          return createGraphcoolUser(facebookUser)
        } else {
          return graphcoolUser.id
        }
      })
    )
    .then(generateGraphcoolToken)
    .then(token => {
      return {
        data: {
          token: token,
        },
      }
    })
    .catch(error => {
      // Log error but don't expose to caller
      console.log(error)
      return {error: 'An unexpected error occured.'}
    })
}
