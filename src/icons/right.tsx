//tslint:disable
import * as React from 'react';

export interface Props {
  color?: string;
  size?: number;
}

const Right: React.StatelessComponent<Props> = ({ color = 'white', size = 25 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24.948 54.465">
    <path fill={color} d="M.927 5.396A3.162 3.162 0 0 1 5.397.925L24.022 19.55a3.162 3.162 0 0 1-4.471 4.471L.927 5.396z"/>
    <path fill={color} d="M5.397 42.646a3.162 3.162 0 0 1-4.471-.001 3.16 3.16 0 0 1 .001-4.47L19.55 19.551a3.162 3.162 0 0 1 4.471 4.471L5.397 42.646z"/>
  </svg>
);

export default Right;
