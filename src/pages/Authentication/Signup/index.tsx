import * as React from 'react'
import * as Redux from 'redux'
import {connect} from 'react-redux'
import {push, RouterAction} from 'react-router-redux'

import Signup from '../../../stories/Signup'
import * as auth from '../../../redux/reducers/auth'
import sitemap from '../../../sitemap'

type TSignupAction = () => (
  dispatch: Redux.Dispatch<auth.ActionTypeKeys.SIGNUP>
) => auth.TSignup

type TProps = {
  signup: TSignupAction
  goTo: (s: string) => RouterAction
}

const SignupPage = (props: TProps) => (
  <Signup
    onSubmit={result => {
      props.signup()
      props.goTo(sitemap.newOrganization)
      console.log(JSON.stringify(result, null, 2))
    }}
  />
)

type TPartialGlobalState = {}

const mapStateToProps = (state: TPartialGlobalState) => ({})

const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.Action>): TProps =>
  Redux.bindActionCreators(
    {
      signup: auth.actions.signup,
      goTo: s => push(s),
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
