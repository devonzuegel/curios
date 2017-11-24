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

export const ALL_POSTS = gql`
  query AllPostsQuery {
    allPosts(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
    }
  }
`

export const CREATE_POST = gql`
  mutation CreatePost($description: String!, $imageUrl: String!, $authorId: ID!) {
    createPost(description: $description, imageUrl: $imageUrl, authorId: $authorId) {
      id
    }
  }
`
