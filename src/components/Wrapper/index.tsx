import * as React from 'react'

const styles = require('./index.css')

type TProps = {
  children: JSX.Element | JSX.Element[] | string
}

const Wrapper = (props: TProps) => (
  <div className={styles.wrapper}>{props.children}</div>
)

export default Wrapper
