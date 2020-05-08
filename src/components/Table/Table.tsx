import React, { FC, useContext, useState, useEffect } from 'react';
import './Table.scss';

// Models
import { Restaurant } from '../../models/Restaurant.model';
import { Pagination } from '../../models/Pagination.model';

// Context
import { RestaurantContext } from '../../context/RestaurantContext/RestaurantContext';

// Components
import TablePagination from './TablePagination/TablePagination';
import TableRow from './TableRow/TableRow';

const Table: FC = () => {
  const { state, pageChanged } = useContext(RestaurantContext);
  const { filteredRestaurants, pagination } = state;
  const [results, setResults] = useState<Restaurant[]>([]);
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const onRowClick = (index: number) => {
    return activeRow !== index ? setActiveRow(index) : setActiveRow(null);
  };

  const renderRestaurants = (restaurants: Restaurant[]) => {
    return restaurants.map((restaurant, i) => (
      <TableRow
        key={restaurant.id}
        restaurant={restaurant}
        expanded={activeRow === i}
        index={i}
        onClick={onRowClick}
      />
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
    setActiveRow(null);
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
