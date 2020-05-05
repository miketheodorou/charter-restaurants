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
          <th className='name'>Name</th>
          <th className='city'>City</th>
          <th className='state'>State</th>
          <th className='phone'>Phone</th>
          <th className='genres'>Genres</th>
          <th className='attire'>Attire</th>
        </tr>
      </thead>
      <tbody>{renderRestaurants(restaurants)}</tbody>
    </table>
  );
};

export default Table;
