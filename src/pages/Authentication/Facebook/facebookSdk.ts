import {TFacebookResponse} from './types'

const FACEBOOK_APP_ID = '338055946660698'
const FACEBOOK_API_VERSION = 'v2.10'

declare global {
  /* tslint:disable-next-line:interface-name */
  interface Window {
    fbAsyncInit: Function
    FB: {
      login: Function
      location: {reload: Function}
      init: Function
    }
  }
}

export const initialize = () => {
  window.fbAsyncInit = function() {
    window.FB.init({
      appId: FACEBOOK_APP_ID,
      cookie: true, // enable cookies to allow the server to access the session
      version: FACEBOOK_API_VERSION,
    })
  }

  // Load the SDK asynchronously
  ;(function(d: any, s: any, id: any) {
    var js,
      fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    ;(js as any).src = '//connect.facebook.net/en_US/sdk.js'
    ;(fjs as any).parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')
}

export const login = (cb: (response: TFacebookResponse) => void) => {
  if (window.FB) {
    window.FB.login(cb, {scope: 'public_profile,email'})
  }
}
