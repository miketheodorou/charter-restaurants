import React, { FC, useContext, useState, useEffect } from 'react';
import './Table.scss';
import { Restaurant } from '../../models/Restaurant.model';
import TableRow from './TableRow/TableRow';
import { RestaurantContext } from '../../context/RestaurantContext/RestaurantContext';
import TablePagination from './TablePagination/TablePagination';
import { Pagination } from '../../models/Pagination.model';

const Table: FC = () => {
  const { state, pageChanged } = useContext(RestaurantContext);
  const { filteredRestaurants, pagination } = state;
  const [results, setResults] = useState<Restaurant[]>([]);

  const renderRestaurants = (restaurants: Restaurant[]) => {
    return restaurants.map((restaurant) => (
      <TableRow key={restaurant.id} restaurant={restaurant} />
    ));
  };

  const parsePages = (restaurants: Restaurant[], pagination: Pagination) => {
    const { page, pageSize } = pagination;
    const start = Math.floor((page - 1) * 10);
    const end = Math.floor(start + pageSize);
    const pageSlice = restaurants.slice(start, end);
    setResults(pageSlice);
  };

  useEffect(() => {
    parsePages(filteredRestaurants, pagination);
  }, [filteredRestaurants, pagination]);

  return (
    <>
      <div className='table__container'>
        <table className='table'>
          <thead>
            <tr>
              <th className='name'>Name</th>
              <th className='city'>City</th>
              <th className='state'>State</th>
              <th className='phone'>Phone</th>
              <th className='genres'>Genres</th>
              <th className='attire'>Attire</th>
            </tr>
          </thead>
          <tbody>{renderRestaurants(results)}</tbody>
        </table>
      </div>
      <footer className='table__footer'>
        <TablePagination pagination={pagination} onPageChanged={pageChanged} />
      </footer>
    </>
  );
};

export default Table;
