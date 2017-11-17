import * as React from 'react'

import Form, {TFieldState} from '../../components/Form'
import Card from '../../components/Card'
import {passwordConstraints, notEmpty} from '../Authentication/utils'
import Message from '../../components/Message'

const styles = require('./index.css')

type TFormState = {
  email: TFieldState
  password: TFieldState
}

type TProps = {onSubmit: (formState: TFormState) => void; message?: string}

class Signin extends React.Component<TProps, {}> {
  fields = {
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
  }

  render() {
    return (
      <div className={styles.wrapper} id="signin">
        <h2>Sign in</h2>
        {this.props.message && <Message>{this.props.message}</Message>}
        <Card>
          <Form onSubmit={this.props.onSubmit} fields={this.fields} />
        </Card>
        <div className={styles.disclaimer}>
          <a href="#">Forgot password?</a>
        </div>
      </div>
    )
  }
}

export default Signin
