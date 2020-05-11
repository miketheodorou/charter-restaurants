import React, { FC } from 'react';

interface Props {
  className?: string;
}

const MarkerIcon: FC<Props> = (props) => {
  const { className = '' } = props;
  return (
    <svg
      className={`icon icon-search ${className}`}
      width='16px'
      height='16px'
      x='0px'
      y='0px'
      viewBox='0 0 192 192'
    >
      <path d='m96 0a72.081 72.081 0 0 0 -72 72c0 50.73 63.634 114.948 66.343 117.657a8.078 8.078 0 0 0 11.314 0c2.709-2.709 66.343-66.927 66.343-117.657a72.081 72.081 0 0 0 -72-72zm0 120a48 48 0 1 1 48-48 48 48 0 0 1 -48 48z' />
    </svg>
  );
};

export { MarkerIcon };
