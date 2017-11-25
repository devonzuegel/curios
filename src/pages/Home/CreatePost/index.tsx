import * as React from 'react'
import * as Apollo from 'react-apollo'

import Message from '~/components/Message'
import Form, {TFieldState} from '~/components/Form'
import ErrorBoundary from '~/components/ErrorBoundary'
import {notEmpty} from '~/stories/Authentication/utils'

import {urls, authorIDs} from './defs'
import {TAllPosts} from '../types'

export type TProps = {
  CreatePostMutation: Apollo.MutationFunc<any> // TODO: no any
  AllPosts: TAllPosts
}

type TState = {
  error?: string
  description: string
  imageUrl: string
  authorId: string
}

type TFormResult = {
  description: TFieldState
  imageUrl: TFieldState
  authorId: TFieldState
}

const randomElement = (array: any[]) =>
  array[Math.floor(Math.random() * array.length)]

class CreatePostForm extends React.Component<TProps, TState> {
  state = {
    error: undefined,
    description: 'This is a caption',
    imageUrl: randomElement(urls),
    authorId: authorIDs.devon,
  }

  fields = {
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
  }

  messages = {
    ['GraphQL error: Insufficient permissions for this mutation']:
      'Please log in to create a post.',
  }

  render() {
    const handleFailure = (err: Apollo.ApolloError) => {
      this.setState({error: this.messages[err.message] || err.message})
    }
    return (
      <div>
        {this.state.error && <Message>{this.state.error}</Message>}
        <Form
          onSubmit={(formState: TFormResult) => {
            this.props
              .CreatePostMutation({
                variables: {
                  description: formState.description.value,
                  imageUrl: formState.imageUrl.value,
                  authorId: formState.authorId.value,
                },
              })
              .then(this.props.AllPosts.refetch)
              .catch(handleFailure)
          }}
          fields={this.fields}
        />
      </div>
    )
  }
}

export default (props: TProps) => (
  <ErrorBoundary>
    <CreatePostForm {...props} />
  </ErrorBoundary>
)
