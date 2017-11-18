export type TFacebookAuth = {
  authenticateUserMutation: (props: {variables: {facebookToken: any}}) => any
  data: {
    variables: {}
    loading: boolean
    networkStatus: number
    loggedInUser: {
      id: string
      facebookUserId: string
      facebookFirstName: string
      __typename: string
    }
  }
}

export type TFacebookResponse = {
  status: string
  authResponse: {
    accessToken: string
    userID: string
    expiresIn: number
    signedRequest: string
  }
}
