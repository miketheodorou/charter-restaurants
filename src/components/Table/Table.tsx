import React, { FC } from 'react';
import './Table.scss';
import { Restaurant } from '../../models/Restaurant.model';
import TableRow from './TableRow/TableRow';

interface Props {
  restaurants: Restaurant[];
}

const Table: FC<Props> = (props) => {
  const { restaurants } = props;

  const renderRestaurants = (restaurants: Restaurant[]) => {
    return restaurants.map((restaurant) => (
      <TableRow key={restaurant.id} restaurant={restaurant} />
    ));
  };

  return (
    <table className='table'>
      <thead>
        <tr className='table__header'>
          <th align='left'>Name</th>
          <th align='left'>City</th>
          <th align='left'>State</th>
          <th align='left'>Phone</th>
          <th align='left'>Genres</th>
          <th align='left'>Attire</th>
        </tr>
      </thead>
      <tbody>{renderRestaurants(restaurants)}</tbody>
    </table>
  );
};

export default Table;
