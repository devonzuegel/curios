//tslint:disable
import * as React from 'react';

export interface Props {
  color?: string;
  size?: number;
}

const Left: React.StatelessComponent<Props> = ({ color = 'white', size = 25 }) => (
  <svg version="1.1" width={size} height={size} viewBox="0 0 24.947 54.465" >
    <path fill={color} d="M24.021,38.175c1.235,1.235,1.235,3.235,0,4.471l0,0c-1.233,1.233-3.235,1.234-4.47,0l0,0L0.925,24.021      c-1.234-1.233-1.233-3.235,0.001-4.469l0,0c1.234-1.234,3.235-1.234,4.47-0.001l0,0L24.021,38.175L24.021,38.175z"/>
    <path fill={color} d="M19.551,0.926c1.234-1.234,3.236-1.234,4.471,0.001l0,0c1.235,1.234,1.234,3.235-0.001,4.47l0,0      L5.397,24.021c-1.235,1.234-3.236,1.236-4.471,0.001l0,0c-1.235-1.234-1.235-3.236,0-4.471l0,0L19.551,0.926L19.551,0.926z"/>
  </svg>
);

export default Left;
