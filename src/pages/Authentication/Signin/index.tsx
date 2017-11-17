import * as React from 'react'
import * as Redux from 'redux'
import {connect} from 'react-redux'
import {push, RouterAction} from 'react-router-redux'

import Signin from '../../../stories/Signin'
import * as auth from '../../../redux/reducers/auth'
import sitemap from '../../../sitemap'

type TSigninAction = () => (
  dispatch: Redux.Dispatch<auth.ActionTypeKeys.SIGNIN>
) => auth.TSignin

type TProps = {
  signin: TSigninAction
  goTo: (s: string) => RouterAction
  redirectTo?: string
}

const SigninPage = (props: TProps) => (
  <Signin
    message={props.redirectTo && 'Please sign in to continue.'}
    onSubmit={result => {
      props.signin()
      props.goTo(props.redirectTo || sitemap.home)
    }}
  />
)

type TPartialGlobalState = {auth: auth.TState}

const mapStateToProps = (state: TPartialGlobalState) => ({
  redirectTo: state.auth.redirectTo,
})

const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.Action>) =>
  Redux.bindActionCreators(
    {
      signin: auth.actions.signin,
      goTo: s => push(s),
      setRedirect: auth.actions.setRedirect,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage)
