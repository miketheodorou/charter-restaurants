import React, { useEffect, useContext, useState } from 'react';
import './Dashboard.scss';

// API
import { getRestaurants } from '../api/restaurantApi';

// Models
import { Searchparams } from '../models/SearchParams';
import { Restaurant } from '../models/Restaurant.model';

// Context
import { RestaurantContext } from '../context/RestaurantContext/RestaurantContext';

// Components
import Search from '../components/Search/Search';
import Table from '../components/Table/Table';
import TableEmpty from '../components/Table/TableEmpty/TableEmpty';
import TableLoader from '../components/Table/TableLoader/TableLoader';

const Dashboard = () => {
  const { fetchRestaurantsSuccess, state, search } = useContext(RestaurantContext);
  const [status, setStatus] = useState<string>('loading');

  const handleFetchSuccess = (restaurants: Restaurant[]) => {
    setStatus('success');
    fetchRestaurantsSuccess(restaurants);
  };

  const onSearch = (searchParams: Searchparams) => {
    search(searchParams);
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case 'loading':
        return <TableLoader />;
      case 'empty':
        return <TableEmpty />;
      case 'success':
        return <Table restaurants={state.filteredRestaurants} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setStatus('loading');
    getRestaurants().then(handleFetchSuccess).catch(console.error);
  }, []);

  useEffect(() => {
    if (status !== 'loading') {
      state.filteredRestaurants.length > 0 ? setStatus('success') : setStatus('empty');
    }
  }, [state]);

  return (
    <section className='dashboard'>
      <h1 className='dashboard__title'>Restaurants</h1>
      <section className='restaurants'>
        <Search onSearch={onSearch} />
        <div className='restaurants__results'>{renderStatus(status)}</div>
      </section>
    </section>
  );
};

export default Dashboard;
