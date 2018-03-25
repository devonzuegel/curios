/**
 * Provides a declarative way to specify document.title in
 * a single-page app.
 */

import * as React from 'react'
import * as withSideEffect from 'react-side-effect'

function propsToState(propsList: any[]) {
  const innermostProps = propsList[propsList.length - 1]
  if (innermostProps) {
    return innermostProps.title
  }
}

function handleStateChangeOnClient(title: string) {
  const nextTitle = title || ''
  if (nextTitle !== document.title) {
    document.title = nextTitle
  }
}

class DocumentTitle extends React.Component<{title: string}> {
  render() {
    if (this.props.children) {
      return React.Children.only(this.props.children)
    } else {
      return null
    }
  }
}

export default withSideEffect(propsToState, handleStateChangeOnClient)(DocumentTitle)
