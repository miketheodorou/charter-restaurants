import React, { useEffect, useContext, useState } from 'react';
import './Dashboard.scss';

// API
import { getRestaurants } from '../api/restaurantApi';

// Models
import { Searchparams } from '../models/SearchParams';

// Context
import { RestaurantContext } from '../context/RestaurantContext/RestaurantContext';

// Components
import Search from '../components/Search/Search';
import Table from '../components/Table/Table';
import TableLoader from '../components/Table/TableLoader/TableLoader';
import { Restaurant } from '../models/Restaurant.model';

const Dashboard = () => {
  const { fetchRestaurantsSuccess, state, search } = useContext(RestaurantContext);
  const [status, setStatus] = useState<string>('loading');

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

  const renderStatus = (status: string) => {
    switch (status) {
      case 'loading':
        return <TableLoader />;
      case 'success':
        return <Table restaurants={state.filteredRestaurants} />;
      default:
        return null;
    }
  };

  return (
    <>
      <h1 className='page__title'>Restaurants</h1>
      <section className='restaurants'>
        <Search onSearch={onSearch} />
        <div className='restaurants__results'>{renderStatus(status)}</div>
      </section>
    </>
  );
};

export default Dashboard;
