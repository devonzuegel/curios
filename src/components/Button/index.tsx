import * as React from 'react'
import * as classnames from 'classnames'

const styles = require('./index.css')

type TProps = {
  disabled?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children?: string
  stretch?: boolean
}

const Button = (props: TProps) => (
  <button
    disabled={props.disabled}
    className={classnames({
      [styles.button]: true,
      [styles.stretch]: props.stretch,
    })}
    onClick={props.onClick}
  >
    {props.children}
  </button>
)

export default Button
