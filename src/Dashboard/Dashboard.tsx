import React, { useEffect, useContext, useState } from 'react';
import './Dashboard.scss';

// Models
import { Searchparams } from '../models/SearchParams';

// Context
import { RestaurantContext } from '../context/RestaurantContext/RestaurantContext';

// Components
import Search from '../components/Search/Search';
import Table from '../components/Table/Table';
import TableEmpty from '../components/Table/TableEmpty/TableEmpty';
import TableLoader from '../components/Table/TableLoader/TableLoader';

const Dashboard = () => {
  const { fetchRestaurants, state, search } = useContext(RestaurantContext);
  const [status, setStatus] = useState<string>('loading');
  const [error, setError] = useState<string>('');

  const handleFetchSuccess = () => setStatus('success');
  const handleFetchError = (error: { message: string }) => {
    setError(error.message);
    setStatus('error');
  };

  const onSearch = (searchParams: Searchparams) => {
    search(searchParams);
  };

  const getRestaurants = () => {
    setStatus('loading');
    fetchRestaurants().then(handleFetchSuccess).catch(handleFetchError);
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case 'loading':
        return <TableLoader />;
      case 'error':
        return <TableEmpty error={error} tryAgain={getRestaurants} />;
      case 'empty':
        return <TableEmpty />;
      case 'success':
        return <Table restaurants={state.filteredRestaurants} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    if (status === 'error' || status === 'loading') return;
    state.filteredRestaurants.length > 0 ? setStatus('success') : setStatus('empty');
  }, [status, state.filteredRestaurants]);

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
