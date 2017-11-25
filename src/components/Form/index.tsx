import * as React from 'react'
import * as R from 'ramda'

import TextInput from '~/components/TextInput'
import Button from '~/components/Button'

const styles = require('./styles.css')

type TConstraint = {
  constraint: (s: string) => boolean
  message: string
}

export type TFieldState = {
  value: string
  error: string | null
  edited: boolean
}

export type TFieldConfig = {
  label: string
  note?: string
  hidden?: boolean
  initialState?: string
  constraints: TConstraint[]
}

type TProps = {
  onSubmit: (formState: TFormState) => void
  fields: {[k: string]: TFieldConfig}
  globalConstraints?: TGlobalConstraint[]
}

type TFormState = {
  [k: string]: TFieldState
}

export type TGlobalConstraint = {
  constraint: (state: TFormState) => boolean
  message: string
}

class Form extends React.Component<TProps, TFormState> {
  globalConstraints = this.props.globalConstraints || []

  state = {
    __global: {value: 'IGNORE ME', error: 'IGNORE ME', edited: false},
    /**
     * Initialize the state with an empty, error-free, non-edited fieldState
     * for each field.
     */
    ...R.keys(this.props.fields).reduce(
      (soFar, fieldName) => ({
        ...soFar,
        [fieldName]: {
          value: this.props.fields[fieldName].initialState || '',
          error: null,
          edited: false,
        },
      }),
      {}
    ),
  }

  fieldStates: () => TFormState = () => R.omit(['__global'], this.state)

  componentDidMount() {
    // Initialize form fields with errors (hidden until field is edited)
    this.updateErrors()
  }

  setValue = (k: keyof TFormState) => (value: string) => {
    this.setState((prevState: TFormState): TFormState => ({
      ...prevState,
      [k]: {...prevState[k], value},
    }))
    this.updateError(k, value)
  }

  setEdited = (k: keyof TFormState) => () => {
    this.setState((prevState: TFormState): TFormState => ({
      ...prevState,
      [k]: {...prevState[k], edited: true},
    }))
  }

  addError = (key: string, errorMessage: string | null) =>
    this.setState(prevState => ({
      ...prevState,
      [key]: {...prevState[key], error: errorMessage},
    }))

  /**
   * Update error corresponding to non-global constraint
   */
  updateError = (key: keyof TFormState, value: string) => {
    if (key === '__global') {
      throw Error('You cannot use this method on the __global key')
    }
    // Clear error
    this.addError(key, null)
    // First is last applied (& therefore not overridden)
    const constraints = R.reverse(this.props.fields[key].constraints)
    constraints.forEach(c => {
      if (!c.constraint(value)) {
        this.addError(key, c.message)
      }
    })
  }

  updateErrors = () => {
    const fieldNames = R.keys(this.fieldStates())
    fieldNames.map((k: keyof TFormState) => this.updateError(k, this.state[k].value))
  }

  /**
   * Check that the individual constraints on each of the fields hold.
   * Note that this does not check for global constraints.
   */
  allFieldsValid = (): boolean => {
    const messages = R.values(this.fieldStates()).map(fieldState => fieldState.error)
    const noMessage = (v: any) => v === null
    return R.all(noMessage, messages)
  }

  globalErrorMessage = () => {
    for (var i = 0; i < this.globalConstraints.length; i++) {
      const c = this.globalConstraints[i]
      if (!c.constraint(this.state)) {
        return c.message
      }
    }
    return null
  }

  submit = () => {
    this.updateErrors()
    R.keys(this.state).map(this.setEdited)
    if (this.allFieldsValid()) {
      this.setState((prevState: TFormState): TFormState => ({
        ...prevState,
        __global: {...prevState['__global'], edited: true},
      }))
      if (!this.globalErrorMessage()) {
        this.props.onSubmit(this.fieldStates())
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.__global.edited && (
          <div className={styles['global-error']}>{this.globalErrorMessage()}</div>
        )}
        {R.keys(this.props.fields).map((fieldName, k) => (
          <TextInput
            label={this.props.fields[fieldName].label}
            hidden={this.props.fields[fieldName].hidden}
            note={this.props.fields[fieldName].note}
            error={this.state[fieldName].edited && this.state[fieldName].error}
            onChange={this.setValue(fieldName)}
            onBlur={this.setEdited(fieldName)}
            onSubmit={this.submit}
            key={k}
            value={this.state[fieldName].value}
          />
        ))}
        <Button stretch disabled={!this.allFieldsValid()} onClick={this.submit}>
          Continue
        </Button>
      </div>
    )
  }
}

export default Form
