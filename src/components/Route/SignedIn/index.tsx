import * as Redux from 'redux'
import {RouteProps} from 'react-router-dom'
import {connect} from 'react-redux'

import * as auth from '~/redux/reducers/auth'
import SignedIn from './component'

type TPartialGlobalState = {auth: auth.TState}

const mapStateToProps = (state: TPartialGlobalState, ownProps: RouteProps) => ({
  signedIn: state.auth.signedIn,
  currentURL: ownProps.path,
})

const mapDispatchToProps = () => (dispatch: Redux.Dispatch<auth.TSetRedirect>) =>
  Redux.bindActionCreators({setRedirect: auth.actions.setRedirect}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignedIn)
