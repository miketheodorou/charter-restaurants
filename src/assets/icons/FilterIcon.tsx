import React, { FC } from 'react';

interface Props {
  className?: string;
}

const FilterIcon: FC<Props> = (props) => {
  const { className } = props;
  return (
    <svg
      className={`icon icon--search ${className || ''}`}
      width='16px'
      height='16px'
      x='0px'
      y='0px'
      viewBox='0 0 459 459'
    >
      <g>
        <g id='filter'>
          <path d='M178.5,382.5h102v-51h-102V382.5z M0,76.5v51h459v-51H0z M76.5,255h306v-51h-306V255z' />
        </g>
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );
};

export { FilterIcon };
