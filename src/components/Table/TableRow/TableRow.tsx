import React, { FC } from 'react';
import './TableRow.scss';
import { Restaurant } from '../../../models/Restaurant.model';

interface Props {
  restaurant: Restaurant;
}

const TableRow: FC<Props> = ({ restaurant }: Props) => {
  const { name, city, state, telephone, genre, attire } = restaurant;
  return (
    <tr className='table__row'>
      <td className='name'>{name}</td>
      <td className='city'>{city}</td>
      <td className='state'>{state}</td>
      <td className='phone'>{telephone}</td>
      <td className='genres'>{genre.replace(/,/g, ', ')}</td>
      <td>{attire}</td>
    </tr>
  );
};

export default TableRow;
