import * as React from 'react'

import {storiesOf} from '@storybook/react'

import {action} from './utils'
import Signup from './Signup'
import {BasicSigninForm, NoValidationForm} from './Form'

storiesOf('Authentication', module) //
  .add('Signup', () => <Signup onSubmit={action('onSubmit')} />)

storiesOf('Utils/Form', module)
  .add('Form for basic signin', () => <BasicSigninForm />)
  .add('Form with no constraints', () => <NoValidationForm />)
