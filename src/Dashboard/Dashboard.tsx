import React, { useEffect, useContext } from 'react';
import './Dashboard.scss';

// API
import { getRestaurants } from '../api/restaurantApi';

// Context
import { RestaurantContext } from '../context/RestaurantContext/RestaurantContext';

// Components
import Filters from '../components/Filters/Filters';
import Table from '../components/Table/Table';

const Dashboard = () => {
  const { fetchRestaurantsSuccess } = useContext(RestaurantContext);

  useEffect(() => {
    getRestaurants().then(fetchRestaurantsSuccess).catch(console.error);
  }, []);

  return (
    <section className='restaurants'>
      <div className='restaurants__search'>
        <Filters />
      </div>
      <div className='restaurants__results'>
        <Table />
      </div>
    </section>
  );
};

export default Dashboard;
