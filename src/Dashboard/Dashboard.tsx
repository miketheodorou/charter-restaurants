import React, { useEffect, useContext } from 'react';
import './Dashboard.scss';

// API
import { getRestaurants } from '../api/restaurantApi';

import Table from '../components/Table/Table';
import { RestaurantContext } from '../context/RestaurantContext/RestaurantContext';

const Dashboard = () => {
  const { state, fetchRestaurantsSuccess } = useContext(RestaurantContext);

  useEffect(() => {
    getRestaurants().then(fetchRestaurantsSuccess).catch(console.error);
  }, []);

  return (
    <section className='restaurants'>
      <div className='restaurants__search'></div>
      <div className='restaurants__table'>
        <Table restaurants={state.restaurants} />
      </div>
    </section>
  );
};

export default Dashboard;
