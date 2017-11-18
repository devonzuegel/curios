import gql from 'graphql-tag'

export const LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      id
      facebookUserId
      facebookFirstName
    }
  }
`

export const AUTHENTICATE_FACEBOOK_USER = gql`
  mutation AuthenticateUserMutation($facebookToken: String!) {
    authenticateUser(facebookToken: $facebookToken) {
      token
    }
  }
`

export const ALL_USERS = gql`
  query AllUsersQuery {
    allUsers(orderBy: createdAt_DESC) {
      id
      facebookFirstName
      facebookUserId
    }
  }
`
