export default {
  home: '/',
  // Authentication
  signin: '/signin',
  signup: '/signup',
  signout: '/signout',
  confirmEmail: (uuid: string) => `/confirm-email/${uuid}`,
  // Invitations
  invitations: '/invitations',
  invitation: (uuid: string) => `/invitations/${uuid}`,
  airdrops: {
    earn: (earnUsername: string) => `/airdrops/earn/${earnUsername}`,
    email: (uuid: string) => `/airdrops/${uuid}`,
  },
  // Misc
  ballotBox: '/ballot-box',
  terms: '/terms',
}
