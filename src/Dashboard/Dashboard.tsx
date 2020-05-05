import React, { useEffect, useContext } from 'react';
import './Dashboard.scss';

// API
import { getRestaurants } from '../api/restaurantApi';

import Table from '../components/Table/Table';
import { RestaurantContext } from '../context/RestaurantContext/RestaurantContext';

const Dashboard = () => {
  const { fetchRestaurantsSuccess } = useContext(RestaurantContext);

  useEffect(() => {
    getRestaurants().then(fetchRestaurantsSuccess).catch(console.error);
  }, []);

  return (
    <section className='restaurants'>
      <div className='restaurants__search'></div>
      <div className='restaurants__results'>
        <Table />
      </div>
    </section>
  );
};

export default Dashboard;
