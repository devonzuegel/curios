import * as React from 'react'

const Post = (props: {id: string; imageUrl: string; description: string}) => (
  <div style={{margin: '12px 0 24px 0'}}>
    {props.imageUrl && <img src={props.imageUrl} style={{height: '200px'}} />}
    <pre style={{margin: '6px 0'}}>{props.description}</pre>
  </div>
)

export default Post
