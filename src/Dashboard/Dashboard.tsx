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
  const { fetchRestaurantsSuccess, search } = useContext(RestaurantContext);

  useEffect(() => {
    getRestaurants().then(fetchRestaurantsSuccess).catch(console.error);
  }, []);

  return (
    <section className='restaurants'>
      <div className='restaurants__search'>
        <Filters />
        <button onClick={search} className='search-button'>
          Search
        </button>
      </div>
      <div className='restaurants__results'>
        <Table />
      </div>
    </section>
  );
};

export default Dashboard;
