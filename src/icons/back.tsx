import * as React from 'react';

export interface Props {
  className?: string;
}

const Back: React.StatelessComponent<Props> = ({ className }) => (
  <svg
    width="12"
    height="17"
    viewBox="0 0 12 17"
    className={className}
  >
    <path
      d="M10.071 1L3 8.071l7.071 7.071"
      strokeWidth="3"
      stroke="#394C5B"
      fill="none"
      fillRule="evenodd"
    />
  </svg>
);

export default Back;
