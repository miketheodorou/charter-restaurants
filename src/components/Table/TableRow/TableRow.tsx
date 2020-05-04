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
      <td>{name}</td>
      <td>{city}</td>
      <td>{state}</td>
      <td>{telephone}</td>
      <td>{genre}</td>
      <td>{attire}</td>
    </tr>
  );
};

export default TableRow;
