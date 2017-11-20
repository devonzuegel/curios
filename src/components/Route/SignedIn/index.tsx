import * as Redux from 'redux'
import {RouteProps} from 'react-router-dom'
import {connect} from 'react-redux'
import * as Apollo from 'react-apollo'

import * as auth from '~/redux/reducers/auth'
import SignedIn from './component'
import * as api from '~/graphql'

type TPartialGlobalState = {auth: auth.TState}

const mapStateToProps = (state: TPartialGlobalState, ownProps: RouteProps) => ({
  currentURL: ownProps.path,
})

const mapDispatchToProps = () => (dispatch: Redux.Dispatch<auth.TSetRedirect>) =>
  Redux.bindActionCreators({setRedirect: auth.actions.setRedirect}, dispatch)

export default Apollo.compose(
  connect(mapStateToProps, mapDispatchToProps),
  Apollo.graphql(api.AUTHENTICATE_FACEBOOK_USER, {
    name: 'authenticateUserMutation',
  }),
  Apollo.graphql<{}>(api.LOGGED_IN_USER, {
    options: {fetchPolicy: 'network-only'},
  })
)(SignedIn)
