import * as React from 'react';

export interface Props {
  color?: string;
  className?: string;
}

const Search: React.StatelessComponent<Props> = ({ color = '#A9AEBF', className }) => (
  <svg width="13" height="14" viewBox="0 0 13 14" className={className}>
    <g transform="translate(1 1)" stroke={color} fill="none" fillRule="evenodd">
      <ellipse cx="4.8" cy="4.952" rx="4.8" ry="4.952"/>
      <path d="M8.1 8.976l3.394 3.502" strokeLinecap="round"/>
    </g>
  </svg>
);

export default Search;
