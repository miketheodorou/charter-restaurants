import React, { FC } from 'react';
import './TableRow.scss';
import { Restaurant } from '../../../models/Restaurant.model';

interface Props {
  restaurant: Restaurant;
  expanded: boolean;
  index: number;
  onClick: (index: number) => void;
}

const TableRow: FC<Props> = ({ restaurant, expanded, onClick, index }: Props) => {
  const { name, city, state, telephone, genre, attire } = restaurant;

  const handleExpand = () => {
    onClick(index);
  };
  return (
    <tr
      aria-expanded={expanded}
      role='button'
      tabIndex={0}
      onClick={handleExpand}
      onKeyPress={handleExpand}
      className='table__row'
    >
      <td className='name'>{name}</td>
      <td className='city'>{city}</td>
      <td className='state'>{state}</td>
      <td className='phone'>{telephone}</td>
      <td className='genres'>{genre.replace(/,/g, ', ')}</td>
      <td>{attire}</td>
      <td className='detail-view' colSpan={5}></td>
    </tr>
  );
};

export default TableRow;
