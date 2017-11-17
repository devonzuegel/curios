import * as React from 'react'

const Name = (props: {name?: string}) =>
  props.name ? (
    <span>{props.name}</span>
  ) : (
    <span
      style={{
        width: '3em',
        background: '#eee',
        height: '.65em',
        borderRadius: '3px',
      }}
    />
  )

const User = (props: {
  facebookUserId?: string
  facebookFirstName?: string
  small?: boolean
}) => (
  <div style={{alignItems: 'center', display: 'flex'}}>
    <div
      style={{
        height: props.small ? '30px' : '60px',
        width: props.small ? '30px' : '60px',
        marginRight: props.small ? '12px' : '24px',
        borderRadius: props.small ? '15px' : '30px',
        background: '#eee',
      }}
    >
      {props.facebookUserId && (
        <img
          src={`http://graph.facebook.com/${props.facebookUserId}/picture?type=square`}
          style={{
            height: props.small ? '30px' : '60px',
            borderRadius: props.small ? '15px' : '30px',
          }}
        />
      )}
    </div>
    <Name name={props.facebookFirstName} />
  </div>
)

export default User
