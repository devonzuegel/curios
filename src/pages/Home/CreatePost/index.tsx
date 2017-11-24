import * as React from 'react'

import Form, {TFieldState} from '~/components/Form'
import ErrorBoundary from '~/components/ErrorBoundary'
import {notEmpty} from '~/stories/Authentication/utils'

import {urls, authorIDs} from './defs'
import {TAllPosts} from '../types'

export type TProps = {
  CreatePostMutation: Function
  AllPosts: TAllPosts
}

type TFormResult = {
  description: TFieldState
  imageUrl: TFieldState
  authorId: TFieldState
}

const randomElement = (array: any[]) =>
  array[Math.floor(Math.random() * array.length)]

class CreatePostForm extends React.Component<TProps, {}> {
  state = {
    description: 'This is a caption',
    imageUrl: randomElement(urls),
    authorId: authorIDs.devon,
  }

  render() {
    return (
      <Form
        onSubmit={async (result: TFormResult) => {
          await this.props.CreatePostMutation({
            variables: {
              description: result.description.value,
              imageUrl: result.imageUrl.value,
              authorId: result.authorId.value,
            },
          })
          await this.props.AllPosts.refetch()
        }}
        fields={{
          imageUrl: {
            label: 'Image URL',
            constraints: [notEmpty],
            initialState: this.state.imageUrl,
          },
          description: {
            label: 'Description',
            constraints: [notEmpty],
            initialState: this.state.description,
          },
          authorId: {
            label: 'Author ID',
            constraints: [notEmpty],
            initialState: this.state.authorId,
          },
        }}
      />
    )
  }
}

export default (props: TProps) => (
  <ErrorBoundary>
    <CreatePostForm {...props} />
  </ErrorBoundary>
)
