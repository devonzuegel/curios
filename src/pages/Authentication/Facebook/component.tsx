import * as React from 'react'

import User from '../../../components/User'
import * as facebookSdk from './facebookSdk'
import {TFacebookAuth, TFacebookResponse} from './types'

// TODO: extract this as a story

const styles = require('./index.css')

type TUser = {
  id: string
  facebookUserId: string
  facebookFirstName: string
}

const LoggedIn = (props: {user: TUser; logout: () => void}) => (
  <div style={{display: 'flex', alignItems: 'center'}}>
    <User small {...props.user} />
    <div className={styles['spacer']} />
    <a href="#" className={styles['auth-link']} onClick={props.logout}>
      Logout
    </a>
  </div>
)

const LoggedOut = (props: {loginCallback: (r: TFacebookResponse) => void}) => (
  <a
    href="#"
    className={styles['auth-link']}
    onClick={() => facebookSdk.login(props.loginCallback)}
  >
    Log in with Facebook
  </a>
)

class FacebookAuth extends React.Component<TFacebookAuth, {}> {
  componentDidMount() {
    facebookSdk.initialize()
  }

  _loginCallback = async (facebookResponse: TFacebookResponse) => {
    if (facebookResponse.status === 'connected') {
      const facebookToken = facebookResponse.authResponse.accessToken
      const graphcoolResponse = await this.props.authenticateUserMutation({
        variables: {facebookToken},
      })
      const graphcoolToken = graphcoolResponse.data.authenticateUser.token
      localStorage.setItem('graphcoolToken', graphcoolToken)
      window.location.reload()
    } else {
      console.warn(`User did not authorize the Facebook application.`)
    }
  }

  _isLoggedIn = () =>
    this.props.data.loggedInUser &&
    this.props.data.loggedInUser.id &&
    this.props.data.loggedInUser.id !== ''

  _logout = () => {
    localStorage.removeItem('graphcoolToken')
    window.location.reload()
  }

  render() {
    if (this.props.data.loading || this._isLoggedIn()) {
      return <LoggedIn user={this.props.data.loggedInUser} logout={this._logout} />
    }
    return <LoggedOut loginCallback={this._loginCallback} />
  }
}

export default FacebookAuth
