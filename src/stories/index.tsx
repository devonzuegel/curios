import * as React from 'react'

import {storiesOf} from '@storybook/react'

import {action} from './utils'
import Signup from './Signup'
import Signin from './Signin'
import NewOrg from './Organizations/New'
import {BasicSigninForm, NoValidationForm} from './Form'

storiesOf('Authentication', module)
  .add('Signin', () => <Signin onSubmit={action('clicked')} />)
  .add('Signup', () => <Signup onSubmit={action('onSubmit')} />)
  .add('New organization', () => <NewOrg onSubmit={action('onSubmit')} />)

storiesOf('Utils/Form', module)
  .add('Form for basic signin', () => <BasicSigninForm />)
  .add('Form with no constraints', () => <NoValidationForm />)
