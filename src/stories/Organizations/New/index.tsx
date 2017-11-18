import * as React from 'react'

import Form, {TFieldState, TFieldConfig} from '~/components/Form'
import Card from '~/components/Card'
import {notEmpty} from '~/stories/Authentication/utils'

const styles = require('./index.css')

type TFormState = {
  businessName: TFieldState
  firstName: TFieldState
  lastName: TFieldState
}

type TProps = {onSubmit: (formState: TFormState) => void}

class Signin extends React.Component<TProps, {}> {
  fields: {[k: string]: TFieldConfig} = {
    businessName: {
      label: 'Business name',
      constraints: [notEmpty],
    },
    firstName: {
      label: 'First name',
      constraints: [notEmpty],
    },
    lastName: {
      label: 'Last name',
      constraints: [notEmpty],
    },
  }

  render() {
    return (
      <div className={styles.wrapper} id="new-organization">
        <h2>Create a new account</h2>
        <p className={styles.subheader}>
          It only takes <b>1 minute</b> to complete.
        </p>
        <Card>
          <Form onSubmit={this.props.onSubmit} fields={this.fields} />
        </Card>
      </div>
    )
  }
}

export default Signin
