import * as React from 'react'

import Form from '~/components/Form'
import {action} from '../utils'

export const BasicSigninForm = () => (
  <Form
    onSubmit={action('clicked')}
    fields={{
      email: {
        label: 'Email',
        constraints: [
          {
            constraint: (s: string) => s.length > 0,
            message: 'Email must not be empty',
          },
        ],
      },
      password: {
        label: 'Password',
        note: '8 characters minimum',
        constraints: [
          {
            constraint: (s: string) => s.length > 0,
            message: 'Password must not be empty',
          },
          {
            constraint: (s: string) => s.length > 8,
            message: '8 characters minimum',
          },
        ],
      },
    }}
  />
)

export const NoValidationForm = () => (
  <Form
    onSubmit={action('clicked')}
    fields={{
      this: {label: 'This', constraints: []},
      form: {label: 'Form', constraints: []},
      has: {label: 'Has', constraints: []},
      no: {label: 'No', constraints: []},
      constraints: {label: 'Constraints', constraints: []},
    }}
  />
)
