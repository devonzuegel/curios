import * as React from 'react'
import * as classnames from 'classnames'

import * as U from '../../utils'

const styles = require('./index.css')

type TProps = {
  label: string
  note?: string
  name?: string
  hidden?: boolean
  error?: string | null | boolean
  onChange: (s: string) => void
  onBlur?: () => void
  onSubmit?: () => void
}

const TextInput = (props: TProps) => (
  <div className={styles['wrapper']}>
    <label className={styles['label']} htmlFor={props.name}>
      {props.label}
      {props.error ? (
        <span className={styles['inline-error']}>{props.error}</span>
      ) : (
        <span className={styles['inline-note']}>{props.note}</span>
      )}
    </label>
    <input
      className={classnames({
        [styles['input']]: true, //
        [styles['error']]: !!props.error,
      })}
      type={props.hidden ? 'password' : 'text'}
      name={props.name || U.slugify(props.label)}
      id={props.name || U.slugify(props.label)}
      onChange={e => props.onChange(e.target.value)}
      onBlur={props.onBlur}
      onKeyPress={e => {
        if (e.key === 'Enter' && props.onSubmit) {
          props.onSubmit()
        }
      }}
    />
  </div>
)

export default TextInput
