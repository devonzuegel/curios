const fromEvent = require('graphcool-lib').fromEvent

const handleError = error => {
  // Log error but don't expose to caller
  console.log(error)
  return {
    error: `An unexpected error occured`,
  }
}

const handleUser = user => {
  if (!user) {
    return {error: `No user with id: ${userId}`}
  }
  return {data: user}
}

const getUser = (api, userId) =>
  api
    .request(
      `
      query {
        User(id: "${userId}"){
          id
          facebookUserId
          facebookFirstName
        }
      }`
    )
    .then(userQueryResult => userQueryResult.User)
    .catch(handleError)

module.exports = event => {
  if (!event.context.auth || !event.context.auth.nodeId) {
    return {data: {id: null}}
  }

  const userId = event.context.auth.nodeId
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  return getUser(api, userId)
    .then(handleUser)
    .catch(handleError)
}
