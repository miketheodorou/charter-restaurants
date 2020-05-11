import React, { useEffect, useContext, useState } from 'react';
import './Dashboard.scss';

// Context
import { RestaurantContext } from '../../context/RestaurantContext/RestaurantContext';

// Components
import Search from '../Search/Search';
import Table from '../Table/Table';
import TableEmpty from '../Table/TableEmpty/TableEmpty';
import TableLoader from '../Table/TableLoader/TableLoader';

const Dashboard = () => {
  const { state, fetchRestaurants } = useContext(RestaurantContext);
  const [status, setStatus] = useState<string>('loading');
  const [error, setError] = useState<string>('');

  const handleFetchSuccess = () => setStatus('success');
  const handleFetchError = (error: { message: string }) => {
    setError(error.message);
    setStatus('error');
  };

  const getRestaurants = () => {
    setStatus('loading');
    fetchRestaurants()
      .then(handleFetchSuccess)
      .catch(handleFetchError);
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case 'loading':
        return <TableLoader />;
      case 'error':
        return <TableEmpty error={error} tryAgain={getRestaurants} />;
      case 'success':
        return state.filteredRestaurants.length ? <Table /> : <TableEmpty />;
      default:
        return null;
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <section className='dashboard'>
      <h1 className='dashboard__title'>Restaurants</h1>
      <section className='restaurants'>
        <Search />
        <div className='restaurants__results'>{renderStatus(status)}</div>
      </section>
    </section>
  );
};

export default Dashboard;
