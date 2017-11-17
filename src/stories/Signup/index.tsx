import * as React from 'react'

import Form, {
  TFieldState,
  TFieldConfig,
  TGlobalConstraint,
} from '../../components/Form'
import Card from '../../components/Card'
import {passwordConstraints, notEmpty} from '../Authentication/utils'

const styles = require('./index.css')

type TFormState = {
  invitationCode: TFieldState
  email: TFieldState
  password: TFieldState
  passwordAgain: TFieldState
}

type TProps = {onSubmit: (formState: TFormState) => void}

class Signin extends React.Component<TProps, {}> {
  fields: {[k: string]: TFieldConfig} = {
    invitationCode: {
      label: 'Invitation code',
      constraints: [notEmpty],
    },
    email: {
      label: 'Email',
      constraints: [notEmpty],
    },
    password: {
      label: 'Password',
      note: '8 characters minimum',
      hidden: true,
      constraints: passwordConstraints,
    },
    passwordAgain: {
      label: 'Password again',
      hidden: true,
      constraints: passwordConstraints,
    },
  }

  globalConstraints: TGlobalConstraint[] = [
    {
      constraint: (formState: TFormState) =>
        formState.password.value === formState.passwordAgain.value,
      message: `Passwords don't match`,
    },
  ]

  render() {
    return (
      <div className={styles.wrapper} id="signup">
        <h2>Create a new account</h2>
        <p className={styles.subheader}>
          It only takes <b>1 minute</b> to complete.
        </p>
        <Card>
          <Form
            globalConstraints={this.globalConstraints}
            onSubmit={this.props.onSubmit}
            fields={this.fields}
          />
        </Card>
        <div className={styles.disclaimer}>
          By continuing, you agree with our <a href="#">T&amp;Cs</a>.
        </div>
      </div>
    )
  }
}

export default Signin
