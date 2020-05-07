import React, { useEffect, useContext } from 'react';
import './Dashboard.scss';

// API
import { getRestaurants } from '../api/restaurantApi';

// Models
import { Searchparams } from '../models/SearchParams';

// Context
import { RestaurantContext } from '../context/RestaurantContext/RestaurantContext';

// Hooks
import useStatus from '../hooks/useStatus/useStatus';

// Components
import Search from '../components/Search/Search';
import Table from '../components/Table/Table';
import TableLoader from '../components/Table/TableLoader/TableLoader';
import { Restaurant } from '../models/Restaurant.model';

const Dashboard = () => {
  const { fetchRestaurantsSuccess, search } = useContext(RestaurantContext);
  const { Status, setStatus } = useStatus('loading');

  const handleFetchSuccess = (restaurants: Restaurant[]) => {
    setStatus('success');
    fetchRestaurantsSuccess(restaurants);
  };

  useEffect(() => {
    setStatus('loading');
    getRestaurants().then(handleFetchSuccess).catch(console.error);
  }, []);

  const onSearch = (searchParams: Searchparams) => {
    search(searchParams);
  };

  return (
    <>
      <h1 className='page__title'>Restaurants</h1>
      <section className='restaurants'>
        <Search onSearch={onSearch} />
        <div className='restaurants__results'>
          <Status loading={<TableLoader />} success={<Table />} />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
