import * as React from 'react'

import Post from '~/components/Post'
import ErrorBoundary from '~/components/ErrorBoundary'
import CreatePost from './CreatePost'
import {TProps as TCreatePostProps} from './CreatePost'
import {THomePageProps} from './types'

const PostsList = (props: TCreatePostProps) => {
  if (props.AllPosts.loading) {
    return <h3>...</h3>
  }
  return (
    <ErrorBoundary>
      <CreatePost {...props} />
      <div
        style={{
          flexWrap: 'wrap',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-around',
        }}
      >
        {props.AllPosts.allPosts &&
          props.AllPosts.allPosts.map((post, k) => (
            <Post {...post} key={k} /> //
          ))}
      </div>
    </ErrorBoundary>
  )
}

export default (props: THomePageProps) => (
  <ErrorBoundary>
    <PostsList
      CreatePostMutation={props.CreatePostMutation}
      AllPosts={props.AllPosts}
    />
  </ErrorBoundary>
)
