import * as React from 'react'

const styles = require('./index.css')

type TProps = {
  children: JSX.Element | JSX.Element[] | string
}

const Message = (props: TProps) => (
  <div className={styles.message}>{props.children}</div>
)

export default Message
